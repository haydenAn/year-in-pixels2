import React from 'react';
import { Button } from "@material-ui/core";
import "./EventHeader.css";
const EventHeader = (props)=>{
  return(
      <div className="EventHeader" >
      <eventH-date>{props.date}</eventH-date>
      <Button  variant="contained" color="primary" onClick={props.save}> Save</Button>
      </div>
  )
}


export default EventHeader