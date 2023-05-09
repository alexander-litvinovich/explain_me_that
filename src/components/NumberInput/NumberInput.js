import React from "react";
import classNames from "classnames";

import RoundButton from "components/RoundButton";

import "./NumberInput.css";

const inputNormalizer = (input, min, max) => {
  let result = +input
    .toString()
    .split("")
    .filter((char) => /[0-9]/.test(char))
    .join("");

  return result < min ? min : result > max ? max : result;
};

function NumberInput(props) {
  const input = React.useRef();

  const { small, color, min, max, onWhenChange } = props;
  const [value, setValue] = React.useState(props.value);

  const classes = classNames("NumberInput", {
    "NumberInput--small": small,
    "NumberInput--colorBlue": color === "blue",
    "NumberInput--colorGreen": color === "green",
    "NumberInput--colorRed": color === "red",
    "NumberInput--colorMagenta": color === "magenta",
    "NumberInput--colorBlack": color === "black",
  });

  React.useEffect(onWhenChange(value), [value]);

  const onButtonChange = (inc) => () => {
    setValue(inputNormalizer(+input.current.value + inc, min, max));
  };

  return (
    <>
      <div className={classes}>
        <div className="NumberInput-minus">
          <RoundButton
            small
            ghost
            disabled={value <= min}
            onClick={onButtonChange(-1)}
          >
            -
          </RoundButton>
        </div>
        <div className="NumberInput-plus">
          <RoundButton
            small
            ghost
            disabled={value >= max}
            onClick={onButtonChange(1)}
          >
            +
          </RoundButton>
        </div>
        <div className="NumberInput-input">
          <input type="text" ref={input} value={value} disabled={true} />
        </div>
      </div>
    </>
  );
}

export default NumberInput;
