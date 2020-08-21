import React, { Component } from "react";
import axios from "axios";
import "./stylesheets/styles.css";
import CreateToDo from "./components/CreateToDo";
import ToDoContainer from "./components/ToDoContainer";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  //Application has rendered on the client side
  componentDidMount() {
    axios
      .get("http://localhost:8080/todo")
      .then((res) => this.setState({ todos: res.data }));
  }

  //Body posts title & done, then recieves data from end point and updates state.
  createToDo = (title) => {
    axios
      .post("http://localhost:8080/todo/create", {
        title: title,
        done: false,
      })
      .then((res) => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  complete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo._id === id) {
          todo.done = !todo.done;
        }
        return todo;
      }),
    });
  };

  //Copy current todos array, filter out item being deleted and update state.
  delete = (id) => {
    const toDoList = [...this.state.todos];
    const newTodos = toDoList.filter((todo) => todo._id !== id);

    axios
      .delete(`http://localhost:8080/todo/delete/${id}`)
      .then((res) => this.setState({ todos: newTodos }));
    console.log("Deleted", id);
  };

  update = (id) => {
    return console.log("Update", id);
  };

  render() {
    console.log(this.state.todos);
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Card className="card-container">
              <CardContent>
                <ToDoContainer
                  todos={this.state.todos}
                  complete={this.complete}
                  delete={this.delete}
                  update={this.update}
                />
              </CardContent>
              <CardActions>
                <CreateToDo createToDo={this.createToDo} />
              </CardActions>
            </Card>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
