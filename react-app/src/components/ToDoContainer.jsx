import React, { Component } from "react";
import ToDoItem from "./ToDoItem";
import CreateToDo from "./CreateToDo";
import {
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

  addUserIfAdmin = () => {
    return this.props.users.role === "admin" ? (
      <span>
        <a className="addUserIcon" href="/create">
          <i className="fas fa-user-plus userIcons" href="/create"></i>
        </a>{" "}
        <span id="add">Add</span>
      </span>
    ) : (
      <span></span>
    );
  };

  render() {
    return (
      <div className="toDoContainer">
        <div id="toDoHeader">
          <i className="fas fa-user userIcons" id="user">
            {" "}
          </i>
          <span id="userOnline">
            {" "}
            Hi {this.props.users.name} ({this.props.users.role})
          </span>
          <div id="userGrid">
            {this.addUserIfAdmin()}
            <a id="logoutBtn" className="fas fa-sign-out-alt" href="/login"></a>
            <span id="logout">Logout</span>
          </div>
        </div>

        <Paper id="container">
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
          <CreateToDo
            createToDo={this.props.createToDo}
            update={this.props.update}
            selectedTodo={this.props.selectedTodo}
            inputField={this.props.inputField}
            editBtnState={this.props.editBtnState}
            handleBtnState={this.props.handleBtnState}
          />
        </Paper>
      </div>
    );
  }
}

export default ToDoContainer;
