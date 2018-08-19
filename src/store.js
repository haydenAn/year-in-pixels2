import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import user from "./ducks/user";
import pixel from "./ducks/pixel"
const store = createStore(
  combineReducers({
    user,
    pixel
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
