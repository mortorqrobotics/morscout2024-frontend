// NumberInput.jsx
import React from 'react';
import "./numberInput.css"

const NumberInput = ({ label, name, value, onChange }) => {
  return (
    <div className='inputField'>
      <label htmlFor={name}>{label} :</label>
      <input
        className='numInput'
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default NumberInput;
