import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Course extends Component {
  render() {
    const { courseName, courseDescription, author, rating, myid } = this.props;
    return (
      <div className="container">
        <br />
        <Link
          to={"/courses/" + myid}
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{courseName}</h5>
            <small>Author: {author}</small>
          </div>
          <p className="mb-1">About: {courseDescription}</p>
          <small>Rating: {rating}</small>
        </Link>
      </div>
    );
  }
}

export default withRouter(Course);
