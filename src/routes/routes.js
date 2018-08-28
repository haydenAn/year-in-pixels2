import React from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "../components/public/Welcome/Welcome";
import Home from "../components/ilgi/Home/Home";
import Pixel from "../components/ilgi/Pixel/Pixel"
import Edit from "../components/ilgi/Pixel/Edit/Edit";
import AddEvent from "../components/Inbox/Event/AddEvent/AddEvent";
import Feed from "../components/ilgi/Feed/Feed";
import Graph from "../components/myaccount/Graph/Graph";
import Profile from "../components/myaccount/Profile/Profile"
export default (
  <Switch>
    <Route exact path="/" component={()=><Welcome/>} />
    <Route path="/home" component={()=><Home/>} />
    <Route path="/pixel/:date" component={()=><Pixel/>} />
    <Route path="/edit/:date" component={()=><Edit/>} />
    <Route path="/addevent/:date" component={()=><AddEvent/>} />
    <Route path="/myFeed" component={()=><Feed/>} />
    <Route path="/graph" component={()=><Graph/>} />
    <Route path="/profile" component={()=><Profile />}/>
     </Switch>
);