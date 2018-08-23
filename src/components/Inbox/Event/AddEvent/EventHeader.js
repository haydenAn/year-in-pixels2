import React from 'react';
import { Button } from "@material-ui/core";

const EventHeader = (props)=>{
  return(
      <div className="EventHeader">
      {props.date}
      <Button onClick={props.save}> Save</Button>
      </div>
  )
}


export default EventHeader