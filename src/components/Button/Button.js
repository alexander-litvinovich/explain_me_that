import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./Button.css";

const onClickBuffer = (func) => (event) => {
  event.stopPropagation();
  func();
};

const Button = ({ title, subTitle = "", link = "", onClick, color, small }) => {
  const classes = classNames("Button", {
    "Button--small": small,
    "Button--colorBlue": color === "blue",
    "Button--colorGreen": color === "green",
    "Button--colorRed": color === "red",
    "Button--colorMagenta": color === "magenta",
    "Button--colorBlack": color === "black",
  });

  const inner = (
    <React.Fragment>
      <div className="Button-title">
        {title}
        {subTitle.length > 0 && (
          <div className="Button-subTitle">{subTitle}</div>
        )}
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {link.length ? (
        <Link to={link} className={classes}>
          {inner}
        </Link>
      ) : (
        <button onClick={onClickBuffer(onClick)} className={classes}>
          {inner}
        </button>
      )}
    </React.Fragment>
  );
};

export default Button;
