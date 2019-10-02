import React from "react";
import "./EventFeed.css";
import { connect } from "react-redux";
import {
  getAllEvents,
  deleteEvent,
  pushEventToEdit
} from "../../../../ducks/event";
import { withRouter } from "react-router-dom";
import Header from "../../../public/Header/Header";
import EFHeader from "./EFHeader/EFHeader";
import EditEvent from "../EditEvent/EditEvent";
///@material
import AddIcon from "@material-ui/icons/Add";
import { Button, Card, IconButton } from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
class EventFeed extends React.Component {
  state = {
    edit: false,
    id: null
  };
  componentDidMount() {
    this.props.getAllEvents();
  }
  componentDidUpdate(prevProps, prepState) {
    const { edit } = this.state;
    if (prepState.edit !== edit && !edit) {
      this.props.getAllEvents();
    }
  }
  handleEditSwitch = () => {
    this.setState({ edit: !this.state.edit });
  };
  edit = body => {
    const { pushEventToEdit } = this.props;
    pushEventToEdit(body);
    this.handleEditSwitch();
    this.setState({ id: body.id });
  };
  delete = id => {
    this.props.deleteEvent(id);
    this.props.getAllEvents();
  };
  render() {
    const { events, history } = this.props,
      { edit, id } = this.state,
      displayAllEvents = events[0] ? (
        events.map((el, i) => {
          return (
            <Card className="EF_card" key={i}>
              {edit && id === el.id ? (
                <EditEvent handleEditSwitch={this.handleEditSwitch} />
              ) : (
                <div className="EF_card-content">
                  <ef-icons>
                    <span>
                      {el.important ? <Favorite /> : <FavoriteBorder />}
                    </span>
                    <span>
                      <IconButton onClick={() => this.edit(el)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteOutlineIcon onClick={() => this.delete(el.id)} />
                      </IconButton>
                    </span>
                  </ef-icons>
                  <h1>{el.title}</h1>
                  <h3>{el.event_oidate}</h3>
                  <h3>{el.location}</h3>
                  <p>{el.text}</p>
                </div>
              )}
            </Card>
          );
        })
      ) : (
        <feed-noevent>
          events not found{" "}
          <span role="img" aria-label="confused-emoji-feed">
            😕
          </span>
          <p>
            would you like to create one?{" "}
            <Button
              variant="fab"
              aria-label="Add"
              style={{ width: "35px", height: "25px", margin: "0 0 10px 10px" }}
            >
              <AddIcon onClick={() => history.push(`/addevent/custom`)} />
            </Button>
          </p>
        </feed-noevent>
      );
    return (
      <div>
        <Header />
        <div className="EventFeed">
          <EFHeader />
          <events-display>{displayAllEvents}</events-display>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            style={{ position: "fixed", bottom: "5vw", right: "5vw" }}
          >
            <AddIcon onClick={() => history.push(`/addevent/custom`)} />
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    events: state.event.events
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { getAllEvents, deleteEvent, pushEventToEdit }
  )(EventFeed)
);
