 import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../Config/Debounce";
import { searchUserAction } from "../../Redux/User/Action";
import SearchUserCard from "./SearchUserCard";
import { FiX, FiSearch, FiUser, FiAlertTriangle } from "react-icons/fi";
import "./SearchComponent.css";

const SearchComponent = ({ setIsSearchVisible }) => {
  const token = localStorage.getItem("token");
  const { user } = useSelector(store => store);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSearchVisible]);

  const handleSearchUser = (query) => {
    if (query.trim() === "") {
      // Instead of clearSearchResults, we'll just let the empty array handle it
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    const data = {
      jwt: token,
      query,
    };
    dispatch(searchUserAction(data))
      .finally(() => setIsLoading(false));
  };

  const debouncedHandleSearchUser = debounce(handleSearchUser, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsLoading(true);
    debouncedHandleSearchUser(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    // No need to dispatch clear action since we'll handle it with empty state
  };

  return (
    <div 
      ref={searchRef}
      className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-50 border border-gray-200 overflow-hidden"
    >
      {/* Search Header */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Search Users</h1>
          <button 
            onClick={() => setIsSearchVisible(false)}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <FiX className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {/* Search Input */}
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={inputRef => inputRef && inputRef.focus()}
            value={searchQuery}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 placeholder-gray-400 transition-all duration-200"
            type="text"
            placeholder="Search by username, name..."
            autoComplete="off"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-gray-500">Searching...</p>
          </div>
        ) : (
          <>
            {user?.searchResult?.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {user?.searchResult?.map((item) => (
                  <SearchUserCard
                    setIsSearchVisible={setIsSearchVisible}
                    key={item.id}
                    id={item.id}
                    username={item.username}
                    name={item.name}
                    image={item?.image}
                    bio={item.bio}
                  />
                ))}
              </div>
            ) : searchQuery ? (
              <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                <FiUser className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No users found</h3>
                <p className="text-gray-500 mt-1">
                  We couldn't find any users matching "{searchQuery}"
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                <FiSearch className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">Search for users</h3>
                <p className="text-gray-500 mt-1">
                  Type a username or name to find people
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;