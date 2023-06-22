import { uuid, query, sparqlEscapeString, sparqlEscapeUri, sparqlEscapeInt, sparqlEscapeDateTime } from 'mu';
import { querySudo, updateSudo } from '@lblod/mu-auth-sudo';
import { stat, writeFile } from 'node:fs/promises';
import format from 'date-fns/format';
import { nlBE } from 'date-fns/locale';
import Papa from 'papaparse';

const PUBLIC_GRAPH = 'http://mu.semte.ch/graphs/public';
const HOST_DOMAIN = process.env.HOST_DOMAIN || 'https://linked.toerismevlaanderen.be';
const BASE_URI = 'http://linked.toerismevlaanderen.be';
const DCAT_CATALOG = 'http://linked.toerismevlaanderen.be/id/catalogs/c62b30ce-7486-4199-a177-def7e1772a53';

const BATCH_SIZE = 1000;

function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
}

/* Fetches the dataset with the given id from the triplestore */
async function fetchDataset(id) {
  const result = await querySudo(`
    PREFIX dcat: <http://www.w3.org/ns/dcat#>
    PREFIX mu: <http://mu.semte.ch/vocabularies/core/>

    SELECT ?dataset
    WHERE {
      GRAPH ${sparqlEscapeUri(PUBLIC_GRAPH)} {
        ?dataset a dcat:Dataset ;
          mu:uuid ${sparqlEscapeString(id)} .
      }
    } LIMIT 1
  `);

  if (result.results.bindings.length) {
    return result.results.bindings[0]['dataset'].value;
  } else {
    return null;
  }
}

/* Find a file with the given permalink in the triplestore */
async function findFileByUrl(url) {
  const result = await query(`
    PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
    PREFIX schema: <http://schema.org/>
    PREFIX nfo: <http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#>

    SELECT ?uri ?id
    WHERE {
      ?uri a nfo:FileDataObject ;
        mu:uuid ?id ;
        schema:url ${sparqlEscapeUri(url)} .
    } LIMIT 1
  `);

  if (result.results.bindings.length) {
    const binding = result.results.bindings[0];
    return {
      uri: binding['uri'].value,
      id: binding['id'].value,
    };
  } else {
    return null;
  }
}

/* Converts a SPARQL query result term to a JSON property value */
function termToJson({ type, datatype, value }) {
  if (value) {
    if (datatype == 'http://www.w3.org/2001/XMLSchema#dateTime') {
      const date = new Date(Date.parse(value));
      return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: nlBE });
    } else if (datatype == 'http://www.w3.org/2001/XMLSchema#date') {
      const date = new Date(Date.parse(value));
      return format(date, 'dd/MM/yyyy', { locale: nlBE });
    } else if (type == 'uri' && value.startsWith('mailto:')) {
      return value.substr('mailto:'.length);
    } else if (type == 'uri' && value.startsWith('tel:')) {
      return `${value.substr('tel:'.length)}`;
    } else {
      return value;
    }
  } else {
    return value;
  }
}

/* Converts a SPARQL query result binding to a JSON object */
function bindingToJson(binding, i) {
  const json = {};
  for (const prop in binding) {
    const key = camelToSnakeCase(i ? `${prop}_${i + 1}` : prop);
    json[key] = termToJson(binding[prop]);
  }
  return json;
}

/* Converts a SPARQL query result to a JSON object */
function multiValueToJson(bindings) {
  if (bindings.length) {
    const json = {};
    bindings.forEach((binding, i) => { // each binding results in a separate column
      for (const prop in binding) { // only 1 prop/variable per binding is expected
        const key = camelToSnakeCase(i ? `${prop}_${i + 1}` : prop);
        json[key] = termToJson(binding[prop]);
      }
    });
    return json;
  } else {
    return {};
  }
}

/* Converts a SPARQL query result containing label/value per binding to a JSON object */
function labelValueToJson(bindings) {
  if (bindings.length) {
    const json = {};
    bindings.forEach((binding) => { // each binding results in a separate column
      const key = camelToSnakeCase((binding['label'].value).replace(/\s/g, '_'));
      json[key] = termToJson(binding['value']);
    });
    return json;
  } else {
    return {};
  }
}

/* Converts a SPARQL query result to a JSON object with a multi-valued value */
function joinValueToJson(bindings) {
  if (bindings.length) {
    let key;
    const values = [];
    bindings.forEach((binding) => { // values of the bindings are merged
      for (const prop in binding) { // only 1 prop/variable per binding is expected
        key = camelToSnakeCase(prop);
        values.push(termToJson(binding[prop]));
      }
    });
    return { [key]: values.join('; ') };
  } else {
    return {};
  }
}

/*
   Executes the query of the task in batches
   and executes the additional queries per row in the result set.
   Returns the result as a CSV formatted string.
*/
async function queryCsv(task) {
  const rows = [];
  let hasMoreResults = true;
  let i = 0;
  do {
    console.log(`Fetch data for ${task.fileName}.csv (batch ${i + 1})`);
    const q = task.batchedQuery(BATCH_SIZE, BATCH_SIZE * i);
    const queryResult = await querySudo(q);
    hasMoreResults = queryResult.results.bindings.length == BATCH_SIZE;
    for (const binding of queryResult.results.bindings) {
      const row = bindingToJson(binding);

      // Add multi-valued fields as separate columns
      for (const rowTask of task.perRowQueries) {
        const subQ = task.rowQuery(rowTask.query, row['product']);
        const subQueryResult = await querySudo(subQ);
        let mapFn;
        if (rowTask.type == 'label-value') {
          mapFn = labelValueToJson;
        } else if (rowTask.type == 'join-value') {
          mapFn = joinValueToJson;
        } else { // rowTask.type == 'multi-value'
          mapFn = multiValueToJson;
        }
        Object.assign(
          row,
          mapFn(subQueryResult.results.bindings)
        );
      }

      rows.push(row);
    };
    i++;
  } while (hasMoreResults)

  const columns = new Set();
  for (const row of rows) {
    for (const key in row) {
      columns.add(key);
    }
  }

  const csv = Papa.unparse(rows, {
    quotes: true,
    delimiter: ';',
    columns: [...columns].sort()
  });

  return csv;
}

/* Executes the export task and adds the generated CSV as new dataset with a distribution */
async function addCsvExport(task, ttlDataset) {
  const datasetUuid = uuid();
  const datasetUri = `${BASE_URI}/id/datasets/${datasetUuid}`;
  const fileUuid = uuid();
  const fileUri = `${BASE_URI}/id/files/${fileUuid}`;
  const fileName = `${task.fileName}.csv`;
  const physicalFileUuid = uuid();
  const physicalFile = `/share/${physicalFileUuid}.csv`;
  const physicalFileUri = physicalFile.replace('/share/', 'share://');
  const permalink = `${HOST_DOMAIN}${task.permalink}`;

  const csv = await queryCsv(task);
  await writeFile(physicalFile, csv);

  const now = new Date();
  const fileStats = await stat(physicalFile);
  const size = fileStats.size;

  const result = await querySudo(`
      PREFIX dcat: <http://www.w3.org/ns/dcat#>
      PREFIX dct:  <http://purl.org/dc/terms/>
      PREFIX prov: <http://www.w3.org/ns/prov#>

      SELECT ?dataset
      WHERE {
        GRAPH ?g {
          ?dataset a dcat:Dataset ;
            dct:type ${sparqlEscapeUri(task.datasetType)} ;
            dcat:distribution ?distribution .
          ?distribution dct:format "text/csv" .
          FILTER NOT EXISTS { ?newerVersion prov:wasRevisionOf ?dataset . }
        }
      } LIMIT 1`);

  let previousDataset;
  if (result.results.bindings.length) {
    previousDataset = result.results.bindings[0]['dataset'].value;
    console.log(`Found previous dataset <${previousDataset}> of type <${task.datasetType}>`);
  } else {
    console.log(`No previous dataset of type <${task.datasetType}> found to link to.`);
  }

  await querySudo(`
    PREFIX nfo: <http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#>
    PREFIX schema: <http://schema.org/>
    DELETE {
      GRAPH ?g {
        ?s schema:url ${sparqlEscapeUri(permalink)} .
      }
    } WHERE {
      GRAPH ?g {
        ?s a nfo:FileDataObject ;
          schema:url ${sparqlEscapeUri(permalink)} .
      }
    }
  `);

  const graph = task.datasetGraph || PUBLIC_GRAPH;
  const previousDatasetStatement = previousDataset
        ? ` <${datasetUri}> prov:wasRevisionOf <${previousDataset}> . `
        : '';
  await updateSudo(`
    PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
    PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX nie: <http://www.semanticdesktop.org/ontologies/2007/01/19/nie#>
    PREFIX nfo: <http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#>
    PREFIX dbpedia: <http://dbpedia.org/ontology/>
    PREFIX dcat: <http://www.w3.org/ns/dcat#>
    PREFIX prov: <http://www.w3.org/ns/prov#>
    PREFIX schema: <http://schema.org/>

    INSERT DATA {
      GRAPH <${graph}> {
        <${datasetUri}> a dcat:Dataset ;
          mu:uuid ${sparqlEscapeString(datasetUuid)} ;
          dct:title ${sparqlEscapeString(task.title)} ;
          dct:type ${sparqlEscapeUri(task.datasetType)} ;
          dct:created ${sparqlEscapeDateTime(now)} ;
          dct:modified ${sparqlEscapeDateTime(now)} ;
          dct:issued ${sparqlEscapeDateTime(now)} ;
          dcat:distribution <${fileUri}> ;
          prov:wasDerivedFrom <${ttlDataset}> .
        ${previousDatasetStatement}
        <${fileUri}> a nfo:FileDataObject, dcat:Distribution ;
          mu:uuid "${fileUuid}" ;
          nfo:fileName ${sparqlEscapeString(fileName)} ;
          dct:format "text/csv" ;
          dbpedia:fileExtension "csv" ;
          nfo:fileSize ${sparqlEscapeInt(size)} ;
          dcat:downloadURL <${HOST_DOMAIN}/files/${fileUuid}/download> ;
          schema:url ${sparqlEscapeUri(permalink)} ;
          dct:created ${sparqlEscapeDateTime(now)} ;
          dct:modified ${sparqlEscapeDateTime(now)} ;
          dct:issued ${sparqlEscapeDateTime(now)} .
        <${physicalFileUri}> a nfo:FileDataObject ;
          mu:uuid "${physicalFileUuid}" ;
          nie:dataSource <${fileUri}> ;
          nfo:fileName "${physicalFileUuid}.csv" ;
          dct:format "text/csv" ;
          dbpedia:fileExtension "csv" ;
          nfo:fileSize ${sparqlEscapeInt(size)} ;
          dct:created ${sparqlEscapeDateTime(now)} ;
          dct:modified ${sparqlEscapeDateTime(now)} .
      }
    }`);

  return {
    uri: fileUri,
    uuid: fileUuid,
  };
}

export {
  fetchDataset,
  addCsvExport,
  findFileByUrl,
  HOST_DOMAIN
}
