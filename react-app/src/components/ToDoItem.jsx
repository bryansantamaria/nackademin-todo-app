import React, { Component } from "react";
import { Button, Checkbox, TableCell, TableRow } from "@material-ui/core";

class ToDoItem extends Component {
  state = {};

  getLineThrough = () => {
    const { done } = this.props.todo;
    return {
      textDecoration: done ? "line-through" : "none",
    };
  };

  render() {
    const { title, created, lastUpdated, _id } = this.props.todo;

    return (
      <TableRow key={_id} hover>
        <TableCell component="th" scope="row" style={this.getLineThrough()}>
          <Checkbox
            edge="start"
            type="checkbox"
            onChange={() => this.props.complete(_id)}
            className="checkboxes"
            checked={this.props.todo.done}
            tabIndex={-1}
            color="primary"
          />
          {title}
        </TableCell>
        <TableCell style={this.getLineThrough()} align="right">
          {created}
        </TableCell>
        <TableCell style={this.getLineThrough()} align="right">
          {lastUpdated}
        </TableCell>
        <TableCell align="right">
          <Button
            className="btn-todoitem"
            type="button"
            onClick={() => this.props.delete(_id)}
            variant="contained"
            color="secondary"
            size="small"
          >
            <i className="fas fa-trash-alt"></i>
          </Button>
          <Button
            className="btn-todoitem"
            type="button"
            onClick={() => this.props.selectTodo(_id)}
            variant="contained"
            color="primary"
            size="small"
          >
            <i className="fas fa-edit"></i>
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default ToDoItem;
