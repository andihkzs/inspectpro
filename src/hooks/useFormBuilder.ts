/**
 * Form builder hook for managing form creation and editing
 * Handles drag-and-drop functionality, field management, and form validation
 */

import { useState, useCallback } from 'react';
import { InspectionForm, FormSection, FormField } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const useFormBuilder = () => {
  const [form, setForm] = useState<InspectionForm | null>(null);
  const [activeSections, setActiveSections] = useState<string[]>([]);
  const [draggedField, setDraggedField] = useState<FormField | null>(null);

  const createNewForm = useCallback((title: string, industry: string) => {
    const newForm: InspectionForm = {
      id: uuidv4(),
      title,
      industry,
      sections: [],
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
    return newForm;
  }, []);

  const addSection = useCallback((title: string, description?: string) => {
    if (!form) return;

    const newSection: FormSection = {
      id: uuidv4(),
      title,
      description,
      fields: [],
      order: form.sections.length
    };

    setForm(prev => ({
      ...prev!,
      sections: [...prev!.sections, newSection],
      updatedAt: new Date()
    }));
  }, [form]);

  const addField = useCallback((sectionId: string, field: Omit<FormField, 'id'>) => {
    if (!form) return;

    const newField: FormField = {
      id: uuidv4(),
      ...field
    };

    setForm(prev => ({
      ...prev!,
      sections: prev!.sections.map(section =>
        section.id === sectionId
          ? { ...section, fields: [...section.fields, newField] }
          : section
      ),
      updatedAt: new Date()
    }));
  }, [form]);

  const updateField = useCallback((sectionId: string, fieldId: string, updates: Partial<FormField>) => {
    if (!form) return;

    setForm(prev => ({
      ...prev!,
      sections: prev!.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map(field =>
                field.id === fieldId ? { ...field, ...updates } : field
              )
            }
          : section
      ),
      updatedAt: new Date()
    }));
  }, [form]);

  const deleteField = useCallback((sectionId: string, fieldId: string) => {
    if (!form) return;

    setForm(prev => ({
      ...prev!,
      sections: prev!.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.filter(field => field.id !== fieldId)
            }
          : section
      ),
      updatedAt: new Date()
    }));
  }, [form]);

  const reorderFields = useCallback((sectionId: string, startIndex: number, endIndex: number) => {
    if (!form) return;

    setForm(prev => ({
      ...prev!,
      sections: prev!.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              fields: (() => {
                const newFields = [...section.fields];
                const [removed] = newFields.splice(startIndex, 1);
                newFields.splice(endIndex, 0, removed);
                return newFields;
              })()
            }
          : section
      ),
      updatedAt: new Date()
    }));
  }, [form]);

  const publishForm = useCallback(() => {
    if (!form) return;

    setForm(prev => ({
      ...prev!,
      isPublished: true,
      updatedAt: new Date()
    }));
  }, [form]);

  return {
    form,
    setForm,
    activeSections,
    setActiveSections,
    draggedField,
    setDraggedField,
    createNewForm,
    addSection,
    addField,
    updateField,
    deleteField,
    reorderFields,
    publishForm
  };
};