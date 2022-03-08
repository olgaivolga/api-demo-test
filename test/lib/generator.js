const config = require('config');
const SwaggerParser = require("@apidevtools/swagger-parser");
const OpenAPISampler = require('openapi-sampler');
const fs = require('fs');
const path = require('path');

async function original_schema() {
  return SwaggerParser.bundle(config.get('schema'));
}

// format GET request path
function format_request_wo_body(path,timestamp) {
    let unique_name = timestamp;
    mpath = path.replace(/pets\/{id}/g,"pets\/"+unique_name);
    return { path: mpath , schema_path: path};
}  

// get paths that include GET method from schema
module.exports.requests_get = async function requests_get(timestamp) {
    let api = await original_schema();
    let requests = [];
    for(let p in api.paths) {
      if (api.paths[p].get) {
        let request = format_request_wo_body(p,timestamp);
        requests.push(request);
      }
    }
    return requests;
}

// get paths that include DELETE method from schema
module.exports.requests_delete = async function requests_delete(timestamp) {
  let api = await original_schema();
  let requests = [];
  for(let p in api.paths) {
    if (api.paths[p].delete) {
      let request = format_request_wo_body(p,timestamp);
      requests.push(request);
    }
  }
  return requests;
}

// format POST request path
function format_request_w_body(path,body = null,timestamp) {
  let unique_name = timestamp;
  mpath = path.replace(/pets\/{id}/g,"pets\/"+unique_name);
  return {
    path: mpath,
    schema_path: path,
    body: body
  };
}

// get paths that include POST method from schema
module.exports.requests_post = async function requests_post(timestamp) {
  let api = await original_schema();
  let requests = [];
  for(let p in api.paths) {
    if (api.paths[p].post) {
      let schema = expand(api.paths[p].post, ["requestBody","content","application/json","schema"])
      let body = OpenAPISampler.sample(schema, {quiet: true, skipReadOnly: true}, api);
      let request = format_request_w_body(p,body,timestamp);
      requests.push(request);
    }
  }
  return requests;
}

function expand(object, path) {
  if (!object || path.length === 0) return object
  let first = path.shift();
  return expand(object[first], path)
}

module.exports.schema_response = async function schema_response(path,method='get',code='200') {
    let api = await original_schema();
    let schema = expand(api.paths[path][method], ["responses",code,"content","application/json","schema"])
    let response = OpenAPISampler.sample(schema, {quiet: true}, api);
    return response;
}
  