/**
 * Created by axetroy on 17-4-26.
 */
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const axios = require('axios');
// const github = require('./lib/github');

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
  axios
    .get(`https://api.github.com/repos/${owner}/${repo}`)
    .then(function(response) {
      console.log(response.data);
      res.status(200).send(`hello ${owner}, repo: ${repo}` + JSON.stringify(response.data));
    })
    .catch(function(err) {
      res.status(200).send(`hello ${owner}, repo: ${repo} fail`);
    });
});

app.listen(PORT, function() {
  console.log(`Listen the port: ${PORT}`);
});
