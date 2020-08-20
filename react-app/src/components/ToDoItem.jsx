import React, { Component } from "react";

class ToDoItem extends Component {
  state = {};

  render() {
    const { title, done, created, lastUpdated, _id } = this.props.todo;
    return (
      <li className="toDoItem">
        <input
          type="checkbox"
          onChange={() => this.props.complete(_id)}
        ></input>
        {title}{" "}
        <button type="button" onClick={() => this.props.delete(_id)}>
          Delete
        </button>
        <button type="button" onClick={() => this.props.update(_id)}>
          Edit
        </button>
      </li>
    );
  }
}

export default ToDoItem;
