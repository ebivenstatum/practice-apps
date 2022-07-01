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
    //this.updateList = this.updateList.bind(this);
  }

  handleSearch(event) {
    // filters all entries using search term
    event.preventDefault();

    axios
      .get('/glossary')
      .then(response => this.setState({ entries: response.data }))
      .then(() => {
        let newEntries = [];

        this.state.entries.forEach(entry => {

          if (entry.term.includes(this.state.search) || entry.definition.includes(this.state.search)) {
            newEntries.push(entry)
          }

        });

        this.setState({ entries: newEntries, search: '' });

      })
      .catch(err => {
        console.log(err);
      });

  }

  handleAddOrUpdate(event) {

    event.preventDefault();

    let input = this.state.value.split(': ');
    this.setState({ value: '' });

    // makes a post request to add this entry to the database
    axios
      .request({
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
      })
      .then(response => this.updateList())
      .catch(err => {
        console.log("Error Updating List: ", err);
      });

  }

  updateList() {
    // makes a get request for all entries currently in database

    axios
      .get('/glossary')
      .then(response => this.setState({ entries: response.data }))
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

    const listItems = this.state.entries.map((entry) => <div key={entry.term}><p>{entry.term}: {entry.definition}  <button id="updateButton" onClick={this.handleAddOrUpdate}>Update</button> <button id="deleteButton" >Delete</button></p><br></br></div>);

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
