import React, { useState } from "react";

const SearchBar = ({ onSearch, onSelectLocation }) => {
  const [searchInput, setSearchInput] = useState(""); // Search input for the destination
  const [searchResults, setSearchResults] = useState([]); // Search results for the destination

  const handleSearch = async () => {
    if (!searchInput) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchInput}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
      onSearch(data); // Pass search results to the parent component
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSelectLocation = (lat, lon) => {
    onSelectLocation(lat, lon); // Pass the selected location to the parent
    setSearchResults([]); // Clear search results
    setSearchInput(""); // Clear the input field
  };

  return (
    <div className="realmap-search-bar">
      <input
        type="text"
        placeholder="Search Destinations"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="realmap-search-input"
      />
      <button onClick={handleSearch} className="realmap-search-button">
        Search
      </button>
      {searchResults.length > 0 && (
        <ul className="realmap-search-results">
          {searchResults.map((result, index) => (
            <li
              key={index}
              className="realmap-search-result-item"
              onClick={() =>
                handleSelectLocation(
                  parseFloat(result.lat),
                  parseFloat(result.lon)
                )
              }
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
