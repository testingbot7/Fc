import React from 'react';
import { ShoppingCart, Package, CreditCard } from 'lucide-react';

const CartSummary = ({ cart, onCheckout, isCheckingOut }) => {
  const subtotal = cart?.totalAmount || 0;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <ShoppingCart className="h-5 w-5" />
        <span>Order Summary</span>
      </h3>

      {/* Summary Stats */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-gray-400" />
            <span>Items</span>
          </span>
          <span className="font-medium">{cart?.totalItems || 0}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span>Unique medicines</span>
          <span className="font-medium">{cart?.items?.length || 0}</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Tax (5%)</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between text-lg font-bold border-t border-gray-200 pt-3">
          <span>Total</span>
          <span className="text-green-600">₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={!cart?.items?.length || isCheckingOut}
        className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
      >
        {isCheckingOut ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            <span>Proceed to Billing</span>
          </>
        )}
      </button>

      {/* Additional Info */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>• Stock availability verified at checkout</p>
        <p>• Prices may change based on current rates</p>
      </div>
    </div>
  );
};

export default CartSummary;

