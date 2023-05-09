import React from "react";

import IconRight from "./Assets/IconRight";
import IconSkip from "./Assets/IconSkip";
import IconMenu from "./Assets/IconMenu";
import IconRestart from "./Assets/IconRestart";
import IconCross from "./Assets/IconCross";
import IconBack from "./Assets/IconBack";
import IconHighlight from "./Assets/IconHighlight";

const Icon = ({ name }) => {
  const icons = {
    Right: IconRight,
    Skip: IconSkip,
    Menu: IconMenu,
    Back: IconBack,
    Restart: IconRestart,
    Cross: IconCross,
    Highlight: IconHighlight,
  };
  const CustomIcon = typeof name === "string" && icons[name];

  return CustomIcon ? <CustomIcon /> : name;
};

export default Icon;
