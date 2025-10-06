import React from "react";

interface SearchBarProps {
  searchUser: string;
  setSearchUser: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> =({ searchUser, setSearchUser }) => {
  
  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="text"
        placeholder="Search for a user"
        className="border border-gray-300 rounded-md 
          px-3 py-2 focus:outline-none focus:ring-2 
          focus:ring-blue-500 w-80"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
