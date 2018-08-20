import React from "react";
import Slider from "@material-ui/lab/Slider";
import colorvalues from "../../models/colorvalues";
import "./EditColor.css";
const EditColor = props => {
  const { opacity, changeOpacity, changeColor,color } = props,
    styles = {
      slider: {
        width: "80%",
        margin: "10px auto"
      }
    },
    colorBoxes = colorvalues.map((el, i) => {
      return (
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
          onClick={(e)=>changeColor(e,el)}
        />
      );
    });

  return (
    <div className="EditColor">
      <editColor-colors>{colorBoxes}</editColor-colors>
       <h3><i className="far fa-smile edit_smileicon"></i>How intense is your feeling?</h3>
      <Slider
        style={styles.slider}
        value={opacity}
        min={0.3}
        max={1}
        onChange={changeOpacity}
      />
    </div>
  );
};

export default EditColor;
