import React from "react";
import "./Feed.css";
import { connect } from "react-redux";
import {getFullPixels} from "../../../ducks/pixel"
import {Card,CardContent,CardHeader,CardMedia,IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class Feed extends React.Component {
    componentDidMount(){
        this.props.getFullPixels()
    }
  render() {
    console.log(this.props.pixels)
    const {pixels} = this.props,
    fullPixelDisplay=pixels.map((el,i)=>{
      return(
         <Card key={i}>
           <CardHeader
           style={{backgroundColor:el.colorvalue}}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={el.colorvalue}
          subheader={el.pixel_date}
        />
         <CardMedia
         component="img"
         height="500"
          image={el.img_url}
        />
        <CardContent>{el.text}</CardContent>
      </Card>
      )
     
    })
    return <div className="Feed">
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
