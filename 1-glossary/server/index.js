require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./server/db.js"); // import mongoose db

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 */
app.post(file, function(req, res) {
  app.create(req.body).then(data => {
    res.sendStatus();
  });
});

app.get(file, function(req, res) {
  db.find(req.body).then(items => {
    return res.json(items);
  });
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
