import "./numberInput.css"

const NumberInput = ({ label, name, value, onChange }) => {
  return (
    <div className='input-field'>
      <label htmlFor={name}>{label} :</label>
      <input
        className='num-input'
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
