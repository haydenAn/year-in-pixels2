import React from "react";
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
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
class Todo extends React.Component {
  state = {
    title: ""
  };
  styles = {
    text: {
      textDecoration: "none"
    }
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
  delete = (id, date) => {
    this.props.deleteTodo(id, date);
  };
  handleCheck = (id, checked, date) => {
    const { updateTodo } = this.props,
      body = { checked, date };
    updateTodo(id, body);
    this.styleGrid(checked, id);
  };
  styleGrid = (checked, id) => {
    let styles;
    if (checked) {
      this.styles = {
        ...this.styles,
        [id]: {
          textDecoration: "line-through"
        }
      };
    } else {
      this.styles = {
        ...this.styles,
        id: {
          textDecoration: "initial"
        }
      };
    }
    return styles;
  };
  render() {
    const { title } = this.state,
      { todos } = this.props,
      todoListDisplay = todos.map((el, i) => [
        <ListItem
          key={i}
          dense
          button
          onClick={() => this.handleCheck(el.id, !el.checked, el.todo_date)}
        >
          <Checkbox
            className="checkbox"
            checked={el.checked}
            tabIndex={-1}
            disableRipple
          />
          <ListItemText
            primary={el.text}
            style={{
              ...this.styles[el.id],
              textDecoration: `${el.checked ? "line-through" : "initial"}`
            }}
            className="item-text"
          />
          <ListItemSecondaryAction>
            <IconButton
              className="deleteIcon"
              aria-label="Delete"
              onClick={() => this.delete(el.id, el.todo_date)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ]);
    return (
      <div className="Todo">
        <section className="todo-header">
          <h1>to-do list</h1>
          <p>Add your tasks to the list, get things done!</p>
          <todo-add>
            <i className="far fa-calendar-check" />
            <Input
              placeholder="ex) pay the electric bill"
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
        </section>
        <List className="Todo_list">{todoListDisplay}</List>
      </div>
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
    { getTodos, addTodo, updateTodo, deleteTodo }
  )(Todo)
);
