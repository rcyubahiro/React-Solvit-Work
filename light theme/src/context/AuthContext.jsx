import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Update lastLogin timestamp for this user
      const updatedUsers = users.map(u =>
        u.id === foundUser.id ? { ...u, lastLogin: new Date().toISOString() } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      return { success: false, message: 'Email already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: users.length === 0 ? 'admin' : 'staff', // First user is admin
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      lastLogout: null,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const logout = () => {
    // Persist lastLogout for current user
    if (user?.id) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updated = users.map(u =>
        u.id === user.id ? { ...u, lastLogout: new Date().toISOString() } : u
      );
      localStorage.setItem('users', JSON.stringify(updated));
    }

    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};