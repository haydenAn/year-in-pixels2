import React from "react";
import EditEvent from "./EditEvent/EditEvent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getEvent } from "../../../ducks/event";
import moment from "moment"
//material ui
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import Card from '@material-ui/core/Card';
class Event extends React.Component {
  state = {
    editSwitch: false
  };
  componentDidMount() {
    const { getEvent, match } = this.props;
    getEvent(match.params.date);
  }
  render() {
    const { editSwitch } = this.state,
      { event, isLoading, history, match } = this.props;
    return (
      <Card>
        {editSwitch ? (
          <EditEvent />
        ) : (
          <div>
            {event ? (
              <event-outer>
                {isLoading ? (
                  <CircularProgress size={50} />
                ) : (
                  <div className="Event">
                  <h1>{event.title}</h1>
                  <h3>{event.location}</h3>
                  <h3>{moment(event.event_date).format("MM-DD-YYYY")}</h3>
                  <article>{event.text}</article>
                  </div>
                )}
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
      </Card>
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
    { getEvent }
  )(Event)
);
