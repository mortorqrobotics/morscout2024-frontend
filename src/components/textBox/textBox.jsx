import React from "react";

const TextBox = ({ label, name, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={4} // You can adjust the number of rows as needed
      />
    </div>
  );
};

export default TextBox;