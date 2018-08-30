import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Event from "../../Inbox/Event/Event";
import Todo from "../../Inbox/Todo/Todo";
import { getPixel, pushPixelToEdit } from "../../../ducks/pixel";
import "./Pixel.css";
import moment from "moment";
//material ui
import { LinearProgress, Card, CardContent, Button } from "@material-ui/core";
import PixelHeader from "./PixelHeader/PixelHeader";

class Pixel extends Component {
  state = {
    color: "#BDBDBD",
    opacity: 0.8
  };
  componentDidMount() {
    const { getPixel, match, history } = this.props,
      date = match.params.date;
    getPixel(date).then(res => {
      if (res.value === false) {
        history.push(`/edit/${date}`);
      } else {
        const p = res.value,
          opacity = p.opacity,
          color = p.colorvalue;
        this.setState(() => ({ opacity, color }));
      }
    });
  }
  pushPixelToEdit = () => {
    const { pushPixelToEdit, history, match,pixel } = this.props;
    pushPixelToEdit(pixel);
    history.push(`/edit/${match.params.date}`);
  };
  render() {
    const { pixel, isLoading, match } = this.props,
      { opacity, color } = this.state,
      date = moment(match.params.date).format("MMM Do YY");
    console.log(pixel);
    return (
      <div>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <div className="Pixel">
            <PixelHeader opacity={opacity} color={color} />
            <div className="Pixel_img">
              <img alt="pixel_img" src={pixel.img_url} width="500" />
            </div>
            <Todo />
            <pixel-bottom>
              <Card className="Pixel_text">
                <CardContent>
                  <h1>{date}</h1>
                  {pixel.text}
                </CardContent>
              </Card>
              <Event />
            </pixel-bottom>
            <Button
            className="Pixel_editBtn"
              variant="contained"
              color="primary"
              onClick={this.pushPixelToEdit}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.pixel
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getPixel, pushPixelToEdit }
  )(Pixel)
);
