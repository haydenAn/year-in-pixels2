import React from "react";
import defaultImg from "../../../../../sass/images/default.jpg";
import "./ImgAdder.css";
//matrial ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
class ImgAdder extends React.Component {
  state={
    searchSwitch:false
  }
  search = (e) => {
    if (e.keyCode === 13) {
      console.log("works");
      this.setState(()=>({searchSwitch:true}))
  }
  };
  render() {
    const {searchSwitch} = this.state
    return (
      <div className="ImgAdder">
        <imgadder-buttons>
          <input
            accept="image/*"
            id="outlined-button-file"
            multiple
            type="file"
            style={{ display: "none" }}
          />
          <label htmlFor="outlined-button-file">
            <Button
              variant="outlined"
              component="span"
              className="ImgAdder_button"
            >
              Upload
            </Button>
          </label>
          <Button variant="outlined" className="ImgAdder_button">
            Random
          </Button>
          <TextField
            label="Search images..."
            className="ImgAdder_search"
            fullWidth
            onKeyDown={this.search}
          />
          <search-results>
            {
             searchSwitch?
             <div className="ImgAdder_search-results">
                search results
             </div>
             :null
            }
          </search-results>
        </imgadder-buttons>
        <img alt="default img" src={defaultImg} />
      </div>
    );
  }
}
export default ImgAdder;
