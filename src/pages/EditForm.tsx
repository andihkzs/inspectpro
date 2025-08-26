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
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-auto">
        {saving && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">Saving changes...</p>
              </div>
            </div>
          </div>
        )}

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