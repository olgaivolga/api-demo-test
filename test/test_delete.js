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
    paths = await generator.requests_delete(timestamp);
  })
  
  it("test cases for DELETE", function() {

    describe('DELETE response should satisfy JSON schema', function() {
    
      paths.forEach(function(item) {
        it('DELETE ' + item.path, async function() {
          // send http request to API
          let res = await api.api_delete(item.path);
          expect(res.status, JSON.stringify(res.data)).to.equal(204);
        });
      })
    })

  })
})
