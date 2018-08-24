import React from "react";
import "./Feed.scss";
import { connect } from "react-redux";
class Feed extends React.Component {
  render() {
    return <div className="Feed" />;
  }
}
const mapStateToProps = state => {
  return {
    ...state.pixel
  };
};
export default connect(mapStateToProps)(Feed);
