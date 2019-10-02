import React from "react";
import { withRouter } from "react-router-dom";
import { addEvent } from "../../../../ducks/event";
import { connect } from "react-redux";
import moment from "moment";
import Header from "../../../public/Header/Header";
import "./AddEvent.css";
//material ui
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Input,
  Card
} from "@material-ui/core";
import EventHeader from "./EventHeader";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

class AddEvent extends React.Component {
  state = {
    date:
      this.props.match.params.date === "custom"
        ? moment.now()
        : this.props.match.params.date,
    title: "",
    text: "",
    location: "",
    important: false
  };
  markImportant() {
    this.setState({ important: !this.state.important });
  }
  addEvent = () => {
    const { important, text, title, location, date } = this.state,
      formattedDate = moment(date).format("MM-DD-YYYY"),
      { addEvent, history, match } = this.props,
      body = {
        important,
        text,
        title,
        location,
        formattedDate
      };
    addEvent(body).then(() => {
      if (match.params.date === "custom") {
        history.push("/event");
      } else {
        history.push(`/pixel/${match.params.date}`);
      }
    });
  };
  changeDate = selectedDate => {
    this.setState({ date: selectedDate });
  };
  render() {
    const { match } = this.props,
      { important, date } = this.state;
    return (
      <div>
        <Header />
        <Card className="AddEvent">
          <EventHeader save={this.addEvent} date={match.params.date} />
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                value="checkedH"
              />
            }
            label="Important event"
            onClick={() => this.setState(() => ({ important: !important }))}
          />
          {match.params.date === "custom" ? (
            <addevent-picker>
              <TextField
                label="date"
                defaultValue={date}
                type="datetime-local"
                onChange={this.changeDate}
              />
            </addevent-picker>
          ) : null}

          <addevent-input>
            <Input
              className="AddEvent_title"
              placeholder="Event title"
              inputProps={{
                "aria-label": "Description"
              }}
              onChange={e => this.setState({ title: e.target.value })}
            />
            <TextField
              label="location"
              placeholder="ex)129 East Fremont St Las Vegas NV89101"
              margin="normal"
              fullWidth
              onChange={e => this.setState({ location: e.target.value })}
            />
            <TextField
              id="textarea"
              label="type event's details"
              placeholder="Going to have a family dinner at Mediano"
              multiline
              fullWidth
              rowsMax="5"
              margin="normal"
              onChange={e => this.setState({ text: e.target.value })}
            />
          </addevent-input>
        </Card>
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
    { addEvent }
  )(AddEvent)
);
