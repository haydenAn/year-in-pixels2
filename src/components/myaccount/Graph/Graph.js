import React from "react";
import "./Graph.css";
import { connect } from "react-redux";
import {
  getPixelsGraph,
  getColorRatioByMonth,
  getColorRatio
} from "../../../ducks/graph";
import { Card } from "@material-ui/core";
import GraphHeader from "./GraphHeader/GraphHeader";
import PieChart from "./body/PieChart";
import moment from "moment";

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
      { getPixelsGraph, getColorRatio } = this.props;
    if (prevState.selection !== selection && selection === "all") {
      if (naviValue === 0) {
        getPixelsGraph();
      } else if (naviValue === 1) {
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
      this.props.getColorRatioByMonth(month);
    } else {
    }
  };
  render() {
    const { selection, naviValue, month } = this.state;
    return (
      <Card className="Graph">
        <GraphHeader
          selection={selection}
          handleSelection={this.handleSelection}
          month={month}
          changeMonth={this.changeMonth}
        />
        <graph-body>
          <PieChart />
        </graph-body>
      </Card>
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
