import React from "react";
import Slider from "@material-ui/lab/Slider";
import colorvalues from "../../models/colorvalues";
const EditColor = props => {
  const { opacity, changeOpacity } = props,
    colorBoxes = colorvalues.map((el, i) => {
      return (
        <div
          key={i}
          style={{
            backgroundColor: el,
            width: "20vw",
            height: "20vw",
            display: "inline-block",
            margin: "2vw"
          }}
        />
      );
    });

  return (
    <div className="EditColor">
      <editColor-colors>{colorBoxes}</editColor-colors>
      <Slider value={opacity} min={0} max={1} onChange={changeOpacity} />
    </div>
  );
};

export default EditColor;
