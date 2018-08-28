import React from "react";
import "./Graph.css";
import { connect } from "react-redux";
import {
  getPixelsGraph,
  getColorRatioByMonth,
  getColorRatio
} from "../../../ducks/graph";
import GraphHeader from "./GraphHeader/GraphHeader";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import PieChart from "./body/PieChart";
import LineGraph from "./body/LineGraph";
import moment from "moment";
import colorvalues from "./body/models/colorvalues";

class Graph extends React.Component {
  state = {
    selection: "all",
    naviValue: 0,
    month: moment().format("M")
  };
  componentDidMount() {
    const { getColorRatio, getPixelsGraph } = this.props;
    getPixelsGraph();
    getColorRatio();
  }
  componentDidUpdate(prevProps, prevState) {
    const { selection, naviValue } = this.state,
      { getPixelsGraph,getColorRatio } = this.props;
    if (prevState.selection !== selection && selection === "all") {
      if (naviValue === 0) {
        getPixelsGraph();
      }
      else if(naviValue===1){
        getColorRatio();
      }
    }
  }
  handleSelection = e => {
    this.setState({ selection: e.target.value });
  };
  navigate = (e, value) => {
    this.setState({ naviValue: value });
  };
  changeMonth = month => {
    this.setState({ month: month });
    if (this.state.naviValue === 1) {
      this.props.getColorRatioByMonth(month)
    } else {
    }
  };
  render() {
    const { selection, naviValue, month} = this.state;
    return (
      <div className="Graph">
        <GraphHeader
          selection={selection}
          handleSelection={this.handleSelection}
          month={month}
          changeMonth={this.changeMonth}
        />
        <graph-body>
          {naviValue === 0 ? (
            <LineGraph />
          ) : (
            <PieChart
            />
          )}
        </graph-body>
        <BottomNavigation value={naviValue} onChange={this.navigate} showLabels>
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
  { getPixelsGraph, getColorRatioByMonth, getColorRatio }
)(Graph);
