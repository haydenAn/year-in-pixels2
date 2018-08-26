import React from "react";
import "./Welcome.css";
import Button from "@material-ui/core/Button";
const Welcome = () => {
  /////use the link below for my logo
  /////https://open.spotify.com/track/6XInw1uowvKHrJZaiFd8sY?si=ZG_Rhxz0SiCV6HSynbhm8w
  return (
    <div className="welcome">
      <div className="welcome_content">
        <h1>Ilgi</h1>
        <span>일기</span>
        <span>日记</span>
        <span>ダイアリー</span>
        <p>
          color your year in<br />
          <span>PIXELS</span>
        </p>
        <Button className="welcome_btn" variant="outlined" href={process.env.REACT_APP_LOGIN}>❤️  GET STARTED  ❤️</Button>
      </div>
    </div>
  );
};

export default Welcome;
