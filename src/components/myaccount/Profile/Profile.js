import React from "react";
import "./Profile.css";
import { Card, CardMedia } from "@material-ui/core";
import person from "../../../sass/images/person.jpg";
import CountUp from "react-countup";
class Profile extends React.Component {
  state = {
    img: person,
    num: 56
  };
  render() {
    const { img,num } = this.state;
    return (
      <div className="Profile">
        <div>
          <CountUp
            start={0}
            end={num}
            duration={5}
            className="Profile_count"
         />
          pixels has been created !
        </div>
        <Card className="Profile_card">
          <profile-userInfo>
            <h1>Hayden Rahn</h1>
            <p>user since 2018-06-04</p>
          </profile-userInfo>
          <CardMedia
            component="img"
            image={img}
            title="Live from space album cover"
          />
        </Card>
      </div>
    );
  }
}

export default Profile;
