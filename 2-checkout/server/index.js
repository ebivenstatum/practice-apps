require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json());

/****
 *
 *
 * Other routes here....
 *
 *
 */
app.post('/checkout', (req, res) => {
  db.add(req.body, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.status(201).send('Form Succesfully Submitted')
    }
  });
});

//app.listen(process.env.PORT);
app.listen(3000);
console.log(`Listening at http://localhost:3000`);
