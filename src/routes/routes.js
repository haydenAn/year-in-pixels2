import React from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "../components/public/Welcome/Welcome";
import Home from "../components/ilgi/Home/Home";
import Pixel from "../components/ilgi/Pixel/Pixel"
import Edit from "../components/ilgi/Pixel/Edit/Edit";
import AddEvent from "../components/Inbox/Event/AddEvent/AddEvent";
export default (
  <Switch>
    <Route exact path="/" component={()=><Welcome/>} />
    <Route path="/home" component={()=><Home/>} />
    <Route path="/pixel/:date" component={()=><Pixel/>} />
    <Route path="/edit/:date" component={()=><Edit/>} />
    <Route path="/addevent/:date" component={()=><AddEvent/>} />
     </Switch>
);