/**
 * Create form page component
 * Handles form creation with AI templates and manual builder
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentPlusIcon, SparklesIcon } from '@heroicons/react/24/outline';
import FormBuilder from '../components/Forms/FormBuilder';
import AIGeneratorSidebar from '../components/Forms/AIGeneratorSidebar';
import { AITemplate, InspectionForm } from '../types';
import { formService } from '../services/formService';

const CreateForm: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<AITemplate | null>(null);
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleTemplateGenerated = (template: AITemplate) => {
    setSelectedTemplate(template);
  };

  const handleSaveForm = async (form: InspectionForm) => {
    try {
      setSaving(true);
      
      // Check if form exists (update) or is new (create)
      const existingForm = await formService.getFormById(form.id);
      
      if (existingForm) {
        await formService.updateForm(form.id, form);
      } else {
        await formService.createForm(form);
      }
      
      // Navigate back to forms list
      navigate('/forms');
    } catch (error) {
      console.error('Error saving form:', error);
      // Could show a toast notification here
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Form</h1>
          <p className="text-gray-600 mt-2">
            Build your inspection form using the drag-and-drop builder. Use the AI generator (purple button) for quick templates.
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
          </div>
        </div>

        <FormBuilder 
          initialTemplate={selectedTemplate} 
          onSave={handleSaveForm}
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

export default CreateForm;