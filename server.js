const config = require('config');
const express = require('express');
const { createMockMiddleware } = require('openapi-mock-express-middleware');

// A mock for "application under test that implements the API"

const app = express();

app.use(
  '/api', // root path for the mock server
  createMockMiddleware({ spec: config.get('schema') }),
);

app.listen(5000, () => console.log('Server listening on port 5000'));