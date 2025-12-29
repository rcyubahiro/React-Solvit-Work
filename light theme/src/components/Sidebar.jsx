import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Layers,
  LogOut,
  Box,
  ClipboardList
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useUsers } from '../context/UserContext';
import { useProducts } from '../context/ProductContext';
import { useAssignments } from '../context/AssignmentContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout, isAdmin, user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const { users } = useUsers();
  const { products } = useProducts();
  const { assignments } = useAssignments();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', count: null, adminOnly: false },
    { name: 'Users', icon: Users, path: '/users', count: users.length, adminOnly: true },
    { name: 'Products', icon: Package, path: '/products', count: products.length, adminOnly: false },
    { name: 'Assignments', icon: ClipboardList, path: '/assignments', count: assignments.length, adminOnly: false },
    { name: 'Categories', icon: Layers, path: '/categories', count: null, adminOnly: false },
  ];

  const handleLogout = () => {
    logout();
    showNotification('Successfully logged out. See you soon!', 'success');
    navigate('/login');
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200
        transform transition-all duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
              <Box className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">iHUZA</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Inventory</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            if (item.adminOnly && !isAdmin) return null;

            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-lg
                  transition-colors duration-150
                  ${isActive
                    ? 'bg-primary-50 text-primary-600 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.count !== null && (
                  <span className={`
                    text-xs px-2 py-0.5 rounded-full font-medium
                    ${isActive 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200 space-y-4">
          {/* User Info */}
          {user && (
            <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Logged In As</p>
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
              <p className="text-xs text-gray-600 mt-1">{user.role === 'admin' ? 'Admin' : 'Staff'}</p>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg w-full transition-colors duration-150"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;