import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CategoryProvider } from './context/CategoryContext';
import { UserProvider } from './context/UserContext';
import { AssignmentProvider } from './context/AssignmentContext';
import { ActivityProvider } from './context/ActivityContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Shell from './components/Shell';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Users from './pages/Users';
import Assignments from './pages/Assignments';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <ProductProvider>
              <CategoryProvider>
                <UserProvider>
                  <AssignmentProvider>
                    <ActivityProvider>
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route
                          path="/*"
                          element={
                            <ProtectedRoute>
                              <Shell sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                                    <Routes>
                                      <Route path="/" element={<Dashboard />} />
                                      <Route path="/products" element={<Products />} />
                                      <Route path="/categories" element={<Categories />} />
                                      <Route path="/assignments" element={<Assignments />} />
                                      <Route 
                                        path="/users" 
                                        element={
                                          <ProtectedRoute adminOnly>
                                            <Users />
                                          </ProtectedRoute>
                                        } 
                                      />
                                      <Route path="*" element={<Navigate to="/" replace />} />
                                    </Routes>
                              </Shell>
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </ActivityProvider>
                  </AssignmentProvider>
                </UserProvider>
              </CategoryProvider>
            </ProductProvider>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;