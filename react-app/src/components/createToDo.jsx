import React, { Component } from "react";

class CreateToDo extends Component {
  state = { title: "" };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createToDo(this.state.title);
    this.setState({ title: "" });
  };

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
