import React from "react";
import classNames from "classnames";
import "./Header.css";

const Header = ({ children, leftButton, rightButton, fixed }) => {
  return (
    <header className={classNames("Header", { "is-fixed": fixed })}>
      <div className="Header-LeftButton">{leftButton}</div>
      <div className="Header-RightButton">{rightButton}</div>
      <div className="Header-Middle">{children}</div>
    </header>
  );
};
export default Header;
