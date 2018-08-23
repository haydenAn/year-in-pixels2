import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import user from "./ducks/user";
import pixel from "./ducks/pixel";
import event from "./ducks/event"
const store = createStore(
  combineReducers({
    user,
    pixel,
    event
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
