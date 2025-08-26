/**
 * Main dashboard page component with simple form table
 * Shows app name, create button, and forms table with actions
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formService } from '../services/formService';
import { InspectionForm } from '../types';
import { 
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const [forms, setForms] = useState<InspectionForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedForms = await formService.getAllForms();
      setForms(loadedForms);
    } catch (err) {
      console.error('Error loading forms:', err);
      setError('Failed to load forms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteForm = async (id: string) => {
    if (!confirm('Are you sure you want to delete this form?')) return;
    
    try {
      await formService.deleteForm(id);
      setForms(forms.filter(form => form.id !== id));
    } catch (err) {
      console.error('Error deleting form:', err);
      setError('Failed to delete form. Please try again.');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with App Name and Create Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">InspectPro</h1>
        <Link
          to="/forms/create"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Create New Form</span>
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Forms Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
        {forms.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Industry
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Sections
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Fields
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Updated
                </th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20 sm:w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {forms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs sm:max-w-none">
                        {form.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs sm:max-w-none">
                        {form.description || 'No description'}
                      </div>
                      {/* Show industry on mobile */}
                      <div className="text-xs text-gray-400 mt-1 sm:hidden capitalize">
                        {form.industry.replace('-', ' ')}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="text-sm text-gray-900 capitalize">
                      {form.industry.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {form.isPublished ? (
                        <>
                          <CheckCircleIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-green-800 bg-green-100 px-2 py-1 rounded-full">
                            Published
                          </span>
                        </>
                      ) : (
                        <>
                          <ClockIcon className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full">
                            Draft
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                    {form.sections.length}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                    {form.sections.reduce((acc, section) => acc + section.fields.length, 0)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                    {formatDate(form.updatedAt)}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium w-20 sm:w-24">
                    <div className="flex items-center justify-end space-x-1">
                      <Link
                        to={`/forms/${form.id}/edit`}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="w-5 h-5 flex-shrink-0" />
                      </Link>
                      <button
                        onClick={() => handleDeleteForm(form.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="w-5 h-5 flex-shrink-0" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No forms created yet</p>
            <Link
              to="/forms/create"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Create Your First Form</span>
            </Link>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;