const Handlebars = require('handlebars');
const fetch = require('node-fetch');
const FormData = require('form-data');
const LogEntry = require('./log-entry');
const is = require('type-is');
const { URLSearchParams } = require('url');

async function sparql(query, endpoint, accept) {
  const params = new URLSearchParams();
  params.append('query', query);

  const options = {
    method: 'POST',
    body: params,
    headers: {
      'Accept': accept || 'application/sparql-results+json',
      'content-type': 'application/x-www-form-urlencoded'
    }
  };

  const res = await fetch(endpoint, options);
  if (!res.ok) {
    throw new Error(`unexpected http response '${res.status} ${res.statusText}' from '${endpoint}'`);
  }

  const contentType = res.headers.get('Content-Type');
  if (is.is(contentType, ['json', '+json'])) {
    return {results: await res.json(), contentType};
  } else {
    return {results: await res.text(), contentType};
  }
};

module.exports = class SPARQLProcedure {
  constructor(data) {
    this.data = data;
  }

  async execute(context, logEntries, accept) {
    const template = Handlebars.compile(this.data.data, {noEscape: true});
    const query = template(context);
    logEntries.push(new LogEntry('SPARQL endpoint', this.data.endpoint));
    logEntries.push(new LogEntry('SPARQL query', query));
    return await sparql(query, this.data.endpoint, accept);
  }
};
