import React from "react";
import ReactDOM from "react-dom";

const axios = require('axios');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      value: '',
      search: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddOrUpdate = this.handleAddOrUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
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

  handleAddOrUpdate() {
    console.log(this.state.term, this.state.definition);
    // makes a post request to add this entry to the database
    /*axios.request({
      method: 'post',
      url: '/glossary',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token'
      },
      data: {
      }
    }).then(response => console.log("Entry Created")).catch(err => {
      console.log("Error Updating List: ", err);
    });*/

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

  handleAddChange(event) {
    this.setState({value: event.target.value});
  }

  handleSearchChange(event) {
    this.setState({search: event.target.value});
  }

  componentDidMount() {


  }

  render() {

    return (
      <div>
        <h1>Glossary</h1>

        <form onSubmit={this.handleSearch}>
          <input type="text" value={this.state.search} onChange={this.handleSearchChange}/>
          <input type="submit"  value="Search" />
        </form>

        <br></br>

        <form onSubmit={this.handleAddOrUpdate}>
          <label>Add (format = term: definition)
            <br></br>
          <input type="text" value={this.state.value} onChange={this.handleAddChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <div>
          <p>{this.state.search}</p>
          <p>{this.state.value}</p>
        </div>

        <ul>
          {this.generateList()}
        </ul>
      </div>
    );

  };

}

ReactDOM.render(<App />, document.getElementById("root"));
