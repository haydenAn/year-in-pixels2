import React from "react";
import "./Feed.css";
import { connect } from "react-redux";
import {
  getFullPixels,
  pushPixelToEdit,
  deletePixel
} from "../../../ducks/pixel";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Button,
  CircularProgress
} from "@material-ui/core";
import * as moment from "moment";
import colors from "../Pixel/models/colors";
import FeedHeader from "./FeedHeader/FeedHeader";
import Header from "../../public/Header/Header";
import { withRouter } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
class Feed extends React.Component {
  componentDidMount() {
    this.props.getFullPixels();
  }
  edit = body => {
    const { pushPixelToEdit, history } = this.props;
    pushPixelToEdit(body);
    history.push(`/edit/${body.pixel_date}`);
  };
  delete = id => {
    this.props.deletePixel(id);
  };

  render() {
    const { pixels, isLoading, history } = this.props,
      hexToRGBArray = hex =>
        hex
          .match(/[A-Za-z0-9]{2}/g)
          .map(v => parseInt(v, 16))
          .join(","),
      fullPixelDisplay = pixels[0] ? (
        pixels.map((el, i) => {
          const moodObj = colors.filter(
            obj => el.colorvalue === Object.values(obj)[0]
          )[0];
          return (
            <Card key={i} className="Feed_card">
              <CardHeader
                className="Feed_header"
                style={{
                  backgroundColor: `rgba(${hexToRGBArray(el.colorvalue)},${
                    el.opacity
                  })`
                }}
                title={Object.keys(moodObj)[0]}
                subheader={el.colorvalue}
                action={
                  <div className="Feed_action">
                    <IconButton onClick={() => this.edit(el)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      className="Feed_btn-delete"
                      onClick={() => this.delete(el.id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </div>
                }
              />
              <CardMedia component="img" image={el.img_url} />
              <CardContent className="Feed_content">
                <h1>{el.pixel_date}</h1>
                {"   "}
                {el.text}
              </CardContent>
            </Card>
          );
        })
      ) : (
        <feed-nopixel>
          pixels not found{" "}
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
              <AddIcon
                onClick={() =>
                  history.push(`/edit/${moment().format("MM-DD-YYYY")}`)
                }
              />
            </Button>
          </p>
        </feed-nopixel>
      );
    return (
      <div className="Feed">
        <Header />
        <FeedHeader />
        {isLoading ? (
          <CircularProgress style={{ display: "block", margin: "0 auto" }} />
        ) : (
          fullPixelDisplay
        )}
        <feed-footer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    pixels: state.pixel.pixelsForFeed,
    isLoading: state.pixel.isLoading
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { getFullPixels, pushPixelToEdit, deletePixel }
  )(Feed)
);
