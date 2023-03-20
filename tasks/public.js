import ExportTask from './export-task';

export default class PublicExport extends ExportTask {
  title = 'Algemene en toegankelijkheidsinformatie over toeristische attracties in Vlaanderen';
  datasetType = 'http://linked.toerismevlaanderen.be/id/dataset-types/ca82a1e3-8a7c-438e-ba37-cf36063ba060';
  fileName = 'public';
  graphs = [
    'http://mu.semte.ch/graphs/public',
    'http://mu.semte.ch/graphs/mapped/public',
  ];
  query = `
PREFIX adms: <http://www.w3.org/ns/adms#>
PREFIX adres: <https://data.vlaanderen.be/ns/adres#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX generiek: <https://data.vlaanderen.be/ns/generiek#>
PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
PREFIX locn: <http://www.w3.org/ns/locn#>
PREFIX logies: <https://data.vlaanderen.be/ns/logies#>
PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
PREFIX org: <http://www.w3.org/ns/org#>
PREFIX organisatie: <https://data.vlaanderen.be/ns/organisatie#>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX regorg: <http://www.w3.org/ns/regorg#>
PREFIX schema: <http://schema.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX tvl: <http://linked.toerismevlaanderen.be/vocabularies/accessibility/>
PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>
PREFIX wgs: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT DISTINCT
?product
?name
?altName
?type
?category
?registrationStatusLabel
?productType
?modified
?street
?houseNumber
?boxNumber
?postalCode
?cityName
?lat
?long
?promotionalRegion
?email
?website
?rating
?greenKeyLabel
?accessibilityLabel
%FROM%
WHERE {
  ?product a logies:Logies .

  OPTIONAL {
    ?product logies:heeftRegistratie ?registration .
    ?registration logies:registratieStatus ?registrationStatus .
    FILTER (?registrationStatus != <http://linked.toerismevlaanderen.be/id/concepts/1ab08286-bc53-4a09-958d-e29b4acd76bf>)
    ?registrationStatus skos:prefLabel ?registrationStatusLabel .
    FILTER(LANG(?registrationStatusLabel) = "nl")

    OPTIONAL {
      ?registration dct:type/skos:prefLabel ?type .
      FILTER(LANG(?type) = "nl")
    }
    OPTIONAL {
      ?registration tvl:category/skos:prefLabel ?category .
      FILTER(LANG(?category) = "nl")
    }
  }

  OPTIONAL { ?product schema:name ?name . }
  OPTIONAL { ?product schema:alternativeName ?altName . }
  OPTIONAL { ?product dct:modified ?modified . }

  OPTIONAL { ?parent logies:heeftAlternatieveUitbating ?product . }
  BIND(IF(BOUND(?parent), "PROMO", "BASE") as ?productType)

  OPTIONAL {
    ?product logies:onthaalAdres ?address .
    OPTIONAL { ?address locn:thoroughfare ?street . }
    OPTIONAL { ?address adres:Adresvoorstelling.huisnummer ?houseNumber . }
    OPTIONAL { ?address adres:Adresvoorstelling.busnummer ?boxNumber . }
    OPTIONAL { ?address locn:postCode ?postalCode . }
    OPTIONAL { ?address adres:gemeentenaam ?cityName . }
  }

  OPTIONAL {
    ?product logies:onthaalLocatie ?location .
    OPTIONAL { ?location wgs:lat ?lat . }
    OPTIONAL { ?location wgs:long ?long . }
  }

  OPTIONAL { ?product logies:behoortTotToeristischeRegio/skos:prefLabel ?promotionalRegion . }

  OPTIONAL {
    ?product schema:contactPoint ?contactPointEmail .
    FILTER NOT EXISTS { ?contactPointEmail schema:contactType ?contactTypeEmail . }
    ?contactPointEmail schema:email ?email .
  }
  OPTIONAL {
    ?product schema:contactPoint ?contactPointWebsite .
    FILTER NOT EXISTS { ?contactPointWebsite schema:contactType ?contactTypeWebsite . }
    FILTER NOT EXISTS { ?contactPointWebsite foaf:name ?contactPointChannel . }
    ?contactPointWebsite foaf:page ?website .
  }

  OPTIONAL {
    ?product schema:starRating/schema:ratingValue ?rating .
  }

  OPTIONAL {
    ?product logies:heeftKwaliteitslabel ?greenKeyLabel .
    ?greenKeyLabel skos:prefLabel "Green Key"@nl .
  }

  OPTIONAL {
    ?product logies:heeftKwaliteitslabel ?accessibilityLabel .
    ?accessibilityLabel skos:prefLabel ?accessibilityPrefLabel .
    FILTER (CONTAINS(STR(?accessibilityPrefLabel), "Toegankelijkheidslabel"))
  }

} ORDER BY ?type ?name ?product LIMIT %LIMIT% OFFSET %OFFSET%`;
  perRowQueries = [
    {
      type: 'multi-value',
      query: `PREFIX schema: <http://schema.org/>
     SELECT DISTINCT ?telephone
     %FROM%
     WHERE {
       <%s%> schema:contactPoint ?contactPoint .
       FILTER NOT EXISTS { ?contactPoint schema:contactType ?contactType . }
       ?contactPoint schema:telephone ?telephone .
     }`
    }
  ]
};
