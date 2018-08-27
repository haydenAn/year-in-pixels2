import React from "react";
import "./FeedHeader.css";
import { connect } from "react-redux";
import {
  getFullPixels,
  getPixelsByColor,
  getPixelsByDate
} from "../../../../ducks/pixel";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import colorvalues from "../../Pixel/models/colorvalues";
import moment from "moment";
class FeedHeader extends React.Component {
  state = {
    selection: "all",
    color: "#DBDBDB",
    month: moment().format("M")
  };
  componentDidUpdate(prevProps,prevState){
      const {selection} = this.state;
    if(prevState.selection!==selection && selection==="all"){
        this.props.getFullPixels()
    }
  }
  handleSelection = e => {
    this.setState({ selection: e.target.value });
  };
  changeColor = colorvalue => {
    this.setState({ color: colorvalue });
    this.props.getPixelsByColor(colorvalue.slice(1));
  };
  changeMonth = month => {
    this.setState({ month: month });
    this.props.getPixelsByDate(month);
  };
  render() {
    const { selection, color, month } = this.state,
      colorBoxes = colorvalues.map((el, i) => {
        return (
          <div
            key={i}
            style={
              color === el
                ? {backgroundColor: el,opacity: 1,transition: "0.2s"}
                : { backgroundColor: el }
            }
            onClick={() => this.changeColor(el)}
          />
        );
      }),
      monthBoxes = () => {
        let arr = [];
        for (let i = 1; i < 13; i++) {
          arr.push(
            <div
              key={i}
              style={
                month === i
                  ? {  opacity: 1,transition: "0.2s"}
                  : null
              }
              onClick={() => this.changeMonth(i)}
            >
              {moment().month(i-1).format('MMM')}
              <span>{i}</span>
            </div>
          );
        }
        return arr;
      };
    return (
      <div className="FeedHeader">
        <FormControl className="FH_form">
          <InputLabel htmlFor="filter-native-simple">Filter</InputLabel>
          <Select
            native
            value={selection}
            onChange={this.handleSelection}
            inputProps={{
              name: "filter",
              id: "filter-native-simple"
            }}
          >
            <option value="all">
              All Pixels
            </option>
            <option value="color">By Color</option>
            <option value="month">By Months</option>
          </Select>
        </FormControl>
        {selection === "color" ? (
          <feedheader-color>{colorBoxes}</feedheader-color>
        ) : selection === "month" ? (
          <feedheader-month>{monthBoxes()}</feedheader-month>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    pixels: state.pixel.pixelsForFeed
  };
};
export default connect(
  mapStateToProps,
  { getFullPixels, getPixelsByColor, getPixelsByDate }
)(FeedHeader);
