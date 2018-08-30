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
  CircularProgress,
  Menu,
  MenuItem,
  Button
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import colors from "../Pixel/models/colors";
import FeedHeader from "./FeedHeader/FeedHeader";
import Header from "../../public/Header/Header";
import { withRouter } from "react-router-dom";
class Feed extends React.Component {
  state = {
    anchorEl: null
  };
  componentDidMount() {
    this.props.getFullPixels();
  }
  openMenus = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  closeMenus = () => {
    this.setState({ anchorEl: null });
  };
  edit = body => {
    const { pushPixelToEdit, history } = this.props;
    pushPixelToEdit(body);
    history.push(`/edit/${body.pixel_date}`);
  };
  delete = id => {
    console.log(id);
    this.props.deletePixel(id);
  };
  render() {
    console.log(this.props.pixels);
    const { pixels, isLoading } = this.props,
      { anchorEl } = this.state,
      fullPixelDisplay = pixels[0] ? (
        pixels.map((el, i) => {
          const moodObj = colors.filter(
            obj => el.colorvalue === Object.values(obj)[0]
          )[0];
          return (
            <Card key={i} className="Feed_card">
              <CardHeader
                className="Feed_header"
                style={{ backgroundColor: el.colorvalue, opacity: el.opacity }}
                title={Object.keys(moodObj)[0]}
                subheader={el.colorvalue}
                action={
                  <div>
                  <MoreVertIcon />
                  <div className="Feed_btn">
                  <Button onClick={()=>this.edit(el)}>Edit</Button>
                  <Button onClick={()=>this.delete(el.id)}>Delete</Button>
                  </div>
                  </div>
                }
              />
              <CardMedia component="img" image={el.img_url} />
              <CardContent className="Feed_content">
                <h1>{el.pixel_date}</h1>
                {"   "}
                {el.id}
                {el.text}
              </CardContent>
            </Card>
          );
        })
      ) : (
        <feed-nopixel>
          No pixels found for this search{" "}
          <span role="img" aria-label="confused-emoji-feed">
            😕
          </span>
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
