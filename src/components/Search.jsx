import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ searchInput, handleSearchInputChange }) => {
  return (
    <div className="search max-w-[500px] mx-auto">
      <div className="relative h-[50px] ">
        <input
          className="border  bg-sky-950 rounded  block w-[100%] h-[100%] px-[50px] outline-none text-white placeholder:text-white"
          type="text"
          placeholder="Search through thousands of movies"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <div className="absolute left-0 top-0 w-[10%] h-full flex items-center justify-center">
          <FaSearch style={{ color: "white" }} />
        </div>
      </div>
    </div>
  );
};

export default Search;
