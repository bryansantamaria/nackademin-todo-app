import React, { Component } from "react";

class ToDoItem extends Component {
  state = {};

  render() {
    console.log(this.props);
    const { title, done, created, lastUpdated } = this.props.todo;
    return (
      <div>
        <li>{title}</li>
      </div>
    );
  }
}

export default ToDoItem;
