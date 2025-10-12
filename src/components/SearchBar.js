import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search expenses by name, description or category..."
        className="search-input"
        aria-label="Search expenses"
      />
    </div>
  );
}

export default SearchBar;