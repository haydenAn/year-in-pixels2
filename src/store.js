import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import user from "./ducks/user";
import pixel from "./ducks/pixel";
import event from "./ducks/event";
import todo from "./ducks/todo"
import quote from "./ducks/quote";
import graph from "./ducks/graph"
const store = createStore(
  combineReducers({
    user,
    pixel,
    event,
    todo,
    quote,
    graph
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
