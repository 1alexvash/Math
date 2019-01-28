import React, { Component } from "react";

export default class Input extends Component {
  render() {
    let { input } = this.props;
    return <div className="input">{input}</div>;
  }
}
