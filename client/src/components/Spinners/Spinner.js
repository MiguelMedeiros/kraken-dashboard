import React, { Component } from "react";

import "spinkit/css/spinkit.css";

class Spinner extends Component {
  render() {
    return (
      <div className="sk-wave">
        <div className="sk-rect sk-rect1" />
        &nbsp;
        <div className="sk-rect sk-rect2" />
        &nbsp;
        <div className="sk-rect sk-rect3" />
        &nbsp;
        <div className="sk-rect sk-rect4" />
      </div>
    );
  }
}

export default Spinner;
