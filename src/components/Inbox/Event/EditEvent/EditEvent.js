import React from "react"
import { TextField,Input, Button } from "@material-ui/core";

class EditEvent extends React.Component{
    state={
        title: "",
        text: "",
        location: ""
    }
    componentDidMount(){
        const {text, title, location } = this.props;
        this.setState(()=>({text:text,title:title,location:location}))
    }
    save(){
        const {text, title, location } = this.state,
        {handleEditSwitch} = this.props,
        body={
            text,
            title,
            location
        }
       console.log(body)
       handleEditSwitch()
    }
    render(){
        const {text, title, location } = this.state;
        return(
            <div className="EditEvent">
            <Input
            placeholder="Event title"
            inputProps={{
              "aria-label": "Description"
            }}
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <TextField
            label="location"
            margin="normal"
            value={location}
            onChange={e => this.setState({ location: e.target.value })}
          />
             <TextField
            id="textarea"
            label="Event Details"
            multiline
            rowsMax='5'
            value={text}
            margin="normal"
            onChange={e => this.setState({ text: e.target.value })}
          />
          <Button>SAVE</Button>
            </div>
        )
    }
}

export default EditEvent