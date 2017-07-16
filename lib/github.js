/**
 * Created by axetroy on 2017/7/16.
 */

const axios = require('axios');
const axiosRetry = require('axios-retry');
const CONFIG = require('../CONFIG');

const instance = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 1000 * 10,
  params: {
    client_id: CONFIG.github_client_id,
    client_secret: CONFIG.github_client_secret
  },
  withCredentials: false,
  responseType: 'json',
  headers: { Accept: 'application/json;charset=utf-8' }
});

instance.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

axiosRetry(instance, { retries: 3 });

module.exports = instance;
