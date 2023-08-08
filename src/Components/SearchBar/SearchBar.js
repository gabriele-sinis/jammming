import React from "react";
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      term: ''
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(event){
    event.preventDefault();
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event){
    this.setState({term: event.target.value});
  }

  render() {
    return (
      <form className="SearchBar" onSubmit={this.search}>
        <label htmlFor="searchInput">Search:</label>
        <input id="searchInput" onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <button className="SearchButton" type="submit">SEARCH</button>
      </form>
    );
  }
}

export default SearchBar;
