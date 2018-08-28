import React from "react";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";
import moods from "./models/moods";
import colorvalues from "./models/colorvalues";
class PieChart extends React.Component {
  componentDidMount() {
  }

  render() {
    const { colorRatio } = this.props,
      data = {
        labels: moods,
        datasets: [
          {
            data: colorRatio,
            backgroundColor: colorvalues
          }
        ]
      };
    return (
      <div className="Pie">
        <h2>Pie Example</h2>
        <Pie data={data} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    colorRatio: state.graph.colorRatio
  };
};
export default connect(
  mapStateToProps,
)(PieChart);
