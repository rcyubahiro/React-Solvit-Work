import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (stored) {
      setAllProducts(JSON.parse(stored));
    }
  }, []);

  // Admins see all products, regular users see only their own
  const products = user 
    ? (user.role === 'admin' ? allProducts : allProducts.filter(p => p.userId === user.id))
    : [];

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      userId: user?.id,
      createdAt: new Date().toISOString(),
    };
    const updated = [...allProducts, newProduct];
    setAllProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    const updated = allProducts.map(p => p.id === id ? { ...p, ...updates } : p);
    setAllProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  const deleteProduct = (id) => {
    const updated = allProducts.filter(p => p.id !== id);
    setAllProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  const getProduct = (id) => {
    return products.find(p => p.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
};