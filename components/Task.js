import React, { Component } from "react";

export default class Task extends Component {
  render() {
    let { task, activeClass } = this.props;
    return <div className={`task ${activeClass}`}>{task}</div>;
  }
}
