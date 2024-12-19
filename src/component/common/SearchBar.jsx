import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const { word } = useParams()
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearInput = () => {
    setSearchTerm('');
  };

  useEffect(() => {
      if (word) {
          setSearchTerm(word);
      }
  }, [word, setSearchTerm]);

  const navigate = useNavigate()
  const handleSearch = (event) => {
    event.preventDefault();
    
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    console.log('Searching for:', searchTerm,encodedSearchTerm);
    navigate(`/search/${encodedSearchTerm}`)
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search"
        className="search-input"
      />
      {searchTerm && (
        <button type="button" onClick={clearInput} className="clear-button">
          &times;
        </button>
      )}
      <button type="submit" className="search-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.5L20.5 19L15.5 14V14.71ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="white"/>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;