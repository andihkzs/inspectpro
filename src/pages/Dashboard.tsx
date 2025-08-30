/**
 * Main dashboard page component with simple form table
 * Shows app name, create button, and forms table with actions
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formService } from '../services/formService';
import { isSupabaseConfigured } from '../lib/supabase';
import { InspectionForm } from '../types';
import { 
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const [forms, setForms] = useState<InspectionForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [columnWidths, setColumnWidths] = useState({
    name: 300,
    industry: 150,
    status: 120,
    sections: 100,
    fields: 100,
    updated: 120,
    actions: 100
  });
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  useEffect(() => {
    // Check Supabase connection status
    setSupabaseConnected(isSupabaseConfigured());
    loadForms();
  }, []);

  const handleMouseDown = (e: React.MouseEvent, columnKey: string) => {
    console.log('Mouse down on column:', columnKey);
    setIsResizing(columnKey);
    setStartX(e.clientX);
    setStartWidth(columnWidths[columnKey as keyof typeof columnWidths]);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    e.preventDefault();
    
    const diff = e.clientX - startX;
    const newWidth = Math.max(80, startWidth + diff); // Minimum width of 80px
    console.log('Resizing column:', isResizing, 'to width:', newWidth);
    
    setColumnWidths(prev => ({
      ...prev,
      [isResizing]: newWidth
    }));
  }, [isResizing, startX, startWidth]);

  const handleMouseUp = React.useCallback(() => {
    console.log('Mouse up, stopping resize');
    setIsResizing(null);
    setStartX(0);
    setStartWidth(0);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      console.log('Added resize listeners for column:', isResizing);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const loadForms = async () => {
    try {
      console.log('🏠 Dashboard: Loading forms...');
      setLoading(true);
      setError(null);
      const loadedForms = await formService.getAllForms();
      console.log('🏠 Dashboard: Loaded forms:', loadedForms);
      console.log('🏠 Dashboard: Number of forms loaded:', loadedForms.length);
      setForms(loadedForms);
    } catch (err) {
      console.error('🏠 Dashboard: Error loading forms:', err);
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
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${supabaseConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-sm text-gray-600">
              {supabaseConnected ? 'Connected to Supabase' : 'Using Local Storage'}
            </span>
          </div>
          <Link
            to="/forms/create"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Create New Form</span>
          </Link>
        </div>
      </div>

      {/* Supabase Connection Notice */}
      {!supabaseConnected && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">Database Connection</h3>
              <p className="text-sm text-yellow-700 mt-1">
                You're currently using local storage. To save forms permanently and share them across devices, 
                connect to Supabase using the "Connect to Supabase" button in the top right corner.
              </p>
            </div>
            <button className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors text-sm">
              <LinkIcon className="w-4 h-4" />
              <span>Connect to Supabase</span>
            </button>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Forms Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
        <div className="relative">
        {forms.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200" style={{ tableLayout: 'fixed' }}>
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                  style={{ width: `${columnWidths.name}px` }}
                >
                  Form Name
                  <div
                    className="absolute top-0 right-0 w-2 h-full bg-gray-400 hover:bg-blue-500 cursor-col-resize transition-colors z-10"
                    onMouseDown={(e) => handleMouseDown(e, 'name')}
                    title="Drag to resize column"
                  />
                </th>
                <th 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell relative"
                  style={{ width: `${columnWidths.industry}px` }}
                >
                  Industry
                  <div
                    className="absolute top-0 right-0 w-2 h-full bg-gray-400 hover:bg-blue-500 cursor-col-resize transition-colors z-10"
                    onMouseDown={(e) => handleMouseDown(e, 'industry')}
                    title="Drag to resize column"
                  />
                </th>
                <th 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                  style={{ width: `${columnWidths.status}px` }}
                >
                  Status
                  <div
                    className="absolute top-0 right-0 w-2 h-full bg-gray-400 hover:bg-blue-500 cursor-col-resize transition-colors z-10"
                    onMouseDown={(e) => handleMouseDown(e, 'status')}
                    title="Drag to resize column"
                  />
                </th>
                <th 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell relative"
                  style={{ width: `${columnWidths.sections}px` }}
                >
                  Sections
                  <div
                    className="absolute top-0 right-0 w-2 h-full bg-gray-400 hover:bg-blue-500 cursor-col-resize transition-colors z-10"
                    onMouseDown={(e) => handleMouseDown(e, 'sections')}
                    title="Drag to resize column"
                  />
                </th>
                <th 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell relative"
                  style={{ width: `${columnWidths.fields}px` }}
                >
                  Fields
                  <div
                    className="absolute top-0 right-0 w-2 h-full bg-gray-400 hover:bg-blue-500 cursor-col-resize transition-colors z-10"
                    onMouseDown={(e) => handleMouseDown(e, 'fields')}
                    title="Drag to resize column"
                  />
                </th>
                <th 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell relative"
                  style={{ width: `${columnWidths.updated}px` }}
                >
                  Updated
                  <div
                    className="absolute top-0 right-0 w-2 h-full bg-gray-400 hover:bg-blue-500 cursor-col-resize transition-colors z-10"
                    onMouseDown={(e) => handleMouseDown(e, 'updated')}
                    title="Drag to resize column"
                  />
                </th>
                <th 
                  className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                  style={{ width: `${columnWidths.actions}px` }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {forms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4" style={{ width: `${columnWidths.name}px` }}>
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
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell" style={{ width: `${columnWidths.industry}px` }}>
                    <span className="text-sm text-gray-900 capitalize">
                      {form.industry.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap" style={{ width: `${columnWidths.status}px` }}>
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
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell" style={{ width: `${columnWidths.sections}px` }}>
                    {form.sections.length}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell" style={{ width: `${columnWidths.fields}px` }}>
                    {form.sections.reduce((acc, section) => acc + section.fields.length, 0)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell" style={{ width: `${columnWidths.updated}px` }}>
                    {formatDate(form.updatedAt)}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium" style={{ width: `${columnWidths.actions}px` }}>
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
            <p className="text-gray-400 text-sm">Click "Create New Form" above to get started</p>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;