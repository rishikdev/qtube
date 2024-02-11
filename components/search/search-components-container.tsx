"use client";

import SearchBar from "./search-bar";
import SearchSuggestions from "./search-suggestions";

const SearchComponentsContainer = () => {
  return (
    <div
      id="search-components-container"
      className="h-full invisible opacity-0"
    >
      <div id="search-bar-container" className="w-full">
        <SearchBar />
      </div>
      <div
        id="search-suggestions-container"
        className="h-[85%] overflow-scroll"
      >
        <SearchSuggestions />
      </div>
    </div>
  );
};

export default SearchComponentsContainer;
