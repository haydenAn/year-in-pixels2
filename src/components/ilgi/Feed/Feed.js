import React from "react";
import "./Feed.css";
import { connect } from "react-redux";
import {getFullPixels} from "../../../ducks/pixel"
import {Card,CardContent,CardHeader,CardMedia,IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import colors from "../Pixel/models/colors";
import FeedHeader from "./FeedHeader/FeedHeader"
class Feed extends React.Component {
    componentDidMount(){
        this.props.getFullPixels()
    }
  render() {
    console.log(this.props.pixels)
    const {pixels} = this.props,
    fullPixelDisplay=pixels.map((el,i)=>{
      const moodObj = colors.filter((obj)=>el.colorvalue===Object.values(obj)[0])[0]
      return(
         <Card key={i} className="Feed_card">
           <CardHeader
           className="Feed_header"
           style={{backgroundColor:el.colorvalue, opacity:el.opacity}}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={Object.keys(moodObj)[0]}
          subheader={el.colorvalue}
        />
         <CardMedia
         component="img"
          image={el.img_url}
        />
        <CardContent className="Feed_content">
        <h1>{el.pixel_date}</h1>
        {"   "}{el.text}
        </CardContent>
      </Card>
      )
     
    })
    return <div className="Feed">
    <FeedHeader/>
    {fullPixelDisplay}
    </div>
  }
}
const mapStateToProps = state => {
  return {
    pixels:state.pixel.pixelsForFeed
  };
};
export default connect(mapStateToProps ,{getFullPixels})(Feed);
