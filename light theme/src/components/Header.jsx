import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Menu, 
  Settings, 
  Bell,
  CircleUserRound,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/users': return 'Users';
      case '/products': return 'Products';
      case '/categories': return 'Categories';
      case '/assignments': return 'Assignments';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm transition-colors duration-300">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-sm text-gray-600 mt-0.5">Welcome Back, {user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
              <span className="text-sm text-gray-700 truncate max-w-40">{user?.email}</span>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center shadow-sm shrink-0">
                <CircleUserRound className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;