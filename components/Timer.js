import React, { Component } from "react";

export default class Timer extends Component {
  render() {
    let width = (100 / 60) * this.props.secondsLeft + "%";
    return (
      <div className="timer">
        <div className="time-left" style={{ width }} />
      </div>
    );
  }
}
