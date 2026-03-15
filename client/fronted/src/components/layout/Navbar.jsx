import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiTag, FiBriefcase, FiGithub } from 'react-icons/fi';

export const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', name: 'Home', icon: FiHome },
    { path: '/category', name: 'Category', icon: FiTag },
    { path: '/proposal', name: 'Proposal', icon: FiBriefcase },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🌱</span>
              <span className="font-bold text-gray-800 text-lg">EcoAI</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map(({ path, name, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span>{name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/JaisGautam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiGithub className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          {navItems.map(({ path, name, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center px-3 py-1 rounded-md text-xs ${
                location.pathname === path
                  ? 'text-green-600'
                  : 'text-gray-500'
              }`}
            >
              <Icon className="text-xl" />
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};