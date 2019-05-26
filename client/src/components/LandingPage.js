import React, { Component } from "react";

class LandingPage extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center">Udemy Clone</h2>
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            This is a udemy clone, made with react, node, express and mongo
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
