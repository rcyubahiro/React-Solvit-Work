import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Shell = ({ sidebarOpen, toggleSidebar, children }) => {
  return (
    <div className="flex h-screen bg-[#fcfdff] overflow-hidden transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f6f8fb]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Shell;
