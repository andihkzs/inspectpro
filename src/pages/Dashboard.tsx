/**
 * Main dashboard page component showing forms overview and quick access
 * Displays saved forms with statistics and recent activity
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formService } from '../services/formService';
import { InspectionForm } from '../types';
import { 
  ChartBarIcon, 
  DocumentPlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentIcon,
  SparklesIcon,
  PlusIcon
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Calculate statistics
  const stats = {
    totalForms: forms.length,
    publishedForms: forms.filter(f => f.isPublished).length,
    draftForms: forms.filter(f => !f.isPublished).length,
    totalSections: forms.reduce((acc, form) => acc + form.sections.length, 0),
    totalFields: forms.reduce((acc, form) => 
      acc + form.sections.reduce((secAcc, section) => secAcc + section.fields.length, 0), 0
    ),
    recentForms: forms.slice(0, 5) // Most recent 5 forms
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Error State */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DocumentIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Forms</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalForms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{stats.publishedForms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draftForms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sections</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSections}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <DocumentPlusIcon className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Fields</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalFields}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Forms */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Forms</h3>
              <Link
                to="/forms"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>

            <div className="p-6">
              {stats.recentForms.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentForms.map((form) => (
                    <div key={form.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <DocumentIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{form.title}</h4>
                            <p className="text-sm text-gray-500">{form.industry}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {form.isPublished ? (
                            <CheckCircleIcon className="w-4 h-4 text-green-600" />
                          ) : (
                            <ClockIcon className="w-4 h-4 text-yellow-600" />
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            form.isPublished 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {form.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>{form.sections.length} sections, {form.sections.reduce((acc, section) => acc + section.fields.length, 0)} fields</span>
                        <span>{formatDate(form.updatedAt)}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 line-clamp-1 flex-1">
                          {form.description || 'No description'}
                        </p>
                        <div className="flex items-center space-x-2 ml-4">
                          <Link
                            to={`/forms/${form.id}/preview`}
                            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                            title="Preview"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/forms/${form.id}/edit`}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                            title="Edit"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteForm(form.id)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DocumentIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No forms yet</h3>
                  <p className="text-gray-600 mb-4">Create your first inspection form to get started</p>
                  <Link
                    to="/forms/create"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Create Form</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Create New */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/forms/create"
                className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="p-2 bg-blue-600 rounded-lg">
                  <DocumentPlusIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Create Form</h4>
                  <p className="text-sm text-blue-700">Build a new inspection form</p>
                </div>
              </Link>

              <div className="flex items-center space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-purple-900">AI Generator</h4>
                  <p className="text-sm text-purple-700">Use AI to create forms</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {forms.slice(0, 3).map((form, index) => (
                <div key={form.id} className="flex items-center space-x-3 py-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">
                      {index === 0 ? 'Updated' : 'Created'} "{form.title}"
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(form.updatedAt)}
                    </p>
                  </div>
                </div>
              ))}
              {forms.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No recent activity
                </p>
              )}
            </div>
          </div>

          {/* Form Statistics */}
          {forms.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Insights</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Sections</span>
                  <span className="font-medium text-gray-900">
                    {(stats.totalSections / stats.totalForms).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Fields</span>
                  <span className="font-medium text-gray-900">
                    {(stats.totalFields / stats.totalForms).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Published Rate</span>
                  <span className="font-medium text-gray-900">
                    {((stats.publishedForms / stats.totalForms) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;