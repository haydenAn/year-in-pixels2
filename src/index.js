import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
ReactDOM.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
  <Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>
</MuiPickersUtilsProvider>,
  document.getElementById("root")
);
