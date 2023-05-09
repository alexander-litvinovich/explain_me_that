import React from "react";
import classNames from "classnames";
import "./Checkbox.css";

import CheckMark from "./CheckMark";

const Checkbox = ({ onWhenChange = () => {}, label, checked, value }) => {
  return (
    <label
      className={classNames("Checkbox", { checked: checked })}
      tabIndex="0"
    >
      <input
        type="checkbox"
        className="_visuallyHidden"
        value={value}
        onChange={onWhenChange}
        checked={!!checked}
      />
      <CheckMark />
      {label}
    </label>
  );
};

export default Checkbox;
