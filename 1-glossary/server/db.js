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

const create = (data) => {
  // takes term and def as data
  console.log(data);
  /*Glossary.create(data).exec((err, results) => {
    if (err) {
      console.log("Error!", err);
    } else {
      console.log("Entry Successfully Created");
    }
  });*/
};

const find = (term) => {
  // if search term does not exist, return all db entries
  if (term) {
    Glossary.find(term).sort({ term: 'asc' }).exec((err, results) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        return results;
      }
    });
  } else {
    Glossary.find().sort({ term: 'asc' }).exec((err, results) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        return results;
      }
    });
  }
};

module.exports = {
  create,
  find
}