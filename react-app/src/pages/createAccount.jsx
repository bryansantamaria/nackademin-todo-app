import React, { Component } from "react";
import { TextField, Button, Card } from "@material-ui/core";
import { postAccount } from "../utils/api";

class CreateAccount extends Component {
  state = { users: [], firstName: "", lastName: "", email: "", password: "" };

  postAcc = async () => {
    const { firstName, lastName, email, password } = this.state;
    const res = await postAccount(
      firstName,
      lastName,
      email,
      password,
      this.props.token
    );

    this.setState({ users: res.data });
    console.log(this.state.users);
  };

  onSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);
    this.setState({ firstName: "", lastName: "", email: "", password: "" });
  };

  render() {
    return (
      <div id="login-container">
        {" "}
        <form onSubmit={this.onSubmit} className="accForm">
          <Card className="card">
            <h1>Create Account</h1>

            <TextField
              className="createInputs"
              type="input"
              autoFocus
              name="firstName"
              variant="outlined"
              size="small"
              required
              value={this.state.firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
              placeholder="First name..."
            />

            <TextField
              className="createInputs"
              type="input"
              name="lastName"
              variant="outlined"
              size="small"
              required
              value={this.state.lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
              placeholder="Last name..."
            />

            <TextField
              className="createInputs"
              type="email"
              name="email"
              variant="outlined"
              size="small"
              required
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="Email..."
            />

            <TextField
              className="createInputs"
              type="password"
              name="title"
              variant="outlined"
              size="small"
              required
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              placeholder="Password..."
            />
            <div>
              <div className="margin-top">
                <span>Already have an account?</span> <br />
                <a className="loginAnchor" href="/auth">
                  <span>Sign in</span>
                </a>{" "}
                <Button
                  className="btn-todoitem"
                  type="submit"
                  value="Create Account"
                  variant="contained"
                  id="submitCreate"
                  color="inherit"
                  onClick={this.postAcc}
                >
                  Submit Account
                </Button>{" "}
              </div>
            </div>
          </Card>
        </form>
      </div>
    );
  }
}

export default CreateAccount;
