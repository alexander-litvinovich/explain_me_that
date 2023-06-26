import React from "react";
import "./SplashLayout.css";

const SplashLayout = ({ onClick }) => (
  <div className="SplashLayout" onClick={onClick}>
    <div className="SplashLayout-Decoration">
      <div className="rect1">
        <div className="rect2">
          <div className="rect3">
            <div className="rect4" />
          </div>
        </div>
      </div>
    </div>

    <div className="SplashLayout-appTitle">
      <h2 className="SplashLayout-appTitle-word">Explain me&nbsp;that!</h2>
      <label className="SplashLayout-appTitle-description">
        a game for English learners
      </label>
    </div>
  </div>
);

export default SplashLayout;
