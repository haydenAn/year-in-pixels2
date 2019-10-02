import React from "react";
import "./Reminder.css";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
const Reminder = props => {
  const state = {
    close: false
  };
  return (
    <div>
      {state.close ? (
        <div className="Reminder_bg">
          <div className="Reminder">
            <h1>Haven't told us about your day!</h1>
            <Button
              onClick={() => {
                props.history.push(`pixel/${props.now}`);
              }}
            >
              go write ilgi
            </Button>
            <Button
              onClick={() => {
                state.close = true;
                console.log(state.close);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default withRouter(Reminder);
