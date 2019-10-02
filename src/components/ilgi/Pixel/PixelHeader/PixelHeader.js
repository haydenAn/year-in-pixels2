import React from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import "./PixelHeader.css";
import colors from "../models/colors";

import { withRouter } from "react-router-dom";
const PixelHeader = props => {
  const { color, opacity } = props,
    styles = {
      button: {
        color: opacity < 0.7 ? "rgba(0, 0, 0, 0.87)" : "white"
      },
      appBar: {
        backgroundColor: color,
        opacity: opacity,
        height: "60px",
        width: "100vw"
      }
    },
    moodObj = colors.filter((el, i) => Object.values(el)[0] === color),
    mood = Object.keys(moodObj[0])[0];
  return (
    <AppBar className="PixelHeader" position="fixed" style={styles.appBar}>
      <Toolbar className="AppBar_tool">
        <toolbar-left>
          <pixelHeader-info>
            <span style={styles.button}>{color}</span>
            <span style={styles.button}>{mood}</span>
          </pixelHeader-info>
        </toolbar-left>
        <toolbar-right>
          <Button
            style={styles.button}
            variant="outlined"
            onClick={() => props.history.push("/home")}
          >
            cancel
          </Button>
        </toolbar-right>
      </Toolbar>
    </AppBar>
  );
};
export default withRouter(PixelHeader);
