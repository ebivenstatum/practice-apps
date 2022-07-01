const mongoose = require("mongoose");
//const config = reqire("./server/.env");

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

mongoose.connect(`mongodb://localhost/glossary`)
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

/*Glossary.remove({}, function(err) {
  console.log('collection removed')
});*/

const create = (data) => {

  Glossary.create(data)
    .then(results => {
      console.log("Entry Successfully Created");
    })
    .catch(err => console.log(err));

};

const getItems = (callback) => {

  Glossary.find().sort({ term: 'asc' })
    .then(results => callback(null, results))
    .catch(err => callback(err));

};

module.exports = {
  create,
  getItems
}