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
  db.getItems(req.body, function(err, data) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(data);
      res.status(200).send(data);
    }
  })

});

app.listen(3000);
console.log(`Listening at http://localhost:3000`);
