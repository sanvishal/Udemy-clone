import React, { Component } from "react";
import { getCourses } from "./UserFunctions";
import Course from "./Course";

class CourseList extends Component {
  state = {
    resolved: false,
    promise: []
  };

  componentDidMount() {
    getCourses().then(res => {
      this.setState({ resolved: true, promise: res });
    });
  }

  render() {
    if (!this.state.resolved) {
      return <h3 className="text-center">Loading...</h3>;
    } else {
      return (
        <div className="list-group">
          {this.state.promise.map((item, index) => {
            return (
              <Course
                myid={item._id}
                id={index}
                courseName={item.courseName}
                courseDescription={item.courseDescription}
                author={item.author}
                rating={item.rating}
              />
            );
          })}
        </div>
      );
    }
  }
}

export default CourseList;
