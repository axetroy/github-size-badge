/**
 * Created by axetroy on 17-4-26.
 */
const express = require('express');
const prettyBytes = require('pretty-bytes');
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

function generateSvg(size) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="90" height="20">
    <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <rect rx="3" width="90" height="20" fill="#555"/><rect rx="3" x="37" width="53" height="20" fill="#4c1"/>
    <path fill="#4c1" d="M37 0h4v20h-4z"/>
    <rect rx="3" width="90" height="20" fill="url(#a)"/>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
      <text x="19.5" y="15" fill="#010101" fill-opacity=".3">size</text>
      <text x="19.5" y="14">size</text>
      <text x="62.5" y="15" fill="#010101" fill-opacity=".3">${size
        ? prettyBytes(size * 1024)
        : 'null'}</text>
      <text x="62.5" y="14">${size ? prettyBytes(size * 1024) : 'null'}</text>
    </g>
</svg>
  `;
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/', function(req, res) {
  res.send('Hello World.');
});

app.get('/:owner/:repo.svg', function(req, res) {
  const { owner, repo } = req.params;
  http
    .get(`https://api.github.com/repos/${owner}/${repo}`)
    .then(function(response) {
      res.status(200).send(generateSvg(response.data.size));
    })
    .catch(function(err) {
      res.status(200).send(generateSvg(null));
    });
});

app.listen(PORT, function() {
  console.log(`Listen the port: ${PORT}`);
});
