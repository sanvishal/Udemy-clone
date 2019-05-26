import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  // logout function
  logOut(e) {
    e.preventDefault();
    // clear local storage
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
  }

  render() {
    // links when not authenticated
    const regLoginLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/courses" className="nav-link">
            Courses
          </Link>
        </li>
      </ul>
    );

    // links when authenticated
    const loggedinLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            My Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/courses" className="nav-link">
            Courses
          </Link>
        </li>
        <li className="nav-item">
          <Link href="" onClick={e => this.logOut(e)} className="nav-link">
            LogOut
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-sm"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbar-sm"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? loggedinLinks : regLoginLinks}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
