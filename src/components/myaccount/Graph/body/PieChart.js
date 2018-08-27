import React from "react";
import { connect } from "react-redux";
import {Pie} from 'react-chartjs-2';
class PieChart extends React.Component {
  render() {
    const data = {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ]
      }]
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
    pixels: state.graph.pixelsForGraph
  };
};
export default connect(
  mapStateToProps
)(PieChart);
