// src/components/SearchBar.js
import React, { useRef, useEffect } from 'react';
import { Search, Mic, X, Loader } from 'lucide-react';

const SearchBar = ({ 
  query, 
  setQuery, 
  isLoading, 
  onVoiceSearch, 
  placeholder = "Search medicines by name, brand, or company...",
  onKeyDown,
  onFocus,
  className = ""
}) => {
  const inputRef = useRef(null);

  // Focus on mount (for better UX)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {/* Search Icon */}
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        
        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          placeholder={placeholder}
          className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg transition-all duration-200 hover:border-gray-400"
          autoComplete="off"
          spellCheck="false"
        />
        
        {/* Right side icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {/* Loading spinner */}
          {isLoading && (
            <Loader className="w-5 h-5 text-blue-600 animate-spin" />
          )}
          
          {/* Clear button */}
          {query && !isLoading && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
          
          {/* Voice search button */}
          {onVoiceSearch && (
            <button
              onClick={onVoiceSearch}
              className="p-1 hover:bg-blue-100 rounded-full transition-colors"
              title="Voice search"
            >
              <Mic className="w-5 h-5 text-blue-600 hover:text-blue-700" />
            </button>
          )}
        </div>
      </div>
      
      {/* Search hints */}
      {query.length === 1 && (
        <div className="absolute top-full left-0 right-0 bg-blue-50 border border-blue-200 rounded-lg p-3 mt-1 text-sm text-blue-700">
          <p>💡 Type at least 2 characters to search</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;