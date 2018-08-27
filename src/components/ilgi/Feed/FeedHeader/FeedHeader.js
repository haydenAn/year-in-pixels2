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
class FeedHeader extends React.Component {
  state = {
    selection: "all",
    color:"#DBDBDB"
  };
  handleSelection = e => {
    this.setState({ selection: e.target.value });
  };
  changeColor=(colorvalue)=>{
      this.setState({color:colorvalue});
      this.props.getPixelsByColor(colorvalue);
  }
  render() {
      const {selection,color} = this.state,
      {getFullPixels,getPixelsByDate} = this.props,
      colorBoxes= colorvalues.map((el,i)=>{
          return(
            <div
            key={i}
            style={
              color === el
                ? {
                    backgroundColor: el,
                    opacity:1,
                    transition:'0.2s'
                  }
                : { backgroundColor: el }
            }
            onClick={()=>this.changeColor(el)}
          />
          )
      })
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
            <option value="all" onClick={()=>getFullPixels()}>All Pixels</option>
            <option value="color">By Color</option>
            <option value="month">By Months</option>
          </Select>
        </FormControl>
        {
            selection==="color"?
            <feedheader-color>
              {colorBoxes}
            </feedheader-color>
            :selection==="month"?
            <feedheader-month>

            </feedheader-month>
            :null

        }
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
