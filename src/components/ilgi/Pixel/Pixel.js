import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Event from "../../Inbox/Event/Event";
import Todo from "../../Inbox/Todo/Todo";
import AddIcon from "@material-ui/icons/Add";
import { getPixel, pushPixelToEdit, deletePixel } from "../../../ducks/pixel";
import "./Pixel.css";
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";
//material ui
import { LinearProgress, Card, CardContent, Button } from "@material-ui/core";
import PixelHeader from "./PixelHeader/PixelHeader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

class Pixel extends Component {
  state = {
    color: "#BDBDBD",
    opacity: 0.8,
    open: false
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
    AOS.init({
      duration: 1500
    });
  }

  delete = () => {
    const { deletePixel, pixel, history } = this.props;
    this.handleCloseDialog();
    deletePixel(pixel.pixel_id).then(() => {
      history.push(`/home`);
    });
  };
  handleOpenDialog = () => {
    this.setState({ open: true });
  };
  handleCloseDialog = () => {
    this.setState({ open: false });
  };
  pushPixelToEdit = () => {
    const { pushPixelToEdit, history, match, pixel } = this.props;
    pushPixelToEdit(pixel);
    history.push(`/edit/${match.params.date}`);
  };
  render() {
    const { pixel, isLoading, match, history } = this.props,
      { opacity, color, open } = this.state,
      date = moment(match.params.date).format("MMM Do YYYY");
    console.log(pixel);
    return (
      // <div>
      // {/* {isLoading ? ( */}
      // {/* <LinearProgress /> */}
      // {/* ) : ( */}
      <div className="Pixel">
        <PixelHeader opacity={opacity} color={color} />
        <div data-aos="fade-down" className="Pixel_img">
          <img alt="pixel_img" src={pixel.img_url} width="500" />
        </div>
        <section className="Pixel_main">
          <section className="Pixel_main-content">
            <div className="content-top">
              <div
                className="content_journal"
                style={{
                  justifyContent: `${
                    pixel.text == null || pixel.text === ""
                      ? "space-around"
                      : "flex-start"
                  }`
                }}
              >
                <h1>{date}</h1>
                <article>{pixel.text}</article>
                <pixel-notext
                  style={{
                    display: `${
                      pixel.text == null || pixel.text === "" ? "table" : "none"
                    }`
                  }}
                >
                  <p>you haven't wrote any journal to this pixel.</p>
                  <p>would you like add one? </p>
                  <Button
                    variant="outlined"
                    aria-label="Add"
                    color="primary"
                    style={{
                      margin: "0 0 5px 5px",
                      boxShadow: "none",
                      textTransform: "none"
                    }}
                    onClick={() =>
                      history.push(`/edit/${moment().format("MM-DD-YYYY")}`)
                    }
                  >
                    sure
                  </Button>
                </pixel-notext>
              </div>
              <Event />
            </div>
            <Todo />
          </section>
          <section className="Pixel_main-actions">
            <Button variant="outlined" onClick={this.pushPixelToEdit}>
              Edit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.handleOpenDialog}
            >
              Delete
            </Button>
          </section>
        </section>

        <Dialog
          open={open}
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="Pixel_dialogtitle">
            {"Are you sure you want to delete this pixel?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              No
            </Button>
            <Button onClick={this.delete} color="primary" autoFocus>
              Yes,I'd like to
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      // {/* )} */}
      // {/* </div> */}
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
    { getPixel, pushPixelToEdit, deletePixel }
  )(Pixel)
);
