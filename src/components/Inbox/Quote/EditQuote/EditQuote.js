import React from "react";
import "./EditQuote.css";
import { connect } from "react-redux";
import { addQuote } from "../../../../ducks/quote";
import { Button, Card, Input, CardActions } from "@material-ui/core";
import axios from "axios";
class EditQuote extends React.Component {
  state = {
    text: "",
    author: "",
    bgColor: "",
    bgUrl: null
  };
  save = () => {
    const { text, author, bgColor, bgUrl } = this.state,
      { addQuote, toggleEditSwitch } = this.props,
      body = { text, author, bgColor, bgUrl };
    addQuote(body);
    toggleEditSwitch();
  };
  getRandom = () => {
    axios.get("/api/quote/random").then(res => console.log(res));
  };
  changeText = e => {
    this.setState({ text: e.target.value });
  };
  changeAuthor = e => {
    this.setState({ author: e.target.value });
  };
  clearForm = () => {
    this.setState({ text: "", author: "", bgColor: "", bgUrl: null });
  };

  render() {
    console.log(this.state);
    const { text, author, bgColor, bgUrl } = this.state;
    return (
      <Card className="EditQuote">
        <form>
          <Input
            placeholder="ex)Design is not just what it looks like and feels like. Design is how it works."
            label="Type your quote"
            inputProps={{
              "aria-label": "Description"
            }}
            fullWidth
            multiline
            rows="3"
            style={{ fontSize: "1.5em" }}
            value={text}
            onChange={this.changeText}
          />
          <div className="EditQuote_author">
          -By 
          <Input
            placeholder="Steve Jobs"
            label="Author"
            inputProps={{
              "aria-label": "Description"
            }}
            value={author}
            onChange={e => this.changeAuthor}
          />
          </div>
          <Button variant="outlined" onClick={this.getRandom} color="secondary">
            get random quote
          </Button>
          <Button variant="outlined" onClick={this.clearForm}>
            clear
          </Button>
          <Button variant="contained" onClick={this.save} color="primary">
            save
          </Button>
        </form>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.quote
  };
};
export default connect(
  mapStateToProps,
  { addQuote }
)(EditQuote);
