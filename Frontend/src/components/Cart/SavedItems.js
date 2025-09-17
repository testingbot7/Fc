import React from 'react';
import { Heart, ShoppingCart, Trash2, Package } from 'lucide-react';

const SavedItems = ({ savedItems, onMoveToCart, onRemoveItem }) => {
  if (!savedItems || savedItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <Heart className="h-5 w-5 text-red-500" />
        <span>Saved Items ({savedItems.length})</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedItems.map((item) => (
          <SavedItem
            key={item._id}
            item={item}
            onMoveToCart={onMoveToCart}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

const SavedItem = ({ item, onMoveToCart, onRemoveItem }) => {
  const isOutOfStock = item.tablet?.stock === 0;

  return (
    <div className={`border rounded-lg p-4 ${isOutOfStock ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
      <div className="space-y-3">
        {/* Medicine Info */}
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">
            {item.tablet?.name || 'Unknown Medicine'}
          </h4>
          <p className="text-xs text-gray-600">
            {item.tablet?.brand} • {item.tablet?.company}
          </p>
          <p className="text-xs text-gray-500">
            Strength: {item.tablet?.strength}
          </p>
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-green-600">
              ₹{item.tablet?.price || item.priceAtTime}
            </p>
            {!isOutOfStock && (
              <p className="text-xs text-gray-500">
                {item.tablet?.stock} in stock
              </p>
            )}
          </div>
          
          {isOutOfStock && (
            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onMoveToCart(item._id)}
            disabled={isOutOfStock}
            className="flex-1 flex items-center justify-center space-x-1 text-xs bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart className="h-3 w-3" />
            <span>Move to Cart</span>
          </button>
          
          <button
            onClick={() => onRemoveItem(item._id)}
            className="flex items-center justify-center p-2 text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedItems;