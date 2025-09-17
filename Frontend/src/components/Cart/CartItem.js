import React, { useState } from 'react';
import { Plus, Minus, Trash2, Save, AlertTriangle } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, onSaveForLater }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(item.quantity);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 100) return;
    
    setIsUpdating(true);
    setTempQuantity(newQuantity);
    
    try {
      await onUpdateQuantity(item._id, newQuantity);
    } catch (error) {
      setTempQuantity(item.quantity); // Revert on error
    }
    
    setIsUpdating(false);
  };

  const handleDirectQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setTempQuantity(value);
  };

  const handleQuantityBlur = () => {
    if (tempQuantity !== item.quantity) {
      handleQuantityChange(tempQuantity);
    }
  };

  const isOutOfStock = item.tablet?.stock === 0;
  const hasInsufficientStock = item.tablet?.stock < item.quantity;
  const maxAvailable = item.tablet?.stock || 0;

  return (
    <div className={`bg-white rounded-lg border p-4 ${isOutOfStock || hasInsufficientStock ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex items-start space-x-4">
        {/* Medicine Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.tablet?.name || 'Unknown Medicine'}
              </h3>
              <p className="text-sm text-gray-600">
                {item.tablet?.brand} • {item.tablet?.company}
              </p>
              <p className="text-xs text-gray-500">
                Strength: {item.tablet?.strength}
              </p>
            </div>
            
            {/* Price */}
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">
                ₹{item.tablet?.price || item.priceAtTime}
              </p>
              <p className="text-xs text-gray-500">per unit</p>
            </div>
          </div>

          {/* Stock Warning */}
          {(isOutOfStock || hasInsufficientStock) && (
            <div className="mt-2 flex items-center space-x-1 text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">
                {isOutOfStock ? 'Out of Stock' : `Only ${maxAvailable} available`}
              </span>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(tempQuantity - 1)}
                  disabled={tempQuantity <= 1 || isUpdating || isOutOfStock}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                
                <input
                  type="number"
                  min="1"
                  max={maxAvailable}
                  value={tempQuantity}
                  onChange={handleDirectQuantityChange}
                  onBlur={handleQuantityBlur}
                  disabled={isUpdating || isOutOfStock}
                  className="w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
                
                <button
                  onClick={() => handleQuantityChange(tempQuantity + 1)}
                  disabled={tempQuantity >= maxAvailable || isUpdating || isOutOfStock}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {isUpdating && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
              )}
            </div>

            {/* Total Price */}
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                ₹{((item.tablet?.price || item.priceAtTime) * item.quantity).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                {item.quantity} × ₹{item.tablet?.price || item.priceAtTime}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center space-x-4">
            <button
              onClick={() => onSaveForLater(item._id)}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save for later</span>
            </button>
            
            <button
              onClick={() => onRemoveItem(item._id)}
              className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;