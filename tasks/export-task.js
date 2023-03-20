import { sparqlEscapeUri } from 'mu';

export default class ExportTask {
  title;
  datasetType;
  fileName;
  graphs = [];
  datasetGraph;
  query;
  perRowQueries = [];

  get fromGraphsStatement() {
    return this.graphs.map((g) => `FROM ${sparqlEscapeUri(g)}`).join('\n');
  }

  batchedQuery(limit, offset) {
    return this.query
      .replace('%FROM%', this.fromGraphsStatement)
      .replace('%LIMIT%', limit)
      .replace('%OFFSET%', offset);
  }

  rowQuery(template, subject) {
    return template
      .replace('%FROM%', this.fromGraphsStatement)
      .replace('%s%', subject);
  }
}
