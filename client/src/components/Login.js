import React, { Component } from "react";
import { login } from "./UserFunctions";
import validator from "validator";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (!validator.isEmail(this.state.email)) {
      alert("Enter correct email!");
      return;
    }

    if (validator.isEmpty(this.state.password)) {
      alert("Enter password!");
      return;
    }

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(res => {
      if (!res.status) {
        this.props.history.push("/profile");
      } else {
        alert(res.message);
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form onValidate onSubmit={e => this.onSubmit(e)}>
              <h1 className="h2 mb-2 font-weight-bold">Login</h1>
              <div className="form-group">
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
              </div>
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
