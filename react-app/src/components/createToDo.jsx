import React, { Component } from "react";

class CreateToDo extends Component {
  state = { title: "" };

  //Set the state to whatever the user writes in createToDo from app.js
  onSubmit = (e) => {
    e.preventDefault();
    this.props.createToDo(this.state.title);
    this.setState({ title: "" });
  };

  //Target the name attribute title and set the state value
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.onChange}
          placeholder="Add to do..."
        />
        <input type="submit" value="Submit" className="submitBtn" />
      </form>
    );
  }
}

export default CreateToDo;
