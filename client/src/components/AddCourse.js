import React, { Component } from "react";
import { addCourse } from "./UserFunctions";
import validator from "validator";

class AddCourse extends Component {
  state = {
    courseName: "",
    courseDescription: "",
    rating: 0,
    author: "",
    jwt: ""
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (
      validator.isEmpty(this.state.courseDescription) &&
      validator.isEmpty(this.state.courseName) &&
      validator.isEmpty(this.state.author)
    ) {
      alert("please fill in all details!");
      return;
    }

    const course = {
      courseDescription: this.state.courseDescription,
      courseName: this.state.courseName,
      author: this.state.author,
      rating: 0,
      jwt: localStorage.usertoken ? localStorage.usertoken : ""
    };

    addCourse(course).then(res => {
      if (res.status === "success") {
        alert("Course added");
        this.props.history.push("/profile");
      } else {
        alert("please login as a teacher to continue!");
        this.props.history.push("/profile");
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form onValidate onSubmit={e => this.onSubmit(e)}>
              <h1 className="h2 mb-2 font-weight-bold">Add Course</h1>
              <div className="form-group">
                <label htmlFor="courseName">Course Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="courseName"
                  placeholder="Course name"
                  value={this.state.courseName}
                  onChange={e => this.onChange(e)}
                />
                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="courseDescription"
                  placeholder="course description"
                  value={this.state.courseDescription}
                  onChange={e => this.onChange(e)}
                />
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  placeholder="Author Full Name"
                  value={this.state.author}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <br />
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Add Course
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCourse;
