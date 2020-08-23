import React, { Component } from "react";
import axios from "axios";
import "./stylesheets/styles.css";
import CreateToDo from "./components/CreateToDo";
import ToDoContainer from "./components/ToDoContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      selectedTodo: null,
      inputField: "",
      editBtnState: false,
      toggleCreateOrder: false,
      toggleUpdatedOrder: false,
    };
    this.limit = 0;
  }

  //Application has rendered on the client side
  componentDidMount() {
    axios
      .get("http://localhost:8080/todo")
      .then((res) => this.setState({ todos: res.data }));
  }

  handleBtnState = (editBtnState) => {
    this.setState({ editBtnState });
  };

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

  selectTodo = (id) => {
    const editItem = this.state.todos.find((todo) => todo._id === id);
    this.setState({
      selectedTodo: id,
      inputField: editItem.title,
      editBtnState: true,
    });
    let input = document.getElementById("standard-basic");
    input.focus();
  };

  update = (title) => {
    axios
      .put(`http://localhost:8080/todo/update/${this.state.selectedTodo}`, {
        title: title,
        done: false,
      })
      .then((res) => {
        const index = this.state.todos.findIndex(
          (todo) => todo._id === this.state.selectedTodo
        );
        const oldState = [...this.state.todos];
        oldState[index].title = title;

        this.setState({
          todos: oldState,
          selectedTodo: null,
        });
      });
    return console.log("Update");
  };

  orderByCreated = () => {
    if (this.state.toggleCreateOrder) {
      axios.get(`http://localhost:8080/todo/sort/created${-1}`).then((res) => {
        let oldState = [...this.state.todos];
        oldState = res.data;
        this.setState({
          todos: oldState,
          toggleCreateOrder: false,
        });
      });
    } else if (!this.state.toggleCreateOrder) {
      axios.get(`http://localhost:8080/todo/sort/created${1}`).then((res) => {
        let oldState = [...this.state.todos];
        oldState = res.data;
        this.setState({
          todos: oldState,
          toggleCreateOrder: true,
        });
      });
    }
  };

  orderByUpdated = () => {
    if (this.state.toggleUpdatedOrder) {
      axios
        .get(`http://localhost:8080/todo/sort/lastUpdated${-1}`)
        .then((res) => {
          let oldState = [...this.state.todos];
          oldState = res.data;
          this.setState({
            todos: oldState,
            toggleUpdatedOrder: false,
          });
        });
    } else if (!this.state.toggleUpdatedOrder) {
      axios
        .get(`http://localhost:8080/todo/sort/lastUpdated${1}`)
        .then((res) => {
          let oldState = [...this.state.todos];
          oldState = res.data;
          this.setState({
            todos: oldState,
            toggleUpdatedOrder: true,
          });
        });
    }
  };

  paginateFwrd = () => {
    axios.get(`http://localhost:8080/todo/limit/${this.limit}`).then((res) => {
      let oldState = [...this.state.todos];
      oldState = res.data;
      this.setState({
        todos: oldState,
      });
    });
    this.limit++;
  };

  paginateBckwrd = () => {
    if (this.limit !== 0) {
      this.limit--;
    }
    axios.get(`http://localhost:8080/todo/limit/${this.limit}`).then((res) => {
      let oldState = [...this.state.todos];
      oldState = res.data;
      this.setState({
        todos: oldState,
      });
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <ToDoContainer
              todos={this.state.todos}
              complete={this.complete}
              delete={this.delete}
              selectTodo={this.selectTodo}
              orderByCreated={this.orderByCreated}
              toggleCreateOrder={this.state.toggleCreateOrder}
              orderByUpdated={this.orderByUpdated}
              toggleUpdatedOrder={this.state.toggleUpdatedOrder}
              paginateFwrd={this.paginateFwrd}
              paginateBckwrd={this.paginateBckwrd}
            />

            <CreateToDo
              createToDo={this.createToDo}
              update={this.update}
              selectedTodo={this.state.selectedTodo}
              inputField={this.state.inputField}
              editBtnState={this.state.editBtnState}
              handleBtnState={this.handleBtnState}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
