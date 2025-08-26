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