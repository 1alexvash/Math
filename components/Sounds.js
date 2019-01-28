import React, { Component } from "react";

export default class Sounds extends Component {
  render() {
    return (
      <div className="sounds">
        <audio className="clicking">
          <source src="static/sounds/sound_clicking.mp3" />
        </audio>
        <audio className="success">
          <source src="static/sounds/sound_success.mp3" />
        </audio>
        <audio className="failure">
          <source src="static/sounds/sound_failure.mp3" />
        </audio>
      </div>
    );
  }
}
