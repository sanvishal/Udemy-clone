import React, { Component } from "react";
import { register } from "./UserFunctions";
import validator from "validator";
import { withRouter } from "react-router";

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isTeacher: false
  };

  onChange(e) {
    if (e.target.name !== "isTeacher") {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ [e.target.name]: e.target.checked });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (!validator.isEmail(this.state.email)) {
      alert("please fill in the correct email!");
      return;
    }

    if (
      validator.isEmpty(this.state.firstName) &&
      validator.isEmpty(this.state.lastName) &&
      validator.isEmpty(this.state.password)
    ) {
      alert("please fill in all details!");
      return;
    }

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      isTeacher: this.state.isTeacher
    };

    register(user).then(res => {
      if (res) {
        this.props.history.push("/login");
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form onValidate onSubmit={e => this.onSubmit(e)}>
              <h1 className="h2 mb-2 font-weight-bold">Register a Account</h1>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="Your First Name"
                  value={this.state.firstName}
                  onChange={e => this.onChange(e)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Your Last Name"
                  value={this.state.lastName}
                  onChange={e => this.onChange(e)}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Your Email"
                  value={this.state.email}
                  onChange={e => this.onChange(e)}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Your Password"
                  value={this.state.password}
                  onChange={e => this.onChange(e)}
                />
                <label htmlFor="isTeacher">Are you a Teacher?</label>
                <input
                  type="checkbox"
                  className="form-control"
                  name="isTeacher"
                  value={this.state.isTeacher}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
