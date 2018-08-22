import React, { Component } from "react";
import { connect } from "react-redux";
import {getPixel} from "../../../ducks/pixel"
import {withRouter} from "react-router-dom"
import Event from "../../Inbox/Event/Event"
class Pixel extends Component {
componentDidMount(){
    const {getPixel,match,history} = this.props,
    date=match.params.date;
    getPixel(date).then(res=>{
      res.value===false?
      history.push(`/edit/${date}`)
      :null
    })
}
  render() {
    const {pixel} = this.props;
    console.log(pixel)
    return <div className="Pixel">
    <Event />
    </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state.pixel
  };
}

export default withRouter(connect(mapStateToProps,{getPixel})(Pixel))
