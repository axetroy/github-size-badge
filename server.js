/**
 * Created by axetroy on 17-4-26.
 */
const express = require('express');

const generateSvg = require('./badge');

const app = express();
const PORT = process.env.PORT || 3000;

const CONFIG = require('./config');

const axios = require('axios');

const http = axios.create({
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

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/:owner/:repo.svg', function(req, res) {
  const { owner, repo } = req.params;
  res.header('Content-Type', 'image/svg+xml;charset=utf-8');
  http
    .get(`https://api.github.com/repos/${owner}/${repo}`)
    .then(function(response) {
      res.status(200).send(generateSvg(response.data.size * 1024));
    })
    .catch(function(err) {
      res.status(200).send(generateSvg());
    });
});

app.get('*', function(req, res) {
  res.send(
    'Please try this address format: https://github-size-badge.herokuapp.com/:owner/:repo.svg'
  );
});

app.listen(PORT, function() {
  console.log(`Listen the port: ${PORT}`);
});
