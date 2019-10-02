import React, { Component } from "react";
import "./Home.css";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/user";
import { getPixels } from "../../../ducks/pixel";
import * as moment from "moment";
import { withRouter } from "react-router-dom";
import Quote from "../../Inbox/Quote/Quote";
import Header from "../../public/Header/Header";
import Reminder from "./Reminder/Reminder";
import Grid from "../Grid/Grid";

class Home extends Component {
  state = {
    reminder: false,
    now: moment().format("MM-DD-YYYY")
  };
  componentDidMount() {
    const { getUser, getPixels, pixels } = this.props;
    getUser();
    getPixels().then(res => {
      console.log(res);
    });

    const today = pixels.findIndex(el => el.pixel_date === this.state.now);
    //reminder dialog pop up
    today > -1 ? null : this.setState(() => ({ reminder: true }));
  }

  render() {
    //variables
    const { reminder, now } = this.state;

    return (
      <div className="Home">
        <Header />
        {reminder ? <Reminder formattedCurrentDate={now} /> : null}
        {/* <Quote /> */}
        <div className="Home_containerBackground">
          <Grid now={now} />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.user,
    pixels: state.pixel.pixels,
    year: state.pixel.year
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    { getUser, getPixels }
  )(Home)
);
