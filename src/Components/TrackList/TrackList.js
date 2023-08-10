import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";
import "@testing-library/jest-dom/matchers"; // Import jest-dom for custom matchers

// eslint-disable-next-line
import { toHaveDisplayValue } from "@testing-library/jest-dom/matchers"; 


class TrackList extends React.Component {
  render() {
    // Add a conditional check to ensure that this.props.tracks is defined
    if (!this.props.tracks) {
      return null; // or you can render a loading indicator or an empty state
    }

    return (
      <div className="TrackList">
        {this.props.tracks.map((track) => {
          return (
            <Track
              track={track}
              key={track.id}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
            />
          );
        })}
      </div>
    );
  }
}

export default TrackList;
