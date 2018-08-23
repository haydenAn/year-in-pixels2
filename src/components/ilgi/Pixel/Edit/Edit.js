import React, { Component } from "react";
import { connect } from "react-redux";
import { addPixel } from "../../../../ducks/pixel";
import  EditHeader from "./EditHeader/EditHeader";
import EditColor from "./EditColor/EditColor";
import ImgAdder from "./ImgAdder/ImgAdder"
import defaultImg from "../../../../sass/images/default.jpg"
import {withRouter} from "react-router-dom"
import "./Edit.css";
import colorBool from "../models/positive"

///material_ui imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
class Edit extends Component {
  state = {
    opacity: 0.8,
    colorvalue: "#BDBDBD",
    img_url: defaultImg,
    text:''
  };
  changeColor = (e, value) => {
    this.setState(() => ({ colorvalue: value }));
  };
  changeOpacity = (e, value) => {
    this.setState(() => ({ opacity: value }));
  };
  changeImg = (url) =>{
    this.setState(()=>({img_url:url}))
  }
  addPixel=()=>{
    const { addPixel,match } = this.props,
    {colorvalue,opacity,text,img_url} = this.state,
    boolObj=colorBool.filter(el=>Object.keys(el)[0]===colorvalue),
    positive= Object.values(boolObj[0])[0],
    color_data=(opacity*10)*(positive?1:-1),
      body = {
        date: match.params.date,
        colorvalue,
        opacity,
        positive,
        color_data,
        text,
        img_url
      };
      console.log(body);
    addPixel(body);
  }
  render() {
    const { opacity, colorvalue ,img_url} = this.state;
    return (
      <div className="Edit">
        <EditHeader
        opacity={opacity}
        color={colorvalue}
        addPixel={this.addPixel}
        />
        <EditColor
          opacity={opacity}
          color={colorvalue}
          changeColor={this.changeColor}
          changeOpacity={this.changeOpacity}
        />
        <ImgAdder
        imgUrl={img_url}
        changeImg={this.changeImg}
        />
         
        <edit-textarea>
          <h3><i className="fas fa-pen edit_penicon"></i>Through out the day...</h3>
          <TextField
            label="write down anything you want"
            multiline
            rows="7"
            placeholder="I had a really good taco today"
            fullWidth
            onChange={e=>this.setState({text:e.target.value})}  
                />
        </edit-textarea>
        <Button className="Edit_savebtn" variant="contained" color="primary" onClick={this.addPixel}>
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

export default withRouter(connect(
  mapStateToProps,
  { addPixel }
)(Edit))
