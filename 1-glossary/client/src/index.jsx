import React from "react";
import { render } from "react-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: []
      term: '',
      definition: ''
    }
  }

  generateList() {
    // for each item in this.state.entries, generate a list item containing term, definition, update button, and delete button
  }

  handleSearch() {
    // makes a get request that returns and renders all entries containing that term
  }

  handleAdd() {
    // makes a post request to add this entry to the databse
    this.updateList();
  }

  handleUpdate() {
    // makes a post request to update this entries data in the database
  }

  handleDelete() {
    // makes a post request to delete this entry from database
    this.updateList();
  }

  updateList() {
    // makes a get request for all entries currently in database
  }

  componentDidMount() {
    this.updateList();
  }

  render() {

    return (
    <div>
      <h1>Glossary</h1>
      <form>
        <input type="text" id="search"></input>
        <input type="submit">Search</input>
      </form>
      <br></br>
      <form id="add">
        <input type="text" id="term">Term: </input>
        <input type="text" id="definition">Definition: </input>
        <input type="submit">Add</input>
      </form>

      <ul>

      </ul>
    </div>
    );

    //document.getElementById("root")
};


}
