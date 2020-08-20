import React, { Component } from "react";

class ToDoItem extends Component {
  state = {};

  completeToDo = (id) => {
    return console.log("Completed", id);
  };

  delete = (id) => {
    return console.log("Deleted", id);
  };

  update = (id) => {
    return console.log("Update", id);
  };
  render() {
    const { title, done, created, lastUpdated, _id } = this.props.todo;
    return (
      <li className="toDoItem">
        <input type="checkbox" onChange={() => this.completeToDo(_id)}></input>
        {title}{" "}
        <button type="button" onClick={() => this.delete(_id)}>
          Delete
        </button>
        <button type="button" onClick={() => this.update(_id)}>
          Edit
        </button>
      </li>
    );
  }
}

export default ToDoItem;
