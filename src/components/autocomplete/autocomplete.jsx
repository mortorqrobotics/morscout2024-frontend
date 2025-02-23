import { useState } from 'react';
import './Autocomplete.css';

const Autocomplete = ({ options, onSelect, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setFilteredOptions([]);
    onSelect(option);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {filteredOptions.length > 0 && (
        <ul className="autocomplete-list">
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete; 