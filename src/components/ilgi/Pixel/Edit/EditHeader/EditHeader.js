import React from "react";
import AppBar from "@material-ui/core/AppBar";
import "./EditHeader.css";
import colors from "../../models/colors"
import  {withRouter} from "react-router-dom"
const EditHeader = (props) => {
  const 
  {color,opacity,addPixel} = props,
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
  return (
      <div className="EditHeader">
      <AppBar position="static" style={styles.appBar}>
      <span style={{display:'none'}}>blank</span>
    </AppBar>
     <editHeader-info >
      <span style={styles.button}>{color}</span>
      <span style={styles.button}>{mood}</span>
     </editHeader-info>
      <button style={styles.button} onClick={addPixel}>
        save
      </button>
    </div>
  );
};
export default withRouter(EditHeader)
