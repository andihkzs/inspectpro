/**
 * Forms page component managing form list and creation
 * Handles form CRUD operations and navigation
 */

import React, { useState, useEffect } from 'react';
import FormList from '../components/Forms/FormList';
import { InspectionForm } from '../types';
import { formService } from '../services/formService';

const Forms: React.FC = () => {
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
    try {
      await formService.deleteForm(id);
      setForms(forms.filter(form => form.id !== id));
    } catch (err) {
      console.error('Error deleting form:', err);
      setError('Failed to delete form. Please try again.');
    }
  };

  const handleSaveForm = async (form: InspectionForm) => {
    try {
      const savedForm = forms.some(f => f.id === form.id)
        ? await formService.updateForm(form.id, form)
        : await formService.createForm(form);
      
      const updatedForms = forms.some(f => f.id === form.id)
        ? forms.map(f => f.id === form.id ? savedForm : f)
        : [savedForm, ...forms];
      
      setForms(updatedForms);
    } catch (err) {
      console.error('Error saving form:', err);
      setError('Failed to save form. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your forms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={loadForms}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FormList forms={forms} onDeleteForm={handleDeleteForm} onSaveForm={handleSaveForm} />
    </div>
  );
};

export default Forms;