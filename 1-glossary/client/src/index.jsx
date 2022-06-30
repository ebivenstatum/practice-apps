import React from "react";
import ReactDOM from "react-dom";

const axios = require('axios');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      term: '',
      definition: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddOrUpdate = this.handleAddOrUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this);
  }

  generateList() {
    // for each item in this.state.entries, generate a list item containing term, definition, update button, and delete button
    this.state.entries.forEach(entry => {
      return (
        <li>{entry[0]}: {entry[1]}<button id="updateButton" onClick={this.handleAddOrUpdate}>Update</button><button id="deleteButton" onClick={this.handleDelete}>Delete</button></li>
      );
    });
  }

  handleSearch(term) {
    // makes a get request that returns and renders all entries containing that term
    axios.get('/glossary', term).then(response => this.setState({ entries: response.data })).catch(err => {
      console.log(err);
    });
  }

  handleAddOrUpdate(event) {
    // makes a post request to add this entry to the database
    console.log("2");
    axios({
      method: "POST",
      url: "/glossary",
      data: { term: this.state.term, definiton: this.state.definition },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then(res => {
        this.updateList();
      })
      .catch(err => {
        console.log(err);
      });

  }

  handleDelete(entry) {
    // makes a post request to delete this entry from database
    console.log("1");
    axios({
      method: "POST",
      url: "/glossary",
      data: entry,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then(res => {
        this.updateList();
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateList() {
    // makes a get request for all entries currently in database
    axios.get('/glossary').then(response => this.setState({ entries: response.data })).catch(err => {
      console.log("Error Updating List: ", err);
    });
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  handleDefinitionChange(event) {
    this.setState({ definition: event.target.value });
  }

  componentDidMount() {

    axios.request({
      method: 'post',
      url: '/glossary',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token'
      },
      data: {
        term: "exampleTerm",
        definition: "Example Definition"
      }
    }).then(response => console.log(response)).catch(err => {
      console.log("Error Updating List: ", err);
    });
  }

  render() {

    return (
      <div>
        <h1>Glossary</h1>

        <form>
          <input type="text" id="search" />
          <input type="submit" onSubmit={this.handleSearch} />
        </form>

        <br></br>

        <form id="add">
          <input type="text" id="term" onChange={this.handleTermChange} />
          <input type="text" id="definition" onChange={this.handleDefinitionChange} />
          <input type="submit" onSubmit={this.handleAddOrUpdate} />
        </form>

        <ul>
          {this.generateList()}
        </ul>
      </div>
    );

  };

}

ReactDOM.render(<App />, document.getElementById("root"));
