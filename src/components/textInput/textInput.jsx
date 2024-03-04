// TextInput.jsx
import "./textInput.css"

const TextInput = ({ label, name, value, onChange }) => {
  return (
    <div className='input-field'>
      <label htmlFor={name}>{label} :</label>
      <input
        autoComplete="off"
        className='text-input'
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
