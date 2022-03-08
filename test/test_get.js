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
    // create a list of paths
    paths = await generator.requests_get(timestamp);
  })
  
  it("test cases for GET", function() {

    describe('GET response should satisfy JSON schema', function() {
    
      paths.forEach(function(item) {
        it('GET ' + item.path, async function() {
          // send http request to API
          let res = await api.api_get(item.path);
          expect(res.status, JSON.stringify(res.data)).to.equal(200);
          // extract response from JSON schema
          let expected = await generator.schema_response(item.schema_path, 'get', 200);
          // validate types in response against JSON schema
          if(!Array.isArray(res.data)) {
            let mismatched_types = comparator.diff_types(res.data,expected);
            expect(mismatched_types, 'Response contains types not matching the schema: ' + JSON.stringify(mismatched_types)).to.be.an('array').that.is.empty;
          } else {
            res.data.forEach(function(item) {
                let mismatched_types = comparator.diff_types(item,expected[0]);
                expect(mismatched_types, 'Response contains types not matching the schema: ' + JSON.stringify(mismatched_types)).to.be.an('array').that.is.empty;  
            })
          }
        });
      })
    })

  })
})
