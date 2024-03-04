// Dropdown.jsx
import React, { useState, useEffect } from "react";
import "./dropdown.css";

const Dropdown = ({ label, options, onSelect, defaultOption }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption || options[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedOption(defaultOption || options[0]);
  }, [defaultOption, options]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <label>{label}</label>
      <div className={`select ${isOpen ? 'select-clicked' : ''}`} onClick={handleClick}>
        <span className="selected">{selectedOption}</span>
        <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
      </div>
      <ul className={`menu ${isOpen ? 'menu-open' : ''}`}>
        {options.map((option) => (
          <li
            key={option}
            className={option === selectedOption ? "active" : ""}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
