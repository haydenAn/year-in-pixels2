import React from "react";
import { IconButton, AppBar, Toolbar } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { withRouter,Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./Header.css";
class Header extends React.Component {
  render() {
    const { match } = this.props;
    console.log(match);
    return (
      <AppBar position="fixed" className="AppBar">
        <Toolbar className="AppBar_tool">
          <Nav />
          <bar-logo>
            <h1>Ilgi</h1>
          </bar-logo>
          {match.path === "/home" ? null : (
            <Link to="/home">
            <IconButton className="Header_home" aria-label="Home">
              <HomeIcon />
            </IconButton>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Header);
