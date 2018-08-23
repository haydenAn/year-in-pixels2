import React from "react";
import "./ImgAdder.css";
import axios from "axios";
//matrial ui
import {TextField,Button,MobileStepper} from "@material-ui/core";
class ImgAdder extends React.Component {
  state = {
    searchSwitch: false,
    activeStep: 0,
    searchResults: [],
    searchKeyword: ""
  };
  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
    const { searchKeyword, activeStep } = this.state;
    axios
      .get(`/api/photos/${searchKeyword}/${activeStep + 1}`)
      .then(res => this.setState(() => ({ searchResults: res.data.results })));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
    const { searchKeyword, activeStep } = this.state;
    axios
      .get(`/api/photos/${searchKeyword}/${activeStep + 1}`)
      .then(res => this.setState(() => ({ searchResults: res.data.results })));
  };
  search = e => {
    const { activeStep } = this.state;
    if (e.keyCode === 13) {
      let keyword = e.target.value;
      this.setState(() => ({ searchSwitch: true, searchKeyword: keyword }));
      axios
        .get(`/api/photos/${keyword}/${activeStep + 1}`)
        .then(res =>
          this.setState(() => ({ searchResults: res.data.results }))
        );
    }
  };

  random = () => {
    const { changeImg } = this.props;
    axios
      .get("/api/photo/random")
      .then(res => changeImg(res.data.urls.regular));
  };
  fileChangedHandler = e => {
    const { changeImg } = this.props;
    let reader = new FileReader();
    reader.onload = e => {
      changeImg(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  selectPhoto(url) {
    const { changeImg } = this.props;
    changeImg(url);
    this.setState(() => ({ searchSwitch: false }));
  }
  render() {
    const { searchSwitch, activeStep, searchResults } = this.state,
      { imgUrl } = this.props,
      searchResultsDisplay = searchResults.map((el, i) => {
        return (
          <img
          alt="searched_photo"
            key={i}
            src={el.urls.regular}
            width="400"
            onClick={() => this.selectPhoto(el.urls.regular)}
          />
        );
      });
    return (
      <div className="ImgAdder">
        <imgadder-buttons>
          <input
            accept="image/*"
            id="outlined-button-file"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={this.fileChangedHandler}
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
          <Button
            variant="outlined"
            className="ImgAdder_button"
            onClick={this.random}
          >
            Random
          </Button>
          <TextField
            label="Search images..."
            className="ImgAdder_search"
            fullWidth
            onKeyDown={this.search}
          />
          <search-results>
            {searchSwitch ? (
              <div className="ImgAdder_showSearch">
                <MobileStepper
                  variant="dots"
                  steps={6}
                  position="static"
                  className="ImgAdder_stepper"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      onClick={this.handleNext}
                      disabled={activeStep === 5}
                    >
                      Next
                    </Button>
                  }
                  backButton={
                    <Button
                      onClick={this.handleBack}
                      disabled={activeStep === 0}
                    >
                      Back
                    </Button>
                  }
                />
                <div className="ImgAdder_search-results">
                  {searchResultsDisplay}
                </div>
              </div>
            ) : null}
          </search-results>
        </imgadder-buttons>
        <img alt="default img" src={imgUrl} />
      </div>
    );
  }
}
export default ImgAdder;
