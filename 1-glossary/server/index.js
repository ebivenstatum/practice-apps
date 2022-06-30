//require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./db.js"); // import mongoose db

const app = express();

app.use(express.json());
// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 */
app.post('/glossary', function(req, res) {

  db.create({term: req.body.term, definition: req.body.definition});
  //.then(data => {
    res.sendStatus(201);
  //})
});

app.get('/glossary', function(req, res) {
  db.find(req.body).then(items => {
    return res.json(items);
  });
});

app.listen(3000);
console.log(`Listening at http://localhost:3000`);
