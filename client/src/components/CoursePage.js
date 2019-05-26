import React, { Component } from "react";
import { getCoursePage, enrollCourse } from "./UserFunctions";
import { withRouter } from "react-router-dom";

class CoursePage extends Component {
  state = {
    cname: "",
    cauth: "",
    cdesc: "",
    rate: "",
    resolve: false
  };

  componentDidMount() {
    getCoursePage(this.props.match.params.id).then(res => {
      this.setState({
        resolve: true,
        cname: res.courseName,
        cauth: res.author,
        cdesc: res.courseDescription,
        rate: res.rating
      });
    });
  }

  enroll(id, token, name) {
    enrollCourse(id, token, name).then(res => {
      console.log(res);
      if (res.status === "success") {
        this.props.history.push("/profile");
      } else {
        alert("you have already enrolled!");
        this.props.history.push("/courses");
      }
    });
  }

  render() {
    if (!this.state.resolve) return <h2 className="text-center">Loading...</h2>;
    return (
      <React.Fragment>
        <h1 className="text-center">{this.state.cname}</h1>
        <h4 className="text-center">{this.state.cdesc}</h4>
        <h5 className="text-center">by {this.state.cauth}</h5>
        <h5 className="text-center">Rating: {this.state.rate}</h5>

        <h5 className="text-center">
          {localStorage.usertoken ? (
            <button
              onClick={() => {
                this.enroll(
                  this.props.match.params.id,
                  localStorage.usertoken,
                  this.state.cname
                );
              }}
              className="btn btn-md btn-primary"
            >
              Enroll
            </button>
          ) : (
            <div>Login to Enroll</div>
          )}
        </h5>
      </React.Fragment>
    );
  }
}

export default withRouter(CoursePage);
