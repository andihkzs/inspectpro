/**
 * Main form builder component with drag-and-drop functionality
 * Handles form creation, field management, and section organization
 */

import React, { useState } from 'react';
import { useFormBuilder } from '../../hooks/useFormBuilder';
import { FormField, FormSection, AITemplate } from '../../types';
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon,
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
  StarIcon,
  CheckCircleIcon,
  Bars3Icon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface FormBuilderProps {
  initialTemplate?: AITemplate;
  existingForm?: InspectionForm;
  onSave: (form: any) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ initialTemplate, existingForm, onSave }) => {
  const {
    form,
    setForm,
    activeSections,
    setActiveSections,
    addSection,
    addField,
    updateField,
    deleteField,
    publishForm
  } = useFormBuilder();

  const [showFieldPalette, setShowFieldPalette] = useState(false);
  const [editingField, setEditingField] = useState<{ sectionId: string; fieldId: string } | null>(null);

  const toggleSection = (sectionId: string) => {
    setActiveSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const expandAll = () => {
    if (form) {
      setActiveSections(form.sections.map(section => section.id));
    }
  };

  const collapseAll = () => {
    setActiveSections([]);
  };

  // Initialize form with template if provided
  React.useEffect(() => {
    if (initialTemplate && existingForm) {
      console.warn('Both initialTemplate and existingForm provided. Using existingForm.');
    }
    
    if (existingForm && !form) {
      setForm(existingForm);
      return;
    }
    
    if (initialTemplate && !form) {
      const newForm = {
        id: initialTemplate.id,
        title: initialTemplate.name,
        description: initialTemplate.description,
        industry: initialTemplate.industry,
        sections: initialTemplate.sections,
        createdBy: 'current-user',
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        isTemplate: false,
        isPublished: false,
        settings: {
          allowOffline: true,
          requireLocation: true,
          requireSignature: false,
          autoSave: true
        }
      };
      setForm(newForm);
    }

  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: PencilIcon, description: 'Single line text' },
    { type: 'textarea', label: 'Text Area', icon: DocumentIcon, description: 'Multi-line text' },
    { type: 'select', label: 'Dropdown', icon: Bars3Icon, description: 'Select from options' },
    { type: 'radio', label: 'Radio Button', icon: CheckCircleIcon, description: 'Single choice' },
    { type: 'checkbox', label: 'Checkbox', icon: CheckCircleIcon, description: 'Multiple choices' },
    { type: 'rating', label: 'Rating', icon: StarIcon, description: 'Star rating' },
    { type: 'photo', label: 'Photo', icon: PhotoIcon, description: 'Image capture' },
    { type: 'video', label: 'Video', icon: VideoCameraIcon, description: 'Video capture' },
    { type: 'signature', label: 'Signature', icon: PencilIcon, description: 'Digital signature' }
  ];

  const handleAddField = (sectionId: string, fieldType: string) => {
    const newField: Omit<FormField, 'id'> = {
      type: fieldType as any,
      label: `New ${fieldType} field`,
      required: false,
      ...(fieldType === 'select' || fieldType === 'radio' || fieldType === 'checkbox' 
        ? { options: ['Option 1', 'Option 2', 'Option 3'] } 
        : {}),
      ...(fieldType === 'rating' 
        ? { validation: { min: 1, max: 5 } } 
        : {})
    };

    addField(sectionId, newField);
    setShowFieldPalette(false);
  };

  const handleFieldEdit = (sectionId: string, fieldId: string, field: FormField) => {
    setEditingField({ sectionId, fieldId });
  };

  const handleFieldUpdate = (updates: Partial<FormField>) => {
    if (editingField) {
      updateField(editingField.sectionId, editingField.fieldId, updates);
      setEditingField(null);
    }
  };

  const renderFieldPreview = (field: FormField) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={field.placeholder || field.label}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled
          />
        );
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder || field.label}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            disabled
          />
        );
      case 'select':
        return (
          <select className="w-full p-2 border border-gray-300 rounded-md" disabled>
            <option>Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input type="radio" name={field.id} disabled />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input type="checkbox" disabled />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'rating':
        return (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} className="w-6 h-6 text-gray-300" />
            ))}
          </div>
        );
      case 'photo':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <PhotoIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Click to capture photo</p>
          </div>
        );
      case 'video':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <VideoCameraIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Click to record video</p>
          </div>
        );
      case 'signature':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <PencilIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Click to add signature</p>
          </div>
        );
      default:
        return <div className="p-2 bg-gray-100 rounded">Unknown field type</div>;
    }
  };

  if (!form) {
    return (
      <div className="text-center py-12">
        <DocumentIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No form selected. Create a new form or select a template.</p>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-6">
      <div className="space-y-6">
        {/* Top Actions and Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Actions</h3>
            <div className="flex space-x-3">
              <button
                onClick={() => onSave(form)}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={() => {
                  publishForm();
                  onSave(form);
                }}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Publish Form
              </button>
            </div>
          </div>

          {/* Form Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.settings.requireLocation}
                  onChange={(e) => setForm({
                    ...form,
                    settings: { ...form.settings, requireLocation: e.target.checked }
                  })}
                />
                <span className="text-sm text-gray-700">Require location</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.settings.requireSignature}
                  onChange={(e) => setForm({
                    ...form,
                    settings: { ...form.settings, requireSignature: e.target.checked }
                  })}
                />
                <span className="text-sm text-gray-700">Require signature</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.settings.allowOffline}
                  onChange={(e) => setForm({
                    ...form,
                    settings: { ...form.settings, allowOffline: e.target.checked }
                  })}
                />
                <span className="text-sm text-gray-700">Allow offline use</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section Controls */}
        {form.sections.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Section Controls</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={expandAll}
                  className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                >
                  <ChevronDownIcon className="w-4 h-4" />
                  <span>Expand All</span>
                </button>
                <button
                  onClick={collapseAll}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                >
                  <ChevronUpIcon className="w-4 h-4" />
                  <span>Collapse All</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Builder */}
        <div className="space-y-6">
          {/* Form Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="text-2xl font-bold text-gray-900 bg-transparent border-none focus:outline-none w-full"
              placeholder="Form Title"
            />
            <textarea
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-2 text-gray-600 bg-transparent border-none focus:outline-none w-full resize-none"
              placeholder="Form description..."
              rows={2}
            />
          </div>

          {/* Sections */}
          {form.sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {activeSections.includes(section.id) ? 'Collapse' : 'Expand'}
                </button>
              </div>

              {activeSections.includes(section.id) && (
                <div className="space-y-4">
                  {section.fields.map((field) => (
                    <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <label className="font-medium text-gray-900">{field.label}</label>
                          {field.required && (
                            <span className="text-red-500 text-sm">*</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleFieldEdit(section.id, field.id, field)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteField(section.id, field.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {renderFieldPreview(field)}
                    </div>
                  ))}

                  <button
                    onClick={() => setShowFieldPalette(true)}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                    disabled={!activeSections.includes(section.id)}
                  >
                    <PlusIcon className="w-5 h-5 mx-auto mb-1" />
                    Add Field
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add Section Button */}
          <button
            onClick={() => addSection('New Section')}
            className="w-full py-4 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mx-auto mb-1" />
            Add Section
          </button>
        </div>
      </div>

      {/* Field Palette Modal */}
      {showFieldPalette && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Field</h3>
              <button
                onClick={() => setShowFieldPalette(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fieldTypes.map((fieldType) => {
                const Icon = fieldType.icon;
                return (
                  <button
                    key={fieldType.type}
                    onClick={() => {
                      const firstActiveSection = activeSections[0];
                      if (firstActiveSection) {
                        handleAddField(firstActiveSection, fieldType.type);
                      }
                    }}
                    disabled={activeSections.length === 0}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{fieldType.label}</h4>
                        <p className="text-sm text-gray-500">{fieldType.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {activeSections.length === 0 && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Please expand a section first to add fields
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;