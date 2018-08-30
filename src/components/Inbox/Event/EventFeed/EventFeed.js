import React from "react"
import "./EventFeed.css";
import {connect} from "react-redux";
import {getAllEvents} from "../../../../ducks/event"
class EventFeed extends React.Component{
    state={
    }
    componentDidMount(){
        this.props.getAllEvents()   
    }
    edit(){

    }
    delete(){

    }
    render(){
        const
        {events} = this.props, 
        displayAllEvents = events.map((el,i)=>{
            return(
                <div key={i}>
                 <h1>{el.title}</h1>
                 <h3>{el.event_date}</h3>
                 <h3>{el.location}</h3>
                 <p>{el.text}</p>
                </div>
            )
        })
        return(
            <div className="EventFeed">
            {displayAllEvents}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
return{
    events:state.event.events
}
}
export default connect(mapStateToProps ,{getAllEvents})(EventFeed)