import React, { Component } from "react";
import "./Grid.css";
import * as moment from "moment";
import month from "./model/month";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Grid extends Component {
  state = {};
  render() {
    const { history, pixels, year, now } = this.props;

    //#region GRID MANIPULATION
    const gridGenerator = month => {
      let tables = [];
      let daysInMonthCount = moment(
        `${year}-${month < 10 ? `0` + month : month}`,
        "YYYY-MM"
      ).daysInMonth();

      for (let i = 1; i < 32; i++) {
        const formattedDate = `${month < 10 ? `0` + month : month}-${
            i < 10 ? `0` + i : i
          }-${year}`,
          pixelStyle = styleGrid(formattedDate);
        if (i > daysInMonthCount) {
          tables.push(<div key={i} className="grid-item-disabled" />);
        } else {
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
      }
      return tables;
    };
    const styleGrid = formattedDate => {
      const index = pixels.findIndex(el => el.pixel_date === formattedDate),
        pixelStyle = {
          opacity: pixels[index] ? pixels[index].opacity : null,
          backgroundColor: pixels[index]
            ? pixels[index].colorvalue
            : "transparent",
          border:
            formattedDate === now ? "1.5px solid rgba(81, 203, 238, 1)" : null,
          boxShadow:
            formattedDate === now ? "0 0 7px rgba(81, 203, 238, 1)" : null
        };
      return pixelStyle;
    };
    //#endregion
    const daysforIndicate = () => {
      let tables = [];
      for (let i = 1; i < 32; i++) {
        tables.push(
          <div key={i} className="daysIndicator">
            <span className="daysIndicator_day">{i}</span>
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
      <div className="grid-container">
        <div className="grid-item">
          <span className="grid_month">.. </span>
          {daysforIndicate()}
        </div>
        {gridDisplayAll}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.user,
    pixels: state.pixel.pixels,
    year: state.pixel.year
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Grid)
);
