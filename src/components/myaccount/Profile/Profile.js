import React from "react";
import "./Profile.css";
import { Card, Avatar, Button } from "@material-ui/core";
import person from "../../../sass/images/person.jpg";
import CountUp from "react-countup";
import { getUser } from "../../../ducks/user";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import Graph from "../Graph/Graph";
import Header from "../../public/Header/Header";
import ForumIcon from "@material-ui/icons/ForumRounded";
class Profile extends React.Component {
  state = {
    num: 56
  };
  componentDidMount() {
    this.props.getUser();
    axios
      .get("/api/count/pixels")
      .then(res => this.setState({ num: res.data[0].count }));
  }
  render() {
    console.log(this.props.user);
    const { num } = this.state,
      { user } = this.props;
    return (
      <div className="Profile-wrapper">
        <Header />
        <section className="Profile">
          <section className="Profile_left-mdlg">
            <Card className="card_profile">
              <img
                alt="card_background_img"
                src={user.profile_pic ? user.profile_pic : person}
                className="card_bg"
              />
              <article>
                <p>PROFILE</p>
                <Avatar
                  alt="Profile_img"
                  src={user.profile_pic ? user.profile_pic : person}
                  className="Profile_img"
                />
                <h1>{user.displayname ? user.displayname : "Jane Doe"}</h1>
              </article>
            </Card>
            <Card className="card_needHelp">
              <article>
                <ForumIcon className="forumicon" />
                <h1>Need help?</h1>
                <p>
                  Have questions or concerns regarding your ilgi account? Our
                  experts are here to help!
                </p>
              </article>
              <button>CHAT WITH US</button>
            </Card>
          </section>
          <section className="Profile_right-mdlg">
            <Card className="card_detailedPf">
              Total{"  "}
              <CountUp
                start={0}
                end={Number(num)}
                duration={5}
                className="countdays"
              />
              {"  "}
              pixels has been created !
              <p className="userSince">
                user since {"  "}
                {user.user_created_at
                  ? moment(user.user_created_at).format("MM-DD-YYYY")
                  : "2018-06-04"}
              </p>
            </Card>
            <Graph className="card_chart"></Graph>
          </section>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state.user
  };
};

export default connect(
  mapStateToProps,
  { getUser }
)(Profile);
