const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

let port = 3000;
let file = "/glossary"

mongoose
  .connect(`mongodb://127.0.0.1:${port}${file}`)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

const glossarySchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    unique: true
  },
  definition: {
    type: String,
    required: true
  }
});

const Glossary = new mongoose.model("Glossary", glossarySchema);

const create = (data) => {
  // takes term and def as data
};

const find = (term) => {
  // if search term does not exist, return all db entries
};

module.exports = {
  create,
  find
}