import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import user from "./ducks/user";
import pixel from "./ducks/pixel";
import event from "./ducks/event";
import todo from "./ducks/todo"
import quote from "./ducks/quote"
const store = createStore(
  combineReducers({
    user,
    pixel,
    event,
    todo,
    quote
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
