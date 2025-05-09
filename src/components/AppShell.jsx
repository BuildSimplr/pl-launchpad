import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Target, ListTodo, FileText, LogOut } from 'lucide-react';

const AppShell = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'OKRs', path: '/app/okr', icon: <Target size={18} /> },
    { name: 'Backlog', path: '/app/backlog', icon: <ListTodo size={18} /> },
    { name: 'Meeting Notes', path: '/app/notes', icon: <FileText size={18} /> }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    onLogout(); // Only clears auth, not data
  };  

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-between items-center bg-[#1e2d26] text-white px-4 py-3">
        <h1 className="text-xl font-bold">PM Lite</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block bg-[#1e2d26] text-white w-full md:w-64 px-4 py-6 space-y-4`}
      >
        <h1 className="text-2xl font-bold mb-6">PM Lite</h1>
        <nav className="space-y-2">
          {navItems.map(({ name, path, icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)} // close menu on mobile
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isActive(path)
                  ? 'bg-green-700 text-white'
                  : 'hover:bg-green-800 hover:text-white text-green-300'
              }`}
            >
              {icon}
              {name}
            </Link>
          ))}
        </nav>

        <div className="mt-10 border-t border-green-900 pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-300 hover:text-white transition"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;


