import React from "react"
import {withRouter} from "react-router-dom"
import {addEvent} from "../../../../ducks/event"
import {connect} from "react-redux"
import moment from "moment";

//material ui
import { DatePicker } from 'material-ui-pickers';
import { Button } from "@material-ui/core";
import EventHeader from "./EventHeader";

class AddEvent extends React.Component{
    state = {
        date: this.props.match.params.date,
        title: "",
        text: "",
        location: "",
        important: false
      };
      markImportant() {
        this.setState({ important: !this.state.important });
      }
      addEvent=()=>{
        const
        {important, text, title, location, date } = this.state,
        formattedDate= moment(date).format("MM-DD-YYYY"),
        addEvent = this.props,
        body={
            important,
            text,
            title,
            location,
            formattedDate
        };
        console.log(body)
        // addEvent(body);
      }
    changeDate=(selectedDate)=>{
      this.setState({date:selectedDate})
    }
    render(){
        const { history } = this.props,
        {important, text, title, location, date } = this.state;
        console.log(date)
        return(
            <div className="AddEvent">
            <EventHeader save={this.addEvent}/>
        <addevent-picker>
          <DatePicker
            label="date"
            value={date}
            maxDateMessage="Date must be less than today"
            leftArrowIcon='<'
            rightArrowIcon='>'
           onChange={this.changeDate}
            animateYearScrolling={false}
          />
        </addevent-picker>
        <addevent-input>
        <input
            className="AddEvent_titleInput"
            placeholder="Event title"
            type="text"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <input
            className="AddEvent_locationInput"
            placeholder="Location"
            value={location}
            onChange={e => this.setState({ location: e.target.value })}
          />
          <textarea
            value={text}
            onChange={e => this.setState({ text: e.target.value })}
          />
        </addevent-input>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.event
    };
  }
export default withRouter(connect(
    mapStateToProps,
    { addEvent }
  )(AddEvent))