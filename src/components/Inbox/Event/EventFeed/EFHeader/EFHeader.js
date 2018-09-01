import React from "react";
import { connect } from "react-redux";
import { getAllEvents,getImportants } from "../../../../../ducks/event";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import moment from "moment";

class EFHeader extends React.Component {
  state = {
    selection: "all",
    month: moment().format("M")
  };
  componentDidUpdate(prevProps, prevState) {
    const { selection } = this.state;
    if (prevState.selection !== selection && selection === "all") {
      this.props.getAllEvents();
    }
    if(prevState.selection!==selection && selection ==="important"){
        this.props.getImportants();
    }
  }
  changeMonth = month => {
    this.setState({ month: month });
    this.props.getPixelsByDate(month);
  };
  handleSelection = e => {
    this.setState({ selection: e.target.value });
  };
  render() {
    const { selection, month } = this.state,
      monthBoxes = () => {
        let arr = [];
        for (let i = 1; i < 13; i++) {
          arr.push(
            <div
              key={i}
              style={month === i ? { opacity: 1, transition: "0.2s" } : null}
              onClick={() => this.changeMonth(i)}
            >
              <span>{i}</span>
            </div>
          );
        }
        return arr;
      };
    return (
      <div className="EFHeader">
        <FormControl className="GH_form">
          <InputLabel htmlFor="filter_EFHeader">Filter</InputLabel>
          <Select
            native
            value={selection}
            onChange={this.handleSelection}
            inputProps={{
              name: "filter",
              id: "filter_EFHeader"
            }}
          >
            <option value="all">All Events</option>
            <option value="month">By Months</option>
            <option value="important">Important</option>
          </Select>
        </FormControl>
        {selection === "month" ? (
          <graphHeader-month>{monthBoxes()}</graphHeader-month>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    events: state.event.events
  };
};
export default connect(
  mapStateToProps,
  { getAllEvents,getImportants }
)(EFHeader);
