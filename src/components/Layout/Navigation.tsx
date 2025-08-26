/**
 * Navigation component for the main application header
 * Provides top-level navigation and branding
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  DocumentIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold text-gray-900">InspectPro</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/forms/create"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/forms/create')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <DocumentIcon className="w-4 h-4" />
              <span>Create Form</span>
            </Link>

            <Link
              to="/help"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/help')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <QuestionMarkCircleIcon className="w-4 h-4" />
              <span>Help</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;