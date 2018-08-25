import React, { Component } from "react";
import "./Home.css";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/user";
import {getPixels} from "../../../ducks/pixel"
import * as moment from "moment";
import { withRouter } from "react-router-dom";
import month from "./model/month";
class Home extends Component {
  componentDidMount() {
    const { getUser,getPixels } = this.props;
    getUser();
    getPixels();
  }
  render() {
    const { history,pixels } = this.props,
      year_now = moment().year(),
      now=moment().format('MM-DD-YYYY'),
    gridGenerator = month => {
      let tables = [];
      let howManyDays = moment(
        `${year_now}-${month < 10 ? `0` + month : month}`,
        "YYYY-MM"
      ).daysInMonth();
      for (let i = 1; i < howManyDays + 1; i++) {
        const formattedDate = `${month < 10 ? `0` + month : month}-${
          i < 10 ? `0` + i : i
        }-${year_now}`,
        index = pixels.findIndex(el =>el.pixel_date=== formattedDate),
        pixelStyle = {
          opacity: pixels[index] ? pixels[index].opacity : null,
          backgroundColor: pixels[index]
            ? pixels[index].colorvalue
            : "transparent",
          border:
            formattedDate === now
              ? "1.5px solid rgba(81, 203, 238, 1)"
              : null,
          boxShadow:
            formattedDate === now
              ? "0 0 7px rgba(81, 203, 238, 1)"
              : null
        };
        tables.push(
          <div
            key={i}
            className="grid-item-custom"
            style={pixelStyle}
            onClick={() => {
              history.push(`pixel/${formattedDate}`);
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
    const gridDisplayAll = month.map((el, i) => {
      return (
        <div className="grid-item" key={i}>
          <span className="grid_month">{el}</span> {gridGenerator(i + 1)}
        </div>
      );
    });
    return (
      <div className="Home">
        <div className="Home_header" />
        <div className="Home_containerBackground">
          <div className="grid-container">
            <div className="grid-item">
              <span className="grid_month">.. </span>
              {daysforIndicate()}
            </div>
           {gridDisplayAll}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.user,
    pixels:state.pixel.pixels
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    { getUser,getPixels }
  )(Home)
);
