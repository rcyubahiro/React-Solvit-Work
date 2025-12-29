import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AssignmentContext = createContext();

export const useAssignments = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error('useAssignments must be used within AssignmentProvider');
  }
  return context;
};

export const AssignmentProvider = ({ children }) => {
  const [allAssignments, setAllAssignments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem('assignments');
    if (stored) {
      setAllAssignments(JSON.parse(stored));
    } else {
      // Initialize with sample data
      const initialAssignments = [
        { id: '1', productId: '1', productName: 'MacBook Pro 16"', userId: '2', userName: 'Sarah Johnson', ownerId: 'default', assignedAt: '2024-12-03T10:00:00.000Z', status: 'active' },
        { id: '2', productId: '2', productName: 'Dell ThinkPad X1 Carbon', userId: '3', userName: 'Michael Brown', ownerId: 'default', assignedAt: '2024-12-02T10:00:00.000Z', status: 'active' },
        { id: '3', productId: '3', productName: 'Apple MacBook Air M2', userId: '4', userName: 'Emily Davis', ownerId: 'default', assignedAt: '2024-12-01T10:00:00.000Z', status: 'active' },
        { id: '4', productId: '4', productName: 'HP Spectre x360', userId: '5', userName: 'David Wilson', ownerId: 'default', assignedAt: '2024-01-16T10:00:00.000Z', status: 'maintenance' },
        { id: '5', productId: '5', productName: 'Dell XPS 15', userId: '6', userName: 'Lisa Anderson', ownerId: 'default', assignedAt: '2024-01-10T10:00:00.000Z', status: 'active' },
        { id: '6', productId: '6', productName: 'iPhone 14 Pro', userId: '7', userName: 'Robert Taylor', ownerId: 'default', assignedAt: '2024-01-08T10:00:00.000Z', status: 'active' },
        { id: '7', productId: '7', productName: 'iPad Pro 12.9"', userId: '8', userName: 'Jennifer Miller', ownerId: 'default', assignedAt: '2024-01-05T10:00:00.000Z', status: 'returned' },
        { id: '8', productId: '8', productName: 'Samsung Galaxy S24', userId: '9', userName: 'Christopher Lee', ownerId: 'default', assignedAt: '2024-01-03T10:00:00.000Z', status: 'active' },
        { id: '9', productId: '9', productName: 'Surface Laptop 5', userId: '10', userName: 'Amanda White', ownerId: 'default', assignedAt: '2024-01-01T10:00:00.000Z', status: 'active' },
        { id: '10', productId: '10', productName: 'ThinkPad T14', userId: '2', userName: 'Sarah Johnson', ownerId: 'default', assignedAt: '2023-12-28T10:00:00.000Z', status: 'active' },
      ];
      localStorage.setItem('assignments', JSON.stringify(initialAssignments));
      setAllAssignments(initialAssignments);
    }
  }, []);

  // Admins see all assignments, regular users see assignments they own or are assigned to
  const assignments = user 
    ? (user.role === 'admin' 
      ? allAssignments 
      : allAssignments.filter(a => a.ownerId === user.id || a.userId === user.id))
    : [];

  const addAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: Date.now().toString(),
      ownerId: user?.id,
      assignedAt: new Date().toISOString(),
      status: 'active',
    };
    const updated = [...allAssignments, newAssignment];
    setAllAssignments(updated);
    localStorage.setItem('assignments', JSON.stringify(updated));
    return newAssignment;
  };

  const updateAssignment = (id, updates) => {
    const updated = allAssignments.map(a => a.id === id ? { ...a, ...updates } : a);
    setAllAssignments(updated);
    localStorage.setItem('assignments', JSON.stringify(updated));
  };

  const deleteAssignment = (id) => {
    const updated = allAssignments.filter(a => a.id !== id);
    setAllAssignments(updated);
    localStorage.setItem('assignments', JSON.stringify(updated));
  };

  const getAssignment = (id) => {
    return assignments.find(a => a.id === id);
  };

  return (
    <AssignmentContext.Provider value={{ assignments, addAssignment, updateAssignment, deleteAssignment, getAssignment }}>
      {children}
    </AssignmentContext.Provider>
  );
};
