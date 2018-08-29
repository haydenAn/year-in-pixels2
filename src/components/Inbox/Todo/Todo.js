import React from "react";
import Card from "@material-ui/core/Card";
import "./Todo.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../../../ducks/todo";
//material
import {
  Input,
  ListItemSecondaryAction,
  ListItemText,
  List,
  ListItem,
  Checkbox,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
class Todo extends React.Component {
  state = {
    title: ""
  };
  componentDidMount() {
    const { getTodos, match } = this.props,
      date = match.params.date;
    getTodos(date);
  }
  //   componentDidUpdate(prevProps,prevState){
  //     const { getTodos, match,todos } = this.props,
  //     date = match.params.date;
  //       if(prevProps.todos.length!==todos.length){
  //           getTodos(date)
  //       }
  //   }
  handleTitle = value => {
    this.setState(() => ({ title: value }));
  };
  addTodo = e => {
    const { addTodo, match } = this.props,
      { title } = this.state,
      date = match.params.date,
      body = {
        title,
        todo_date: date
      };
    if (e.keyCode === 13) {
      addTodo(body);
      this.handleTitle("");
    }
  };
  delete=(id,date)=>{
    this.props.deleteTodo(id,date)
  }
  handleCheck = (id, checked,date) => {
    const { updateTodo } = this.props,
      body = { checked, date };
    updateTodo(id, body);
  };
  render() {
    const { title } = this.state,
      { todos } = this.props,
      todoListDisplay = todos.map((el, i) => [
        <ListItem
          key={i}
          dense
          button
          onClick={()=>this.handleCheck(el.id, !el.checked,el.todo_date)}
        >
          <Checkbox checked={el.checked} tabIndex={-1} disableRipple />
          <ListItemText primary={el.text} style={{fontSize:'1.5em'}}/>
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete" onClick={()=>this.delete(el.id,el.todo_date)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ]);
    return (
      <Card className="Todo">
        <todo-add>
          <i className="far fa-calendar-check" />
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
            onChange={e => this.handleTitle(e.target.value)}
          />
        </todo-add>
        <List className="Todo_list">{todoListDisplay}</List>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.todo
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getTodos, addTodo, updateTodo,deleteTodo}
  )(Todo)
);
