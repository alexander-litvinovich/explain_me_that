import React from 'react';
import './Indicator.css';
import classNames from 'classnames';


const Indicator = ({ title, value, onClick = () => { }, highlighter = null, children, time }) => {
    const classes = classNames("Indicator", {
        "Indicator--time": time,
    });

    return (
        <div className={classes} onClick={onClick}>
            <label className="Indicator-Label">
                {highlighter} {title}
            </label>
            <div className="Indicator-Value">
                {children || value}
            </div>
        </div>
    );
}
export default Indicator;
