import React from "react";
import classNames from "classnames";
import "./ModalWindow.css";

const onClickBuffer = (func) => (event) => {
  event.stopPropagation();
  func();
};

const ModalWindow = ({
  children,
  title,
  text,
  color,
  // onOpen = () => {},
  onClose = () => {},
  leftButton,
  rightButton,
  isOpened,
}) => {
  const classes = classNames("ModalWindow-Header", {
    "ModalWindow-Header--colorBlue": color === "blue",
    "ModalWindow-Header--colorGreen": color === "green",
    "ModalWindow-Header--colorRed": color === "red",
    "ModalWindow-Header--colorMagenta": color === "magenta",
    "ModalWindow-Header--colorBlack": color === "black",
  });

  return (
    <>
      <div
        className={classNames("ModalWindow", { opened: isOpened })}
        onClick={onClickBuffer(onClose)}
      >
        <div className="ModalWindow-Content">
          {title ? (
            <div className={classes}>
              <h2>{title}</h2>
              {text ? <p className="ModalWindow-Text">{text}</p> : null}
            </div>
          ) : null}
          {children}
          {leftButton && rightButton && (
            <div className="ModalWindow-SideBySide">
              <div className="ModalWindow-SideBySide-Container">
                {leftButton}
              </div>
              <div className="ModalWindow-SideBySide-Container">
                {rightButton}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={classNames("ModalOverlay", {
          opened: isOpened,
        })}
      />
    </>
  );
};

export default ModalWindow;
