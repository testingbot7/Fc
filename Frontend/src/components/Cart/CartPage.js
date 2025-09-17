import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import SavedItems from './SavedItems';
import BillingModal from '../Billing/BillingModal';
import { cartService } from '../../services/cartService';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      setCart(response.cart);
      setSavedItems(response.cart?.savedItems || []);
      setError('');
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setError('Failed to load cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      const response = await cartService.updateQuantity(itemId, quantity);
      setCart(response.cart);
    } catch (error) {
      throw error; // Let CartItem handle the error
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await cartService.removeItem(itemId);
      setCart(response.cart);
    } catch (error) {
      console.error('Failed to remove item:', error);
      setError('Failed to remove item. Please try again.');
    }
  };

  const handleSaveForLater = async (itemId) => {
    try {
      const response = await cartService.saveForLater(itemId);
      setCart(response.cart);
      setSavedItems(response.cart.savedItems || []);
    } catch (error) {
      console.error('Failed to save item:', error);
      setError('Failed to save item for later.');
    }
  };

  const handleMoveToCart = async (savedItemId) => {
    try {
      const response = await cartService.moveToCart(savedItemId);
      setCart(response.cart);
      setSavedItems(response.cart.savedItems || []);
    } catch (error) {
      console.error('Failed to move item to cart:', error);
      setError('Failed to move item to cart.');
    }
  };

  const handleSyncCart = async () => {
    try {
      setSyncing(true);
      const response = await cartService.syncCart();
      setCart(response.cart);
      
      if (response.changes?.hasChanges) {
        setError(response.message || 'Cart has been updated based on current availability.');
      }
    } catch (error) {
      console.error('Failed to sync cart:', error);
      setError('Failed to sync cart.');
    } finally {
      setSyncing(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      try {
        await cartService.clearCart();
        setCart({ items: [], totalItems: 0, totalAmount: 0 });
      } catch (error) {
        console.error('Failed to clear cart:', error);
        setError('Failed to clear cart.');
      }
    }
  };

  const handleCheckout = () => {
    setShowBillingModal(true);
  };

  const handleBillGenerated = () => {
    setShowBillingModal(false);
    // Clear cart after successful billing
    setCart({ items: [], totalItems: 0, totalAmount: 0 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const hasItems = cart?.items?.length > 0;
  const hasSavedItems = savedItems?.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Shopping Cart
                  {hasItems && (
                    <span className="ml-2 text-lg font-normal text-gray-600">
                      ({cart.totalItems} items)
                    </span>
                  )}
                </h1>
              </div>
            </div>

            {hasItems && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSyncCart}
                  disabled={syncing}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                  <span>Sync Cart</span>
                </button>
                
                <button
                  onClick={handleClearCart}
                  className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <span className="text-yellow-800">{error}</span>
            <button
              onClick={() => setError('')}
              className="ml-auto text-yellow-600 hover:text-yellow-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hasItems ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cart Items ({cart.items.length})
              </h2>
              
              {cart.items.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onSaveForLater={handleSaveForLater}
                />
              ))}
            </div>

            {/* Cart Summary */}
            <div>
              <CartSummary
                cart={cart}
                onCheckout={handleCheckout}
                isCheckingOut={isCheckingOut}
              />
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Start adding medicines to your cart to see them here.
            </p>
            <button
              onClick={() => navigate('/worker/dashboard')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* Saved Items */}
        {hasSavedItems && (
          <div className="mt-12">
            <SavedItems
              savedItems={savedItems}
              onMoveToCart={handleMoveToCart}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        )}
      </div>

      {/* Billing Modal */}
      {showBillingModal && (
        <BillingModal
          cart={cart}
          onClose={() => setShowBillingModal(false)}
          onBillGenerated={handleBillGenerated}
        />
      )}
    </div>
  );
};

export default CartPage;