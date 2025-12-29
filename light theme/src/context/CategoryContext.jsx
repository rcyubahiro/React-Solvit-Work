import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CategoryContext = createContext();

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within CategoryProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [allCategories, setAllCategories] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem('categories');
    if (stored) {
      setAllCategories(JSON.parse(stored));
    } else {
      // Initialize with sample data
      const initialCategories = [
        { id: '1', name: 'Laptops', description: 'Portable computers', productCount: 2, userId: 'default', createdAt: '2024-12-01' },
        { id: '2', name: 'Mobile', description: 'Smartphones and tablets', productCount: 1, userId: 'default', createdAt: '2024-12-02' },
        { id: '3', name: 'Accessories', description: 'Computer accessories', productCount: 0, userId: 'default', createdAt: '2024-12-03' },
      ];
      localStorage.setItem('categories', JSON.stringify(initialCategories));
      setAllCategories(initialCategories);
    }
  }, []);

  // Admins see all categories, regular users see only their own
  const categories = user
    ? (user.role === 'admin' ? allCategories : allCategories.filter(c => c.userId === user.id))
    : [];

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
      productCount: 0,
      userId: user?.id,
      createdAt: new Date().toISOString(),
    };
    const updated = [...allCategories, newCategory];
    setAllCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
    return newCategory;
  };

  const updateCategory = (id, updates) => {
    const updated = allCategories.map(c => c.id === id ? { ...c, ...updates } : c);
    setAllCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
  };

  const deleteCategory = (id) => {
    const updated = allCategories.filter(c => c.id !== id);
    setAllCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
  };

  const getCategory = (id) => {
    return categories.find(c => c.id === id);
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory, getCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};