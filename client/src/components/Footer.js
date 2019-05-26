import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer
        className="footer font-small pt-4"
        style={{
          bottom: 0,
          position: "absolute",
          width: "100%"
        }}
      >
        <div className="text-center">
          <a href="https://tkvishal.now.sh">TK Vishal</a> 2019
        </div>
      </footer>
    );
  }
}

export default Footer;
