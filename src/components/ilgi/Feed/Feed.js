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
  Button
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import colors from "../Pixel/models/colors";
import FeedHeader from "./FeedHeader/FeedHeader";
import Header from "../../public/Header/Header";
import { withRouter } from "react-router-dom";
class Feed extends React.Component {
  state = {
    open: false
  };
  componentDidMount() {
    this.props.getFullPixels();
  }
  toggle = () => {
    this.setState(() => ({ open: !this.state.open }));
  };
  edit = body => {
    const { pushPixelToEdit, history } = this.props;
    pushPixelToEdit(body);
    history.push(`/edit/${body.pixel_date}`);
  };
  delete = id => {
    this.props.deletePixel(id);
  };

  render() {
    const { pixels, isLoading } = this.props,
      { open } = this.state,
      hexToRGBArray = hex => hex.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16)).join(','),
      fullPixelDisplay = pixels[0] ? (
        pixels.map((el, i) => {
          const moodObj = colors.filter(
            obj => el.colorvalue === Object.values(obj)[0]
          )[0];
          return (
            <Card key={i} className="Feed_card">
              <CardHeader
                className="Feed_header"
                style={{backgroundColor:`rgba(${hexToRGBArray(el.colorvalue)},${el.opacity})`}}
                title={Object.keys(moodObj)[0]}
                subheader={el.colorvalue}
                action={
                  <div className="Feed_action">
                    <IconButton onClick={this.toggle}>
                      <MoreVertIcon />
                    </IconButton>
                    <div className={open?`Feed_btn`:'Feed_btn_hide'}>
                      <Button onClick={() => this.edit(el)}>Edit</Button>
                      <Button className="Feed_btn-delete" onClick={() => this.delete(el.id)}>Delete</Button>
                    </div>
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
