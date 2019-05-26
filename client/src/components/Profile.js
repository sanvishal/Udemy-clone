import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Link, withRouter } from "react-router-dom";
import { getEnrolledCourses } from "./UserFunctions";

class Profile extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    isTeacher: false,
    courses: [],
    resolved: false
  };

  componentDidMount() {
    // get usertoken and decode it
    if (localStorage.usertoken) {
      const usertoken = localStorage.usertoken;
      const decode = jwt_decode(usertoken);

      getEnrolledCourses(decode._id).then(res => {
        this.setState({
          firstName: decode.firstName,
          lastName: decode.lastName,
          email: decode.email,
          isTeacher: decode.isTeacher,
          courses: res.enrolls,
          resolved: true
        });
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          {localStorage.usertoken ? (
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">Your Profile</h1>
              <h4 className="text-center">
                firstName: {this.state.firstName}
                <br />
                lastName: {this.state.lastName}
                <br />
                email: {this.state.email}
                <br />
                isTeacher: {this.state.isTeacher ? "yes" : "no"}
                <br />
                <br />
                <b>Courses Enrolled: </b>
                <br />
                {!this.state.resolved ? (
                  <div>Loading...</div>
                ) : (
                  this.state.courses.map((item, index) => {
                    return (
                      <div>
                        <Link to={"/courses/" + item.course}>
                          {item.courseName}
                        </Link>
                        <br />
                      </div>
                    );
                  })
                )}
                {this.state.isTeacher && (
                  <Link to="/addcourse">
                    <button
                      className="btn btn-lg btn-primary btn-block"
                      type="submit"
                    >
                      Add Course
                    </button>
                  </Link>
                )}
              </h4>
            </div>
          ) : (
            <h1 className="text-center">
              Don't cheat, Please Log-in to continue
            </h1>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
