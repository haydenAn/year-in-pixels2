import React from 'react'
import "./Quote.css"
import {connect} from "react-redux"
import {getQuote} from "../../../ducks/quote" 
class Quote extends React.Component{
    componentDidMount(){
        this.props.getQuote()
    }
    render(){
        const {quote} = this.props;
        return(
            <div className="Quote">
            {
                quote?
                <div className="displayQuote">
                <h1>{quote.text}</h1>
                <p>{quote.author}</p>
                </div>
                :
                <div>
                    do you want to add a quote?
                    </div>
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
export default connect(mapStateToProps,{getQuote})(Quote);