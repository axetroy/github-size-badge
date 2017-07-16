/**
 * Created by axetroy on 17-4-26.
 */
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/', function(req, res) {
  res.send('Hello World.');
});

app.listen(PORT, function() {
  console.log(`Listen the port: ${PORT}`);
});
