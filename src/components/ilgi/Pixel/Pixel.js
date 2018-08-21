import React, { Component } from "react";
import { connect } from "react-redux";
import Edit from "./Edit/Edit";
import {getPixel} from "../../../ducks/pixel"
import {withRouter} from "react-router-dom"
class Pixel extends Component {
componentDidMount(){
    const {getPixel,match} = this.props
    // getPixel(match.params.date);
}
  render() {
    return <div className="Pixel">
    {/* 
    1) check if there's pixel matches the date and user id 
    ===> getPixel
    if getPixel returns false
    show edit page else just pixel
    */}
  <Edit />
    </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state.pixel
  };
}

export default withRouter(connect(mapStateToProps,{getPixel})(Pixel))
