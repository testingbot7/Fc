const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const cartService = {
  // Get current cart
  getCart: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Get cart error:', error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (tabletId, quantity = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ tabletId, quantity })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  },

  // Update item quantity
  updateQuantity: async (itemId, quantity) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/update-quantity`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ itemId, quantity })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Update quantity error:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeItem: async (itemId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/remove`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ itemId })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Remove item error:', error);
      throw error;
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Clear cart error:', error);
      throw error;
    }
  },

  // Save item for later
  saveForLater: async (itemId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/save-for-later`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ itemId })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Save for later error:', error);
      throw error;
    }
  },

  // Move saved item back to cart
  moveToCart: async (savedItemId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/move-to-cart`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ savedItemId })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Move to cart error:', error);
      throw error;
    }
  },

  // Sync cart with server (update prices, stock, etc.)
  syncCart: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/sync`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Sync cart error:', error);
      throw error;
    }
  },

  // Apply coupon/discount
  applyCoupon: async (couponCode) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/apply-coupon`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ couponCode })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Apply coupon error:', error);
      throw error;
    }
  },

  // Remove coupon
  removeCoupon: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/remove-coupon`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Remove coupon error:', error);
      throw error;
    }
  },

  // Get saved items
  getSavedItems: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/saved-items`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Get saved items error:', error);
      throw error;
    }
  },

  // Remove saved item permanently
  removeSavedItem: async (savedItemId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/saved-items/remove`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ savedItemId })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Remove saved item error:', error);
      throw error;
    }
  },

  // Validate cart before checkout
  validateCart: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/validate`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Validate cart error:', error);
      throw error;
    }
  }
};