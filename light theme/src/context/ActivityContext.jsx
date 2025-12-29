import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ActivityContext = createContext();

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within ActivityProvider');
  }
  return context;
};

export const ActivityProvider = ({ children }) => {
  const [allActivities, setAllActivities] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem('activities');
    if (stored) {
      setAllActivities(JSON.parse(stored));
    }
  }, []);

  // Filter activities by current user - Admins see all activities
  const activities = user 
    ? (user.role === 'admin' ? allActivities : allActivities.filter(a => a.userId === user.id))
    : [];

  const logActivity = (activity) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
      userId: user?.id,
      timestamp: new Date().toISOString(),
    };
    const updated = [...allActivities, newActivity];
    setAllActivities(updated);
    localStorage.setItem('activities', JSON.stringify(updated));
    return newActivity;
  };

  return (
    <ActivityContext.Provider value={{ activities, logActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
