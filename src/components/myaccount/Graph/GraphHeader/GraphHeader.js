import React from "react";
import "./GraphHeader.css";
import { connect } from "react-redux";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import moment from "moment";

class GraphHeader extends React.Component {
  render() {
    const {selection,handleSelection,month,changeMonth} = this.props,
      monthBoxes = () => {
        let arr = [];
        for (let i = 1; i < 13; i++) {
          arr.push(
            <div
              key={i}
              style={month === i ? { opacity: 1, transition: "0.2s" } : null}
              onClick={() => changeMonth(i)}
            >
              <span>{i}</span>
            </div>
          );
        }
        return arr;
      };
    return (
      <div className="GraphHeader">
        <FormControl className="GH_form">
          <InputLabel htmlFor="filter_GraphHeader">Filter</InputLabel>
          <Select
            native
            value={selection}
            onChange={handleSelection}
            inputProps={{
              name: "filter",
              id: "filter_GraphHeader"
            }}
          >
            <option value="all">All Pixels</option>
            <option value="month">By Months</option>
          </Select>
        </FormControl>
        {selection === "month" ? (
          <graphHeader-month>{monthBoxes()}</graphHeader-month>
        ) : 
          null
        }
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    pixels: state.graph.pixelsForGraph
  };
};
export default connect(mapStateToProps)(GraphHeader);
