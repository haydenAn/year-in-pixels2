import React, { Component } from "react";
import { connect } from "react-redux";
import {addPixel} from "../../../../ducks/pixel"
import PixelHeader from "../PixelHeader/PixelHeader";
import EditColor from "./EditColor/EditColor";

///material_ui imports
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
class Edit extends Component {
  state={
    opacity:0.5,
    colorvalue:"#BDBDBD"
  }
  changeOpacity=(e,value)=>{
    this.setState(()=>({opacity:value}))
  }
  addPixel(){
    const 
    {addPixel}= this.props
    ,body={
      date:'10-08-2018',
      colorvalue:'#ffffff',
      opacity:0.8,
      positive:true,
      color_data:8,
      text:'text for test pixel',
      img_url:'this is img_url '
    }
    addPixel(body);
  }
  render() {
    const {opacity,colorvalue} = this.state;
    console.log(opacity)
    return <div className="Edit">
       <PixelHeader />
        <EditColor opacity={opacity} changeOpacity={this.changeOpacity}/>
       <edit-imgAdder>
         <div className="Edit_imgContainer">
         <img alt="default img" />
         </div>
       </edit-imgAdder>
        <edit-textarea>
          <h2>through out the day...</h2>
          <TextField
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
          fullWidth
        />
        </edit-textarea>
       <Button onClick={()=>this.addPixel()}>add pixel</Button>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state.pixel
  };
}

export default connect(mapStateToProps, {addPixel})(Edit);
