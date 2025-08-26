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

const CreateForm: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<AITemplate | null>(null);
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleTemplateGenerated = (template: AITemplate) => {
    setSelectedTemplate(template);
  };

  const handleSaveForm = (form: InspectionForm) => {
    // Save to localStorage
    const savedForms = localStorage.getItem('inspectionForms');
    const forms = savedForms ? JSON.parse(savedForms) : [];
    
    const updatedForms = forms.some((f: InspectionForm) => f.id === form.id)
      ? forms.map((f: InspectionForm) => f.id === form.id ? form : f)
      : [...forms, form];
    
    localStorage.setItem('inspectionForms', JSON.stringify(updatedForms));
    
    // Navigate back to forms list
    navigate('/forms');
  };

  return (
    <div className="flex">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Form</h1>
          <p className="text-gray-600 mt-2">
            Build your inspection form using the drag-and-drop builder. Use the AI generator (purple button) for quick templates.
          </p>
          
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={() => setAiSidebarOpen(!aiSidebarOpen)}
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