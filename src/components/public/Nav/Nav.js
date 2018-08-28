import React from "react";
import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Drawer
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
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
        <div
          tabIndex={0}
          role="button"
        >
          <List>
            <ListItem button onClick={this.handleClick}>
              <ListItemText inset primary="My account" />
              {more ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={more} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={this.toggleDrawer(false)}>
                  <ListItemText inset primary="profile" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem button onClick={this.toggleDrawer(false)}>
                  <ListItemText inset primary="Graphs" />
                </ListItem>
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
            <ListItem  button onClick={this.handleClick}>
              <ListItemText inset primary="Home"/>
            </ListItem>
            <ListItem button onClick={this.handleClick}>
              <ListItemText inset primary="My Feed"/>
            </ListItem>
            <ListItem button onClick={this.handleClick}>
              <ListItemText inset primary="Event"/>
            </ListItem>
            <ListItem button onClick={this.handleClick}>
              <ListItemText inset primary="sign out"/>
            </ListItem>
          </List>
        </div>
      );
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={this.toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={open} onClose={this.toggleDrawer(false)}>
          {navList}
        </Drawer>
      </div>
    );
  }
}

export default Nav;
