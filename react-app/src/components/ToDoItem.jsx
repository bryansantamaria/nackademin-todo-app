import React, { Component } from "react";

class ToDoItem extends Component {
  state = {};
  render() {
    const { title, done, created, lastUpdated } = this.props;
    console.log(title);
    return (
      <div>
        <li>{title}</li>
        <p>{done}</p>
      </div>
    );
  }
}

export default ToDoItem;
