// src/components/MedicineSearch.js
import React, { useState, useRef, useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { ShoppingCart, X, Receipt } from 'lucide-react';

const MedicineSearch = ({ onCartUpdate }) => {
  const {
    query,
    setQuery,
    results,
    isLoading,
    error,
    suggestions,
    startVoiceSearch,
    clearResults
  } = useSearch();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const [cart, setCart] = useState([]);
  
  const searchContainerRef = useRef(null);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleAddToCart(results[selectedIndex].item);
        }
        break;
        
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle focus to show results
  const handleFocus = () => {
    if (results.length > 0) {
      setShowResults(true);
    }
  };

  // Handle clicking outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show results when query changes and results are available
  useEffect(() => {
    if (results.length > 0 && query.length >= 2) {
      setShowResults(true);
      setSelectedIndex(-1);
    } else {
      setShowResults(false);
    }
  }, [results, query]);

  // Add medicine to cart
  const handleAddToCart = (medicine) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === medicine.id);
      let newCart;
      
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...medicine, quantity: 1 }];
      }
      
      // Notify parent component about cart updates
      if (onCartUpdate) {
        onCartUpdate(newCart);
      }
      
      return newCart;
    });

    // Clear search after adding
    setQuery('');
    setShowResults(false);
    clearResults();
    
    // Show success feedback
    showAddToCartFeedback(medicine.name);
  };

  // Remove from cart
  const handleRemoveFromCart = (medicineId) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== medicineId);
      if (onCartUpdate) {
        onCartUpdate(newCart);
      }
      return newCart;
    });
  };

  // Update cart quantity
  const handleUpdateQuantity = (medicineId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(medicineId);
      return;
    }

    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === medicineId
          ? { ...item, quantity: newQuantity }
          : item
      );
      if (onCartUpdate) {
        onCartUpdate(newCart);
      }
      return newCart;
    });
  };

  // Show feedback when item is added
  const showAddToCartFeedback = (medicineName) => {
    // You can implement a toast notification here
    console.log(`${medicineName} added to cart`);
  };

  // Handle result click
  const handleResultClick = (index) => {
    setSelectedIndex(index);
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Section */}
      <div ref={searchContainerRef} className="relative mb-6">
        <SearchBar
          query={query}
          setQuery={setQuery}
          isLoading={isLoading}
          onVoiceSearch={startVoiceSearch}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="Search medicines by name, brand, company, or category..."
        />

        {/* Error display */}
        {error && (
          <div className="absolute top-full left-0 right-0 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mt-1">
            <p>Search error: {error}</p>
          </div>
        )}

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 z-10 mt-1">
            <SearchResults
              results={results}
              searchTerm={query}
              onAddToCart={handleAddToCart}
              selectedIndex={selectedIndex}
              onResultClick={handleResultClick}
              isVisible={showResults}
            />
          </div>
        )}
      </div>

      {/* Cart Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            Shopping Cart
            {cartItemCount > 0 && (
              <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
                {cartItemCount}
              </span>
            )}
          </h2>
          
          {cart.length > 0 && (
            <button
              onClick={() => setCart([])}
              className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Your cart is empty</p>
            <p className="text-sm">Search and add medicines above</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {item.name} - {item.brand}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.company} • {item.strength}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      ₹{item.price} each
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Item total */}
                    <div className="text-right min-w-20">
                      <p className="font-bold text-green-600">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                    
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove from cart"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Total and Actions */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg">
                  <span className="text-gray-600">Total Items: </span>
                  <span className="font-semibold">{cartItemCount}</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  Total: ₹{cartTotal}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Generate Bill
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Save for Later
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Search suggestions (optional) */}
      {suggestions.length > 0 && query.length >= 2 && (
        <div className="mt-4 bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Popular searches:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineSearch;