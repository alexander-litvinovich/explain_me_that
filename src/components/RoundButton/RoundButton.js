import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./RoundButton.css";

const onClickBuffer = (func) => (event) => {
  event.stopPropagation();
  func();
};

const RoundButton = ({
  name,
  color = "black",
  small,
  ghost,
  link,
  onClick,
  onFocus,
  onBlur,
  title,
  children,
  disabled,
}) => {
  const classes = classNames("RoundButton", {
    "is-disabled": disabled,
    "RoundButton--sizeSmall": small,
    "RoundButton--styleGhost": ghost,
    "RoundButton--colorBlue": color === "blue",
    "RoundButton--colorGreen": color === "green",
    "RoundButton--colorRed": color === "red",
    "RoundButton--colorMagenta": color === "magenta",
    "RoundButton--colorBlack": color === "black",
    "RoundButton--colorWhite": color === "white",
  });

  const inner = <div className="RoundButton-child">{children}</div>;

  return link ? (
    <Link
      to={link}
      name={name}
      className={classes}
      onFocus={onFocus}
      onBlur={onBlur}
      title={title}
      aria-label={title}
    >
      {inner}
    </Link>
  ) : (
    <button
      className={classes}
      name={name}
      onClick={onClickBuffer(onClick)}
      onFocus={onFocus}
      onBlur={onBlur}
      title={title}
      aria-label={title}
      disabled={disabled}
    >
      {inner}
    </button>
  );
};

export default RoundButton;
