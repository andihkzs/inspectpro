/**
 * Form detail sidebar component for viewing form information
 * Shows comprehensive form details when a row is clicked
 */

import React, { useState } from 'react';
import { InspectionForm } from '../../types';
import { 
  XMarkIcon,
  DocumentIcon,
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
  CalendarIcon,
  CogIcon,
  EyeIcon,
  PencilIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface FormDetailSidebarProps {
  form: InspectionForm | null;
  isOpen: boolean;
  onClose: () => void;
}

const FormDetailSidebar: React.FC<FormDetailSidebarProps> = ({ form, isOpen, onClose }) => {
  const [sidebarWidth, setSidebarWidth] = useState(() => 
    Math.min(400, window.innerWidth * 0.3)
  );
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    
    const newWidth = window.innerWidth - e.clientX;
    const minWidth = 300;
    const maxWidth = Math.min(800, window.innerWidth * 0.8);
    
    setSidebarWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
  }, [isResizing]);

  const handleMouseUp = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Handle window resize
  React.useEffect(() => {
    const handleWindowResize = () => {
      const maxWidth = Math.min(800, window.innerWidth * 0.8);
      const minWidth = 300;
      setSidebarWidth(prevWidth => Math.max(minWidth, Math.min(maxWidth, prevWidth)));
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  if (!form) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const totalFields = form.sections.reduce((acc, section) => acc + section.fields.length, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ width: `${sidebarWidth}px` }}>
        {/* Resize Handle */}
        <div
          className={`absolute top-0 left-0 w-1 h-full bg-transparent hover:bg-blue-200 cursor-col-resize z-10 transition-colors ${
            isResizing ? 'bg-blue-300' : ''
          }`}
          onMouseDown={handleMouseDown}
          title="Drag to resize sidebar"
        />
        
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Form Details</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <DocumentIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{form.title}</h3>
                <p className="text-blue-100 text-sm">
                  {form.description || 'No description provided'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Status and Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  {form.isPublished ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  ) : (
                    <ClockIcon className="w-5 h-5 text-yellow-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700">Status</span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  form.isPublished 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {form.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Industry</div>
                <div className="text-lg font-semibold text-gray-900 capitalize">
                  {form.industry.replace('-', ' ')}
                </div>
              </div>
            </div>

            {/* Form Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{form.sections.length}</div>
                <div className="text-sm text-gray-600">Sections</div>
              </div>
              <div className="text-center bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">{totalFields}</div>
                <div className="text-sm text-gray-600">Fields</div>
              </div>
              <div className="text-center bg-purple-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600">v{form.version}</div>
                <div className="text-sm text-gray-600">Version</div>
              </div>
            </div>

            {/* Form Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Information</h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <UserIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Created by</div>
                    <div className="text-sm text-gray-600">{form.createdBy}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Created</div>
                    <div className="text-sm text-gray-600">{formatDate(form.createdAt)}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Last Updated</div>
                    <div className="text-sm text-gray-600">{formatDate(form.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Settings */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Settings</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Allow Offline Use</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    form.settings.allowOffline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {form.settings.allowOffline ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Require Location</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    form.settings.requireLocation ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {form.settings.requireLocation ? 'Required' : 'Optional'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Require Signature</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    form.settings.requireSignature ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {form.settings.requireSignature ? 'Required' : 'Optional'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Auto Save</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    form.settings.autoSave ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {form.settings.autoSave ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            {/* Sections Overview */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Sections</h4>
              
              <div className="space-y-3">
                {form.sections.map((section, index) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <h5 className="font-medium text-gray-900">{section.title}</h5>
                    </div>
                    
                    {section.description && (
                      <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{section.fields.length} fields</span>
                      <span>•</span>
                      <span>Order: {section.order + 1}</span>
                    </div>
                    
                    {/* Field Types Summary */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {Array.from(new Set(section.fields.map(field => field.type))).map(type => (
                        <span 
                          key={type} 
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="border-t border-gray-200 p-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <EyeIcon className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <ShareIcon className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
            
            <Link
              to={`/forms/${form.id}/edit`}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
              <span>Edit Form</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormDetailSidebar;