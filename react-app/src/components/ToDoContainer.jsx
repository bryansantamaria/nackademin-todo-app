import React, { Component } from "react";
import ToDoItem from "./ToDoItem";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

class ToDoContainer extends Component {
  state = {};

  toggleCreatedArrow = () => {
    return this.props.toggleCreateOrder ? (
      <span className="arrow">&uarr;</span>
    ) : (
      <span className="arrow">&darr;</span>
    );
  };
  toggleUpdatedArrow = () => {
    return this.props.toggleUpdatedOrder ? (
      <span className="arrow">&uarr;</span>
    ) : (
      <span className="arrow">&darr;</span>
    );
  };

  render() {
    return (
      <div className="toDoContainer">
        <Typography variant="h2" component="h2" className="ToDoHeader">
          {" "}
          To do
        </Typography>
        <Paper>
          <TableContainer component={Paper} style={{ maxHeight: "70vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <h3>Title</h3>
                  </TableCell>
                  <TableCell align="right">
                    <span
                      className="orderBy"
                      onClick={() => this.props.orderByCreated()}
                    >
                      <h3>Created {this.toggleCreatedArrow()}</h3>
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <span
                      className="orderBy"
                      onClick={() => this.props.orderByUpdated()}
                    >
                      <h3>Last Updated {this.toggleUpdatedArrow()}</h3>
                    </span>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.todos.map((todo) => (
                  <ToDoItem
                    key={todo._id}
                    todo={todo}
                    complete={this.props.complete}
                    delete={this.props.delete}
                    selectTodo={this.props.selectTodo}
                  />
                ))}
              </TableBody>
            </Table>
            <div className="bottomNavigator">
              <span className="paginationSpan">
                {this.props.todos.length} items
              </span>
              <button
                type="button"
                className="paginationBtn"
                onClick={this.props.paginateFwrd}
              >
                &rarr;
              </button>
              <button
                type="button"
                className="paginationBtn"
                onClick={this.props.paginateBckwrd}
              >
                &larr;
              </button>
            </div>
          </TableContainer>
        </Paper>
      </div>
    );
  }
}

export default ToDoContainer;
