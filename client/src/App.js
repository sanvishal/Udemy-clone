import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import AddCourse from "./components/AddCourse";
import CourseList from "./components/CourseList";
import CoursePage from "./components/CoursePage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={LandingPage} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/addcourse" component={AddCourse} />
            <Route exact path="/courses" component={CourseList} />
            <Route exact path="/courses/:id" component={CoursePage} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
