import React from "react";
import "./EventFeed.css";
import { connect } from "react-redux";
import { getAllEvents } from "../../../../ducks/event";
import { withRouter } from "react-router-dom";
import Header from "../../../public/Header/Header";
import EFHeader from "./EFHeader/EFHeader";
///@material
import AddIcon from "@material-ui/icons/Add";
import { Button, Card } from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

class EventFeed extends React.Component {
  componentDidMount() {
    this.props.getAllEvents();
  }

  edit() {}
  delete() {}
  render() {
    const { events, history } = this.props,
      displayAllEvents = events.map((el, i) => {
        return (
          <Card className="EF_card" key={i}>
            <span>{el.important ? <Favorite /> : <FavoriteBorder />}</span>
            <h1>{el.title}</h1>
            <h3>{el.event_oidate}</h3>
            <h3>{el.location}</h3>
            <p>{el.text}</p>
          </Card>
        );
      });
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
    { getAllEvents }
  )(EventFeed)
);
