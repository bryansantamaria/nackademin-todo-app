import React, { Component } from "react";
import ToDoItem from "./ToDoItem";
import { Typography } from "@material-ui/core";

class ToDoContainer extends Component {
  state = {};
  render() {
    return (
      <div className="toDoContainer">
        <Typography variant="h4" component="h2">
          {" "}
          To do
        </Typography>
        <ul className="nobull">
          {this.props.todos.map((todo) => (
            <ToDoItem
              key={todo._id}
              todo={todo}
              complete={this.props.complete}
              delete={this.props.delete}
              update={this.props.update}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ToDoContainer;
