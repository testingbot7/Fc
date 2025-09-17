// src/components/SearchResults.js
import React from 'react';
import { Plus, Package, AlertCircle } from 'lucide-react';

// Highlight matching text in search results
const HighlightText = ({ text, searchTerm, matches }) => {
  if (!searchTerm && !matches) return <span>{text}</span>;

  // If we have specific match indices from Fuse.js
  if (matches && matches.length > 0) {
    // This is a simplified version - you can enhance based on actual match data
    const lowerText = text.toLowerCase();
    const lowerTerm = searchTerm.toLowerCase();
    const index = lowerText.indexOf(lowerTerm);
    
    if (index !== -1) {
      return (
        <span>
          {text.substring(0, index)}
          <mark className="bg-yellow-200 font-semibold px-1 rounded">
            {text.substring(index, index + searchTerm.length)}
          </mark>
          {text.substring(index + searchTerm.length)}
        </span>
      );
    }
  }

  // Fallback highlighting
  if (searchTerm) {
    const lowerText = text.toLowerCase();
    const lowerTerm = searchTerm.toLowerCase();
    const index = lowerText.indexOf(lowerTerm);
    
    if (index !== -1) {
      return (
        <span>
          {text.substring(0, index)}
          <mark className="bg-yellow-200 font-semibold px-1 rounded">
            {text.substring(index, index + searchTerm.length)}
          </mark>
          {text.substring(index + searchTerm.length)}
        </span>
      );
    }
  }

  return <span>{text}</span>;
};

const SearchResultItem = ({ result, searchTerm, onAddToCart, isSelected, onClick }) => {
  const { item: medicine, score, matches } = result;
  
  // Get match information for highlighting
  const nameMatch = matches?.find(m => m.key === 'name');
  const brandMatch = matches?.find(m => m.key === 'brand');
  const companyMatch = matches?.find(m => m.key === 'company');

  return (
    <div
      className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-blue-50 border-blue-200' 
          : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Medicine name and brand */}
          <h3 className="font-semibold text-gray-800 text-lg">
            <HighlightText 
              text={medicine.name} 
              searchTerm={searchTerm}
              matches={nameMatch}
            />
            {medicine.brand && (
              <>
                {' - '}
                <span className="text-blue-600">
                  <HighlightText 
                    text={medicine.brand} 
                    searchTerm={searchTerm}
                    matches={brandMatch}
                  />
                </span>
              </>
            )}
          </h3>
          
          {/* Medicine details */}
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <span>
              <HighlightText 
                text={medicine.company} 
                searchTerm={searchTerm}
                matches={companyMatch}
              />
            </span>
            <span>•</span>
            <span className="font-medium">{medicine.strength}</span>
            <span>•</span>
            <span className={`flex items-center gap-1 ${
              medicine.stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <Package className="w-3 h-3" />
              Stock: {medicine.stock}
            </span>
          </div>
          
          {/* Category and description */}
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {medicine.category}
            </span>
            {medicine.description && (
              <p className="text-xs text-gray-500 mt-1">{medicine.description}</p>
            )}
          </div>
          
          {/* Search relevance score (for debugging - remove in production) */}
          {process.env.NODE_ENV === 'development' && score && (
            <div className="text-xs text-gray-400 mt-1">
              Match: {Math.round(score * 100)}%
            </div>
          )}
        </div>
        
        {/* Price and Add button */}
        <div className="text-right ml-4 flex flex-col items-end">
          <p className="font-bold text-xl text-green-600 mb-2">
            ₹{medicine.price}
          </p>
          
          {medicine.stock > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(medicine);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add to Cart
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchResults = ({ 
  results, 
  searchTerm, 
  onAddToCart, 
  selectedIndex, 
  onResultClick,
  isVisible = true,
  className = ""
}) => {
  if (!isVisible || results.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto ${className}`}>
      {/* Results header */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 sticky top-0">
        <p className="text-sm text-gray-600">
          {results.length} medicine{results.length !== 1 ? 's' : ''} found
          {searchTerm && (
            <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
          )}
        </p>
      </div>
      
      {/* Results list */}
      <div>
        {results.map((result, index) => (
          <SearchResultItem
            key={result.item.id}
            result={result}
            searchTerm={searchTerm}
            onAddToCart={onAddToCart}
            isSelected={selectedIndex === index}
            onClick={() => onResultClick && onResultClick(index)}
          />
        ))}
      </div>
      
      {/* Keyboard navigation hint */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        Use ↑↓ arrows to navigate, Enter to add to cart, Esc to close
      </div>
    </div>
  );
};

export default SearchResults;