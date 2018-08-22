import React from "react";
import EditEvent from "./EditEvent/EditEvent";
//material ui
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import {getEvent} from "../../../ducks/event";
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

class Event extends React.Component {
  state = {
    editSwitch: false
  };
  render() {
    const { editSwitch } = this.state,
    {event,history,match}= this.props;
    return (
      <div>
        {editSwitch ? (
          <EditEvent />
        ) : (
          <div className="Event">
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
            >
              <AddIcon onClick={()=>history.push(`/addevent/${match.params.date}`)}/>
            </Button>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
      ...state.event
    };
  }
  
  export default withRouter(connect(mapStateToProps,{getEvent})(Event))
  
