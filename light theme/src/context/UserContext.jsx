import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('users');
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, []);

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastLogin: null,
      lastLogout: null,
    };
    const updated = [...users, newUser];
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
    return newUser;
  };

  const updateUser = (id, updates) => {
    const updated = users.map(u => u.id === id ? { ...u, ...updates } : u);
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };

  const deleteUser = (id) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };

  const getUser = (id) => {
    return users.find(u => u.id === id);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};