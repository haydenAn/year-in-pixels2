import React, { Component } from "react";
import { connect } from "react-redux";
import { addPixel } from "../../../../ducks/pixel";
import PixelHeader from "../PixelHeader/PixelHeader";
import EditColor from "./EditColor/EditColor";
import ImgAdder from "./ImgAdder/ImgAdder"
import "./Edit.css";
///material_ui imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
class Edit extends Component {
  state = {
    opacity: 0.8,
    colorvalue: "#BDBDBD"
  };
  changeColor = (e, value) => {
    this.setState(() => ({ colorvalue: value }));
  };
  changeOpacity = (e, value) => {
    this.setState(() => ({ opacity: value }));
  };
  addPixel() {
    const { addPixel } = this.props,
      body = {
        date: "10-08-2018",
        colorvalue: "#ffffff",
        opacity: 0.8,
        positive: true,
        color_data: 8,
        text: "text for test pixel",
        img_url: "this is img_url "
      };
    addPixel(body);
  }
  render() {
    const { opacity, colorvalue } = this.state;
    console.log(opacity,colorvalue);
    return (
      <div className="Edit">
        <PixelHeader 
        opacity={opacity}
        color={colorvalue}
        />
        <EditColor
          opacity={opacity}
          color={colorvalue}
          changeColor={this.changeColor}
          changeOpacity={this.changeOpacity}
        />
        <ImgAdder />
         
        <edit-textarea>
          <h3><i className="fas fa-pen edit_penicon"></i>Through out the day...</h3>
          <TextField
            label="write down anything you want"
            multiline
            rows="7"
            placeholder="I had a really good taco today"
            fullWidth
          />
        </edit-textarea>
        <Button className="Edit_savebtn" variant="contained" color="primary" onClick={()=>this.addPixel()}>
        Save changes
      </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.pixel
  };
}

export default connect(
  mapStateToProps,
  { addPixel }
)(Edit);
