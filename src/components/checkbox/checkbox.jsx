import React from 'react';
import './checkbox.css';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

export default Checkbox; 