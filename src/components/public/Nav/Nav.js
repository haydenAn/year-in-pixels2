import React from "react";
import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Drawer,
  ListItemIcon,
  Hidden
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import Person from "@material-ui/icons/Person";
import SpeakerNotes from "@material-ui/icons/SpeakerNotes";
import Event from "@material-ui/icons/Event";
import { Link } from "react-router-dom";
import "./Nav.css";
class Nav extends React.Component {
  state = {
    open: false,
    more: false
  };
  toggleDrawer = open => () => {
    this.setState({
      open: open
    });
  };
  handleClick = () => {
    this.setState(state => ({ more: !state.more }));
  };
  render() {
    const { open, more } = this.state,
      navList = (
        <div tabIndex={0} role="button">
          <List>
            <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText inset primary="My account" />
              {more ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={more} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to={"/profile"}>
                  <ListItem button onClick={this.toggleDrawer(false)}>
                    <ListItemText inset primary="Profile" />
                  </ListItem>
                </Link>

                <a href={process.env.REACT_APP_LOGOUT}>
                  <ListItem button onClick={this.toggleDrawer(false)}>
                    <ListItemText inset primary="sign out" />
                  </ListItem>
                </a>
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
            <Link to={"/home"}>
              <ListItem button onClick={this.toggleDrawer(false)}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText inset primary="Home" />
              </ListItem>
            </Link>
            <Link to={"/myFeed"}>
              <ListItem button onClick={this.toggleDrawer(false)}>
                <ListItemIcon>
                  <SpeakerNotes />
                </ListItemIcon>
                <ListItemText inset primary="My Feed" />
              </ListItem>
            </Link>
            <Link to={"/event"}>
              <ListItem button onClick={this.toggleDrawer(false)}>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText inset primary="Event" />
              </ListItem>
            </Link>
          </List>
        </div>
      );
    return (
      <div className="Nav">
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Drawer anchor="right" open={open} onClose={this.toggleDrawer(false)}>
          {navList}
        </Drawer>
      </div>
    );
  }
}

export default Nav;
