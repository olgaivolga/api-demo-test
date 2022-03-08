////////////////////////////////////////////
// Methods for sending requests to API
////////////////////////////////////////////

const config = require('config');
const axios=require('axios');

axios.defaults.baseURL = config.get('url') + '/api';
// axios.defaults.headers.common['Authorization'] = config.get('auth');

module.exports = {

  api_get : function(endpoint) {
    return axios.get(endpoint)
    .then(function(response) {
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return error.message;
      }
    })
  },

  api_delete : function(endpoint,data) {
    return axios.delete(endpoint,{ data: data })
    .then(function(response) {
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return error.message;
      }
    })
  },

  api_post : function(endpoint,data) {
    return axios.post(endpoint, data)
    .then(function(response) {
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return error.message;
      }
    })
  },

  api_put : function(endpoint,data) {
    return axios.put(endpoint, data)
    .then(function(response) {
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return error.message;
      }
    })
  }

}
