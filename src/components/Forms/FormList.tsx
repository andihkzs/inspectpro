/**
 * Form list component showing all available forms with filtering and actions
 * Displays form cards with status, actions, and quick access options
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InspectionForm } from '../../types';
import { 
  DocumentIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  ShareIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface FormListProps {
  forms: InspectionForm[];
  onDeleteForm: (id: string) => void;
  onSaveForm?: (form: InspectionForm) => void;
}

const FormList: React.FC<FormListProps> = ({ forms, onDeleteForm, onSaveForm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [filterIndustry, setFilterIndustry] = useState('all');

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && form.isPublished) ||
                         (filterStatus === 'draft' && !form.isPublished);
    const matchesIndustry = filterIndustry === 'all' || form.industry === filterIndustry;

    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const industries = Array.from(new Set(forms.map(form => form.industry)));

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inspection Forms</h1>
          <p className="text-gray-600">Create and manage your inspection forms</p>
        </div>
        <Link
          to="/forms/create"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Create Form</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredForms.map((form) => (
          <div key={form.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DocumentIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 truncate">{form.title}</h3>
                  <p className="text-sm text-gray-500">{form.industry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {form.isPublished ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                ) : (
                  <ClockIcon className="w-5 h-5 text-yellow-600" />
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

            <div className="mb-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                {form.description || 'No description provided'}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{form.sections.length} sections</span>
              <span>{form.sections.reduce((acc, section) => acc + section.fields.length, 0)} fields</span>
              <span>v{form.version}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Created {formatDate(form.createdAt)}</span>
              <span>Updated {formatDate(form.updatedAt)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link
                  to={`/forms/${form.id}/preview`}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Preview"
                >
                  <EyeIcon className="w-4 h-4" />
                </Link>
                <Link
                  to={`/forms/${form.id}/edit`}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <PencilIcon className="w-4 h-4" />
                </Link>
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Share"
                >
                  <ShareIcon className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => onDeleteForm(form.id)}
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredForms.length === 0 && (
        <div className="text-center py-12">
          <DocumentIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No forms found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' || filterIndustry !== 'all' 
              ? 'Try adjusting your filters or search term'
              : 'Create your first inspection form to get started'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && filterIndustry === 'all' && (
            <Link
              to="/forms/create"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Create Your First Form</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default FormList;