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
    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  /*generateList() {
    // for each item in this.state.entries, generate a list item containing term, definition, update button, and delete button
    console.log('generated!')
    this.state.entries.forEach(entry => {
      return (
        <li>{entry.term}: {entry.definition}<button id="updateButton" onClick={this.handleAddOrUpdate}>Update</button><button id="deleteButton" onClick={this.handleDelete}>Delete</button></li>
      );
    });

  }*/

  handleSearch(event) {
    // makes a get request that returns and renders all entries containing that term
    event.preventDefault();

    axios
      .get('/glossary', this.state.search)
      .then(response => this.setState({ entries: response.data, search: '' }))
      .catch(err => {
        console.log(err);
      });

  }

  handleAddOrUpdate(event) {

    event.preventDefault();

    let input = this.state.value.split(': ');
    this.setState({ value: '' });

    // makes a post request to add this entry to the database
    axios.request({
      method: 'post',
      url: '/glossary',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token'
      },
      data: {
        term: input[0],
        definition: input[1]
      }
    }).then(response => console.log("Entry Created")).catch(err => {
      console.log("Error Updating List: ", err);
    });

  }

  updateList() {
    // makes a get request for all entries currently in database
    axios
      .get('/glossary')
      .then(response => this.setState({ entries: response.data }))
      //.then(response => this.generateList())
      .catch(err => {
        console.log("Error Updating List: ", err);
      });
  }

  handleAddChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  componentDidMount() {
    this.updateList();
  }

  render() {

    const listItems = this.state.entries.map((entry) => <div><p>{entry.term}: {entry.definition}<button id="updateButton" onClick={this.handleAddOrUpdate}>Update</button></p><br></br></div>);

    return (
      <div>
        <h1>Glossary</h1>

        <br></br>

        <form onSubmit={this.handleSearch}>
          <input type="text" value={this.state.search} onChange={this.handleSearchChange} />
          <input type="submit" value="Search" />
        </form>

        <br></br>

        <form onSubmit={this.handleAddOrUpdate}>
          <label>Add (format = term: definition)
            <br></br>
            <input type="text" value={this.state.value} onChange={this.handleAddChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <br></br>

        <div>
          {listItems}
        </div>

      </div>
    );

  };

}

ReactDOM.render(<App />, document.getElementById("root"));
