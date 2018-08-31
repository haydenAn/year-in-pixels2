import React from "react";
import { TextField, Input, Button } from "@material-ui/core";
import { updateEvent } from "../../../../ducks/event";
import { connect } from "react-redux";
import "./EditEvent.css";

class EditEvent extends React.Component {
  state = {
    title: "",
    text: "",
    location: ""
  };
  componentDidMount() {
    const { event } = this.props;
    this.setState(() => ({
      text: event.text,
      title: event.title,
      location: event.location
    }));
  }
  save = () => {
    const { text, title, location } = this.state,
      { handleEditSwitch, event, updateEvent } = this.props,
      body = {
        text,
        title,
        location
      };
    updateEvent(event.id, body);
    handleEditSwitch();
  };
  render() {
    const { text, title, location } = this.state;
    return (
      <div className="EditEvent">
        <Input
          label="Event title"
          placeholder="Event title"
          inputProps={{
            "aria-label": "Description"
          }}
          className="EditEvent_title"
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <TextField
          label="location"
          margin="normal"
          value={location}
          onChange={e => this.setState({ location: e.target.value })}
        />
        <TextField
          id="textarea"
          label="Event Details"
          multiline
          rowsMax="5"
          value={text}
          margin="normal"
          onChange={e => this.setState({ text: e.target.value })}
        />
        <editevnet-btn>
          <Button variant="contained" color="primary" onClick={this.save}>
            SAVE
          </Button>
          <Button variant="contained" onClick={this.props.handleEditSwitch}>
            CANCEL
          </Button>
        </editevnet-btn>{" "}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    event: state.event.event
  };
};
export default connect(
  mapStateToProps,
  { updateEvent }
)(EditEvent);
