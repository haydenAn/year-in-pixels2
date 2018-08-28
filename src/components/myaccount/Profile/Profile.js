import React from "react";
import "./Profile.css";
import { Card, CardMedia } from "@material-ui/core";
import person from "../../../sass/images/person.jpg";
import CountUp from "react-countup";
import axios from "axios";
import {connect} from "react-redux";
import moment from "moment";

class Profile extends React.Component {
  state = {
    num: 56
  };
  componentDidMount(){
      axios.get('/api/count/pixels').then(res=> 
        this.setState({num:res.data[0].count}))
  }
  render() {
    console.log(this.props.user)
    const { num} = this.state,
    {user} = this.props;
    return (
      <div className="Profile">
        <div>
          <CountUp
            start={0}
            end={Number(num)}
            duration={5}
            className="Profile_count"
         />
          pixels has been created !
        </div>
        <Card className="Profile_card">
          <profile-userInfo>
            <h1>{user.displayname?user.displayname:'Jane Doe'}</h1>
            <p>user since {user.user_created_at? moment(user.user_created_at).format("MM-DD-YYYY"):'2018-06-04'}</p>
          </profile-userInfo>
          <CardMedia
          className="Profile_img"
            component="img"
            image={user.profile_pic?user.profile_pic :person}
            title="Live from space album cover"
          />
        </Card>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
 return {
     ...state.user
 }
}

export default connect(mapStateToProps)(Profile);
