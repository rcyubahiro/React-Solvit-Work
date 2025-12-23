import React from 'react';
import { 
  Laptop2Icon as LayoutDashboard, 
  Users, 
  Package, 
  ClipboardList, 
  Layers,
  LogOut,
  Box
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name:  'Dashboard', icon: LayoutDashboard, count: null, active: true },
    { name:  'Users', icon: Users, count: 116, active: false },
    { name: 'Products', icon: Package, count: 100, active: false },
    { name: 'Assignments', icon: ClipboardList, count: 10, active: false },
    { name: 'Categories', icon: Layers, count:  null, active: false },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className=" bg-blue-600 w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
              <Package className="w-6 h-6 text-white" />
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
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href="#"
                className={`
                  flex items-center justify-between px-4 py-3 rounded-lg
                  transition-colors duration-150 hover:bg-blue-200 
                  ${item.active 
                    ? 'bg-primary-50 text-primary-600 font-medium' 
                    :  'text-black-700 hover:bg-green-5000 hover:text-white-900'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.count !== null && (
                  <span className={`text-sm px-2 py-0.5 rounded ${
                    item.active 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-500 bg-gray-100'
                  }`}>
                    {item.count}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-500 rounded-lg w-full transition-colors duration-150">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;