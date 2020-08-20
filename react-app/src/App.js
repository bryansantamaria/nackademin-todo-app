import React, { Component } from "react";
import axios from "axios";
import "./stylesheets/styles.css";
import CreateToDo from "./components/CreateToDo";
import ToDoContainer from "./components/ToDoContainer";

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

  render() {
    console.log(this.state.todos);
    return (
      <div className="App">
        <header className="App-header">
          <CreateToDo createToDo={this.createToDo} />
          <ToDoContainer todos={this.state.todos} />
          <p> But first I will focus on creating the BACKEND! :D</p>
        </header>
      </div>
    );
  }
}

export default App;
