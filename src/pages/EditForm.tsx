/**
 * Edit form page component
 * Loads existing form and allows editing with form builder
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DocumentPlusIcon, SparklesIcon } from '@heroicons/react/24/outline';
import FormBuilder from '../components/Forms/FormBuilder';
import AIGeneratorSidebar from '../components/Forms/AIGeneratorSidebar';
import { AITemplate, InspectionForm } from '../types';
import { formService } from '../services/formService';

const EditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<InspectionForm | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<AITemplate | null>(null);
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadForm(id);
    }
  }, [id]);

  const loadForm = async (formId: string) => {
    try {
      setLoading(true);
      setError(null);
      const loadedForm = await formService.getFormById(formId);
      
      if (!loadedForm) {
        setError('Form not found');
        return;
      }
      
      setForm(loadedForm);
    } catch (error) {
      console.error('Error loading form:', error);
      setError('Failed to load form');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateGenerated = (template: AITemplate) => {
    setSelectedTemplate(template);
  };

  const handleSaveForm = async (updatedForm: InspectionForm) => {
    if (!id) return;
    
    try {
      setSaving(true);
      await formService.updateForm(id, updatedForm);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving form:', error);
      setError('Failed to save form');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!form) {
    return null;
  }

  return (
    <div className="flex">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Form</h1>
          <p className="text-gray-600 mt-2">
            Modify your inspection form using the form builder. Use the AI generator for additional suggestions.
            {saving && <span className="text-blue-600 ml-2">Saving...</span>}
          </p>
          
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={() => setAiSidebarOpen(!aiSidebarOpen)}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <SparklesIcon className="w-5 h-5" />
              <span>AI Form Generator</span>
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              disabled={saving}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>

        <FormBuilder 
          initialTemplate={selectedTemplate} 
          onSave={handleSaveForm}
          existingForm={form}
        />
      </div>
      
      <AIGeneratorSidebar 
        isOpen={aiSidebarOpen}
        onToggle={() => setAiSidebarOpen(!aiSidebarOpen)}
        onTemplateGenerated={handleTemplateGenerated}
      />
    </div>
  );
};

export default EditForm;