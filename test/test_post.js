const config = require('config');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should;
const api = require('./lib/api.js');
const generator = require('./lib/generator.js');
const comparator = require('./lib/comparator.js');

describe('Generate test cases from JSON schema', function() {

  let paths = [];

  before(async function() {
    // a namespace for this test
    let timestamp = Math.floor((new Date()).getTime() / 1000);
    // create a list of paths with corresponding request body
    paths = await generator.requests_post(timestamp);
  })
  
  it("test cases for POST", function() {

    describe('POST response should satisfy JSON schema', function() {
    
      paths.forEach(function(item) {
        it('POST ' + item.path, async function() {
          // send http request to API
          let res = await api.api_post(item.path,item.body);
          expect(res.status, JSON.stringify(res.data)).to.equal(200);
          // extract response from JSON schema
          let expected = await generator.schema_response(item.schema_path, 'post', 200);
          // validate types in response against JSON schema
          let mismatched_types = comparator.diff_types(res.data,expected);
          expect(mismatched_types, 'Response contains types not matching the schema: ' + JSON.stringify(mismatched_types)).to.be.an('array').that.is.empty;
        });
      })
    })

  })
})
