/**
 * Dashboard overview component showing key metrics and recent activity
 * Displays inspection statistics, completion rates, and performance analytics
 */

import React from 'react';
import { useState } from 'react';
import { 
  ChartBarIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const DashboardOverview: React.FC = () => {
  const [inspectionFilter, setInspectionFilter] = useState<'all' | 'new' | 'in_progress' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    {
      name: 'Total Inspections',
      value: '147',
      change: '+12%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Completed Today',
      value: '23',
      change: '+5.4%',
      changeType: 'increase',
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Pending',
      value: '8',
      change: '-2.1%',
      changeType: 'decrease',
      icon: ClockIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Overdue',
      value: '3',
      change: '-12%',
      changeType: 'decrease',
      icon: ExclamationTriangleIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  // Mock inspection data
  const inspections = [
    {
      id: 1,
      title: 'Apartment Cleaning Inspection',
      location: '123 Main St, Apt 5B',
      inspector: 'John Doe',
      status: 'new',
      priority: 'medium',
      dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
      createdAt: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 2,
      title: 'Restaurant Safety Check',
      location: 'Downtown Bistro, 456 Oak Ave',
      inspector: 'Sarah Wilson',
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date(Date.now() + 86400000), // 1 day from now
      createdAt: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: 3,
      title: 'Fire Safety Inspection',
      location: 'Office Building, 789 Pine St',
      inspector: 'Mike Johnson',
      status: 'completed',
      priority: 'medium',
      dueDate: new Date(Date.now() - 86400000), // 1 day ago
      createdAt: new Date(Date.now() - 86400000 * 3) // 3 days ago
    },
    {
      id: 4,
      title: 'HVAC System Check',
      location: 'Mall Complex, 321 Elm Dr',
      inspector: 'Lisa Chen',
      status: 'new',
      priority: 'low',
      dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
      createdAt: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 5,
      title: 'Elevator Safety Inspection',
      location: 'High-rise Tower, 654 Cedar Blvd',
      inspector: 'Tom Brown',
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
      createdAt: new Date(Date.now() - 14400000) // 4 hours ago
    }
  ];

  const filteredInspections = inspections.filter(inspection => {
    const matchesFilter = inspectionFilter === 'all' || inspection.status === inspectionFilter;
    const matchesSearch = inspection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.inspector.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getFilterCounts = () => {
    return {
      all: inspections.length,
      new: inspections.filter(i => i.status === 'new').length,
      in_progress: inspections.filter(i => i.status === 'in_progress').length,
      completed: inspections.filter(i => i.status === 'completed').length
    };
  };

  const filterCounts = getFilterCounts();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      stat.changeType === 'increase'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspection List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Inspection List</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search inspections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div className="px-6 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-1">
            <FunnelIcon className="w-4 h-4 text-gray-500 mr-2" />
            {[
              { key: 'all', label: 'All', count: filterCounts.all },
              { key: 'new', label: 'New Job Order', count: filterCounts.new },
              { key: 'in_progress', label: 'Under Process', count: filterCounts.in_progress },
              { key: 'completed', label: 'Finished', count: filterCounts.completed }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setInspectionFilter(filter.key as any)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  inspectionFilter === filter.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          {filteredInspections.length > 0 ? (
            <div className="space-y-4">
              {filteredInspections.map((inspection) => (
                <div key={inspection.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-gray-900">{inspection.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inspection.status)}`}>
                        {inspection.status === 'new' ? 'New Job Order' :
                         inspection.status === 'in_progress' ? 'Under Process' : 'Finished'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(inspection.priority)}`}>
                        {inspection.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      {inspection.status !== 'completed' && (
                        <button
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="mt-1">{inspection.location}</p>
                    </div>
                    <div>
                      <span className="font-medium">Inspector:</span>
                      <p className="mt-1">{inspection.inspector}</p>
                    </div>
                    <div>
                      <span className="font-medium">Due Date:</span>
                      <p className={`mt-1 ${inspection.dueDate < new Date() ? 'text-red-600 font-medium' : ''}`}>
                        {formatDate(inspection.dueDate)}
                        {inspection.dueDate < new Date() && ' (Overdue)'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    Created: {formatDate(inspection.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No inspections found</h3>
              <p className="text-gray-600">
                {searchTerm || inspectionFilter !== 'all' 
                  ? 'Try adjusting your filters or search term'
                  : 'No inspections available at the moment'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;