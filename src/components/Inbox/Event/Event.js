import React from "react";
import EditEvent from "./EditEvent/EditEvent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getEvent, deleteEvent } from "../../../ducks/event";
import moment from "moment";
import "./Event.css";
//material ui
import AddIcon from "@material-ui/icons/Add";
import { CircularProgress, Button, Menu, MenuItem } from "@material-ui/core";
class Event extends React.Component {
  state = {
    editSwitch: false,
    anchorEl: null
  };
  componentDidMount() {
    const { getEvent, match } = this.props;
    getEvent(match.params.date);
  }
  componentDidUpdate(preP, preS) {
    const { anchorEl } = this.state,
      { getEvent, match } = this.props;
    anchorEl === null && preS.anchorEl !== anchorEl
      ? getEvent(match.params.date)
      : null;
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleEditSwitch = () => {
    this.setState({ editSwitch: !this.state.editSwitch });
  };
  edit = () => {
    this.handleClose();
    this.handleEditSwitch();
  };
  delete = () => {
    this.props.deleteEvent(this.props.event.id);
    this.handleClose();
  };
  render() {
    const { editSwitch, anchorEl } = this.state,
      { event, isLoading, history, match } = this.props;
    console.log(event);
    return (
      <div className="Event_Card">
        {editSwitch ? (
          <EditEvent handleEditSwitch={this.handleEditSwitch} />
        ) : (
          <div>
            {event ? (
              <event-outer>
                {/* {isLoading ? ( */}
                {/* <CircularProgress size={50} /> */}
                {/* ) : ( */}
                <div className="Event">
                  <Button
                    aria-owns={anchorEl ? "simple-menu" : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <i className="fas fa-cog" />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.edit}>Edit</MenuItem>
                    <MenuItem style={{ color: "red" }} onClick={this.delete}>
                      Delete
                    </MenuItem>
                  </Menu>
                  <div className="Event_content">
                    <h1>{event.title}</h1>
                    <h3>{event.location}</h3>
                    <h3>{moment(event.event_date).format("MM-DD-YYYY")}</h3>
                    <article>{event.text}</article>
                  </div>
                </div>
                {/* )} */}
              </event-outer>
            ) : (
              <Button variant="fab" color="primary" aria-label="Add">
                <AddIcon
                  onClick={() => history.push(`/addevent/${match.params.date}`)}
                />
              </Button>
            )}
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

export default withRouter(
  connect(
    mapStateToProps,
    { getEvent, deleteEvent }
  )(Event)
);
