import React from "react"
import Card from '@material-ui/core/Card';
import "./Todo.css";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {getTodos,addTodo} from "../../../ducks/todo";
import {Input} from "@material-ui/core"
class Todo extends React.Component{
    state={
        title:'',
        todos:[]
    }
    componentDidMount(){
        const {getTodos,match} = this.props,
        date=match.params.date;
        getTodos(date).then(res=> console.log(res))
    }
    handleTitle = value=>{
       this.setState(()=>({title:value}))
    }
    addTodo = e => {
        const 
        {addTodo,match} = this.props,
        {title} = this.state,
        date=match.params.date,
        body={
            title,
            todo_date:date
        };
        if (e.keyCode === 13) {
            addTodo(body);
            this.handleTitle('');
        }
      };
    
    render(){
        const {title} = this.state
        console.log(title)
        return(
            <Card className="Todo">
            <todo-add>
                <i className="far fa-calendar-check"></i>
            <Input
            placeholder="ex)Interview Jane Doe"
            label="Add Tasks"
            inputProps={{
              "aria-label": "Description"
            }}
            value={title}
            fullWidth
            className="Todo_input"
            onKeyDown={this.addTodo}
            onChange={e =>this.handleTitle(e.target.value)}
          />
          </todo-add>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
      ...state.todo
    };
  }
  
  export default 
    withRouter(connect(
      mapStateToProps,
      { getTodos,addTodo}
    )(Todo))
  
  