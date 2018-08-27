import React from "react";
import "./Graph.css";
import { connect } from "react-redux";
import { getPixelsGraph } from "../../../ducks/graph";
import GraphHeader from "./GraphHeader/GraphHeader";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PieChart from "./body/PieChart";
import LineGraph from "./body/LineGraph";
class Graph extends React.Component {
  state = {
    selection: "all",
    naviValue: 0
  };
  componentDidMount() {
    this.props.getPixelsGraph();
  }
  handleSelection = e => {
    this.setState({ selection: e.target.value });
  };
  navigate = (e, value) => {
    this.setState({ naviValue: value });
  };
  render() {
    const { selection, naviValue } = this.state;
    console.log(this.props.pixels, naviValue);
    return (
      <div className="Graph">
        <GraphHeader
          selection={selection}
          handleSelection={this.handleSelection}
        />
        <graph-body>
          {naviValue===0?
        <LineGraph/>:
        <PieChart />  
        }
        </graph-body>
        <BottomNavigation
          value={naviValue}
          onChange={this.navigate}
          showLabels
        >
          <BottomNavigationAction label="line graph" />
          <BottomNavigationAction label="color chart" />
        </BottomNavigation>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    pixels: state.graph.pixelsForGraph
  };
};
export default connect(
  mapStateToProps,
  { getPixelsGraph }
)(Graph);
