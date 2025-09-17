// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();
 
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pharma_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('pharma_cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('pharma_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (medicine, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === medicine._id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map(item =>
          item._id === medicine._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...medicine, quantity }];
      }
    });
  };

  const removeFromCart = (medicineId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== medicineId));
  };

  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(medicineId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item._id === medicineId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('pharma_cart');
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItem = (medicineId) => {
    return cart.find(item => item._id === medicineId);
  };

  const isInCart = (medicineId) => {
    return cart.some(item => item._id === medicineId);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalAmount,
    getCartItem,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };