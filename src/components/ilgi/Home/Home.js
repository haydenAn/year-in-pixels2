import React, { Component } from "react";
import "./Home.css"
import {connect} from "react-redux"
import {getUser} from "../../../ducks/user"
import * as moment from "moment";
import {withRouter} from "react-router-dom"
class Home extends Component {
  componentDidMount() {
    const {getUser} =this.props;
    getUser();
  }
  render() {
    const 
    {history} = this.props,
    year_now = moment().year();

    const 
    test = month => {
      let tables = [];
      let howManyDays = moment(
        `${year_now}-${month<10?`0`+month:month}`,
        "YYYY-MM"
      ).daysInMonth();
      for (let i = 1; i < howManyDays + 1; i++) {
      const formattedDate =`${month<10?`0`+month:month}-${i<10?`0`+i:i}-${year_now}` 
        tables.push(
          <div
            key={i}
            className="grid-item-custom"
            onClick={() => {
              history.push(`pixel/${formattedDate}`)
            }}
          />
        );
      }
      return tables;
    };

    const daysforIndicate = () => {
      let tables = [];
      for (let i = 1; i < 32; i++) {
        tables.push(
          <div key={i} className="daysIndicator">
            {i}
          </div>
        );
      }
      return tables;
    };

    return (
      <div className="Home">
        <div className="Home_header">
        </div>
        <div className="Home_containerBackground">
          <div className="grid-container">
            <div className="grid-item">
              <span className="grid_month">.. </span>
              {daysforIndicate()}
            </div>
            <div className="grid-item">
              <span className="grid_month">JAN</span> {test(1)}
            </div>
            <div className="grid-item">
              <span className="grid_month">FEB</span> {test(2)}
            </div>
            <div className="grid-item">
              <span className="grid_month">MAR</span> {test(3)}
            </div>
            <div className="grid-item">
              <span className="grid_month">APR</span> {test(4)}
            </div>
            <div className="grid-item">
              <span className="grid_month">MAY</span> {test(5)}
            </div>
            <div className="grid-item">
              <span className="grid_month">JUN</span> {test(6)}
            </div>
            <div className="grid-item">
              <span className="grid_month">JUL</span> {test(7)}
            </div>
            <div className="grid-item">
              <span className="grid_month">AUG</span> {test(8)}
            </div>
            <div className="grid-item">
              <span className="grid_month">SEP</span> {test(9)}
            </div>
            <div className="grid-item">
              <span className="grid_month">OCT</span> {test(10)}
            </div>
            <div className="grid-item">
              <span className="grid_month">NOV</span> {test(11)}
            </div>
            <div className="grid-item">
              <span className="grid_month">DEC</span> {test(12)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
   ...state.user
  };
}
export default withRouter(connect(mapStateToProps,{getUser})(Home))
