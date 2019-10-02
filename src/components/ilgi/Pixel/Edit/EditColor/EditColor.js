import React from "react";
import Slider from "@material-ui/lab/Slider";
import colorvalues from "../../models/colorvalues";
import "./EditColor.css";
const EditColor = props => {
  const { opacity, changeOpacity, changeColor, color } = props,
    styles = {
      slider: {
        width: "80%",
        margin: "0 auto"
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
                  opacity: 1,
                  transition: "0.2s"
                }
              : { backgroundColor: el }
          }
          onClick={e => changeColor(e, el)}
        />
      );
    });

  return (
    <div className="EditColor">
      <section>
        <h1>How's your day?</h1>
        <p>pick a color that's more close to your day!</p>
      </section>
      <editColor-colors>{colorBoxes}</editColor-colors>
      <section className="EditColor_btm">
        <h1>How strong was it?</h1>
        <p>move the slider to change it's boldness</p>
        <style jsx="true">
          {`
            .EditColor_slide > div:first-child {
              background: none;
            }
            .EditColor_slide div {
              background-color: ${color};
              height: 24px;
              border-radius: 12px;
            }
            .EditColor_slide button {
              background-color: #fff;
              height: 25px;
              top: 12px;
              border-radius: 10px;
              width: 25px;
              border: 2px solid ${color};
            }
          `}
        </style>
        <Slider
          style={styles.slider}
          value={Number(opacity)}
          min={0.3}
          max={1}
          className="EditColor_slide"
          onChange={changeOpacity}
        />
      </section>
    </div>
  );
};

export default EditColor;
