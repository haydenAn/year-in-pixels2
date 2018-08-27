import React from "react";
import "./Graph.css";
import { connect } from "react-redux";
import {getPixelsGraph} from "../../../ducks/graph"
class Graph extends React.Component {
    componentDidMount(){
       this.props.getPixelsGraph()
    }
  render() {
      console.log(this.props.pixels)
      return(
    <div />
      )
  }
}
const mapStateToProps = state => {
  return {
     pixels:state.graph.pixelsForGraph
  };
};
export default connect(mapStateToProps ,{getPixelsGraph})(Graph);
