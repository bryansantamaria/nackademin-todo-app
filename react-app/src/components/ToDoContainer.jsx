import React, { Component } from "react";
import ToDoItem from "./ToDoItem";

class ToDoContainer extends Component {
  state = {};
  render() {
    return (
      <div className="toDoContainer">
        <ul className="nobull">
          {this.props.todos.map((todo) => (
            <ToDoItem key={todo._id} todo={todo} />
          ))}
        </ul>
      </div>
    );
  }
}

export default ToDoContainer;
