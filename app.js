var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var bodyParser = require('body-parser');
var assert = require('assert');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
var db;
var mongo_url = process.env.MONGO_URL ||
  'mongodb://localhost:27017/risk-tracker';

MongoClient.connect(mongo_url, (err, database) => {
  assert.equal(null, err);
  db = database;
  app.listen(3000, function () {
    console.log('listening on port 3000 ...');
  });
});

app.get('/', (req, res) => {
  res.redirect('/risks.html');
});

app.get('/api/risks', (req, res) => {
  db.collection('risks').find().toArray((err, results) => {
    res.json({ risks: results });
  });
});

app.post('/api/risks', (req, res) => {
  db.collection('risks').insert(req.body, (err, result) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ risk: req.body });
    }
  });
});
