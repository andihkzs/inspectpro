/**
 * Main dashboard page component
 * Displays overview statistics, recent activity, and navigation options
 */

import React from 'react';
import DashboardOverview from '../components/Dashboard/DashboardOverview';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, Demo User
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your inspections today
        </p>
      </div>

      <DashboardOverview />
    </div>
  );
};

export default Dashboard;