import React, { Component } from "react";
import ToDoItem from "./ToDoItem";

class ToDoContainer extends Component {
  state = {};
  render() {
    console.log(this.props.todos);
    return (
      <div className="toDoContainer">
        {this.props.todos.map((todo) => (
          <ToDoItem key={todo._id} todo={todo} />
        ))}
      </div>
    );
  }
}

export default ToDoContainer;
