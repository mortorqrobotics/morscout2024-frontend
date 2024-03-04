import React from "react";
import "./counter.css"

const Counter = ({ label, name, value, onChange }) => {
  const handleIncrement = () => {
    onChange(name, value + 1);
  };

  const handleDecrement = () => {
    onChange(name, value - 1);
  };

  return (
    <div className="counterFull">
      <label>{label}</label>
      <div className="counters">
        <button type="button" onClick={handleDecrement}>-</button>
        <span className="value">{value}</span>
        <button type="button" className="counterButton" onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};

export default Counter;
