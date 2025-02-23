import { useState } from 'react';
import "./searchbar.css"

const SearchBar = ({ onSearch, searchText}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); 
  };

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder={searchText}
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
