import React from "react";
import {
  TextField,
  Input,
  Button,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { updateEvent } from "../../../../ducks/event";
import { connect } from "react-redux";
import "./Edit.Event.css";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
class EditEvent extends React.Component {
  state = {
    title: "",
    text: "",
    location: "",
    important: false
  };
  componentDidMount() {
    const { event } = this.props;
    this.setState(() => ({
      text: event.text,
      title: event.title,
      location: event.location,
      import: event.important
    }));
  }
  save = () => {
    const { text, title, location, important } = this.state,
      { handleEditSwitch, event, updateEvent } = this.props,
      body = {
        text,
        title,
        location,
        important
      };
    updateEvent(event.id, body);
    handleEditSwitch();
  };
  render() {
    const { text, title, location, important } = this.state;
    return (
      <div className="EditEvent">
        <FormControlLabel
          control={
            <Checkbox
              checked={important}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              value="checkedE"
            />
          }
          label="Important event"
          onClick={() => this.setState(() => ({ important: !important }))}
        />
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
          label="details"
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
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            onClick={this.props.handleEditSwitch}
          >
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
