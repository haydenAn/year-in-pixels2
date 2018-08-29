import React from "react";
import "./Quote.css";
import { connect } from "react-redux";
import { getQuote,deleteQuote} from "../../../ducks/quote";
import { Button,Menu,MenuItem } from "@material-ui/core";
import EditQuote from "./EditQuote/EditQuote";
import MoreVertIcon from '@material-ui/icons/MoreVert';

class Quote extends React.Component {
  state = {
    editSwitch: false,
    allowAddNew: false,
    anchorEl: null
  };
  componentDidMount() {
    this.props.getQuote();
  }
  toggleEditSwitch = () => {
    this.setState({ editSwitch: !this.state.editSwitch });
  };
  addNewbtnAction = () => {
    this.setState({ allowAddNew: true });
    this.toggleEditSwitch();
  };
  updatebtnAction = ()=>{
    this.setState({ allowAddNew: false });
    this.toggleEditSwitch();
    this.closeMenus()
  }
  delete = (id)=>{
      const {quote,deleteQuote} = this.props;
     deleteQuote(quote.id)
    this.closeMenus()
  }
  openMenus = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  closeMenus = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { quote} = this.props,
      { editSwitch, allowAddNew, anchorEl } = this.state;
    return (
      <div className="Quote">
        {editSwitch ? (
          <EditQuote
            toggleEditSwitch={this.toggleEditSwitch}
            allowAddNew={allowAddNew}
            quote={quote}
          />
        ) : quote ? (
          <quote-display>
              <span className="Quote_dq"><i className="fas fa-quote-left"></i>

</span>
            <Button
              aria-owns={anchorEl ? "simple-menu-quote" : null}
              aria-haspopup="true"
              className="quote_menu"
              onClick={this.openMenus}
            >
              <MoreVertIcon/>
            </Button>
            <Menu
              id="simple-menu-quote"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.closeMenus}
            >
              <MenuItem onClick={this.updatebtnAction}>Edit</MenuItem>
              <MenuItem onClick={this.delete}>Delete</MenuItem>
            </Menu>
            <h1>{quote.text}</h1>
            <p>By - {quote.author}</p>
          </quote-display>
        ) : (
          <quote-addPanel>
            <h3>
              I can't find your quote :(
              {"\n"}
              Do you want to add one?
            </h3>
            <br />
            <Button color="secondary" onClick={this.addNewbtnAction}>
              yes, let's Customize it ❤
            </Button>
          </quote-addPanel>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.quote
  };
};
export default connect(
  mapStateToProps,
  { getQuote, deleteQuote }
)(Quote);
