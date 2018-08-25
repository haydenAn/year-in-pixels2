import React from 'react'
import "./Quote.css"
import {connect} from "react-redux"
import {getQuote,addQuote} from "../../../ducks/quote";
import {Button} from "@material-ui/core";
class Quote extends React.Component{
    state={
        editSwitch:false,
    }
    componentDidMount(){
        this.props.getQuote()
    }
    toggleEditSwitch=()=>{
          this.setState({editSwitch:!this.state.editSwitch})
    }
    render(){
        const {quote} = this.props,
        {editSwitch} = this.state;
        console.log(quote)
        return(
            <div className="Quote">
            {
                editSwitch?
                <div />
                :
                quote?
                <quote-display>
                <h1>{quote.text}</h1>
                <p>{quote.author}</p>
                </quote-display>
                :
                <quote-addPanel>
                    <h3>
                    I can't find your quote :(
                        {"\n"}
                    Do you want to add one?
                    </h3>
                            <br />
                    <Button color="secondary" onClick={this.toggleEditSwitch}>yes, let's Customize it ❤</Button>
                    </quote-addPanel>
            }
            </div>
        )
    }
}

const mapStateToProps= state=>{
    return{
        ...state.quote
    }
}
export default connect(mapStateToProps,{getQuote,addQuote})(Quote);