import React from "react";
import AppBar from "@material-ui/core/AppBar";
import "./PixelHeader.css";
import colors from "../models/colors"
const PixelHeader = (props) => {
  const 
  {color,opacity} = props,
  styles = {
      button:{
         color: opacity<0.7 ?'rgba(0, 0, 0, 0.87)':'white' 
      },
    appBar:{
        backgroundColor:color,
        opacity:opacity,
        height:'60px',
        width:'100vw'
    }
  },
  moodObj = colors.filter((el,i)=>Object.values(el)[0]===color),
  mood = Object.keys(moodObj[0])[0]
  console.log()
  return (
      <div className="PixelHeader">
      <AppBar position="static" style={styles.appBar}>
      <span style={{display:'none'}}>blank</span>
    </AppBar>
     <pixelHeader-info >
      <span style={styles.button}>{color}</span>
      <span style={styles.button}>{mood}</span>
     </pixelHeader-info>
      <button style={styles.button}>
        save
      </button>
    </div>
  );
};
export default PixelHeader;
