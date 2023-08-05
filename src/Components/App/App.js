import React from "react";
import "/Users/apple/Desktop/jammming/src/Components/App/App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResult from '../SearchResult/SearchResult'
import { render } from "@testing-library/react";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResult />
            {/* <Playlist /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
