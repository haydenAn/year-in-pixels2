import React, { Component } from "react";
import { connect } from "react-redux";

class Edit extends Component {
  render() {
    return <div className="Edit" />;
  }
}

function mapStateToProps(state) {
  return {
    ...state.pixel
  };
}

export default connect(mapStateToProps)(Edit);
