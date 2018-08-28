import React from "react";
import { connect } from "react-redux";
import {Line} from 'react-chartjs-2';
import "./LineGraph.css";
import months from "./models/months"
class LineGraph extends React.Component {
  render() {
    const data = {
        labels: months,
        datasets: [
          {
            label: 'your mood data in this year',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#3f51b5',
            borderColor: '#3f51b5',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#3f51b5',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#3f51b5',
            pointHoverBorderColor: '#3f51b5',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      };
    return (
      <div className="LineGraph">
        <Line data={data} />
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
  mapStateToProps
)(LineGraph);
