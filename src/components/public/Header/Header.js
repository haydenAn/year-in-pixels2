import React from "react";
import { IconButton, AppBar, Toolbar, Button, Hidden } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { withRouter, Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./Header.css";
class Header extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <AppBar position="fixed" className="AppBar">
        <Toolbar className="AppBar_tool">
          <toolbar-left>
            <Nav />
            <bar-logo>
              <h1>Ilgi</h1>
            </bar-logo>
          </toolbar-left>
          <toolbar-right>
            <Hidden xsDown>
              {match.path === "/home" ? null : (
                <Link to="/home">
                  <IconButton className="Header_home" aria-label="Home">
                    <HomeIcon />
                  </IconButton>
                </Link>
              )}
              <Button>
                <Link to="/myFeed">My Feed</Link>
              </Button>
              <Button>
                <Link to="/event">Event</Link>
              </Button>
              <Button>
                <Link to="/profile">Profile</Link>
              </Button>
              <Button>
                <a href={process.env.REACT_APP_LOGOUT}>logout</a>
              </Button>
            </Hidden>
          </toolbar-right>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Header);
