import React, { useState } from "react";

const SearchForm: React.FC<SearchFormProps> = ({ updateSearchQuery }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInput(query);
    updateSearchQuery(query);
  };

  return (
    <form className="mb-5">
      <div className="w-80">
        <input
          type="text"
          id="searchform"
          className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full pl-4 p-2 "
          placeholder="Keresés..."
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default SearchForm;
