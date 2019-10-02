import React, { Component } from "react";
import "./App.css";
import Welcome from "./components/public/Welcome/Welcome";
import routes from "./routes/routes";
import { withRouter } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.history.location.pathname === "/" ? (
          <Welcome />
        ) : (
          // <div className="main-outer">
          <div className="main">{routes}</div>
          // </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
//
