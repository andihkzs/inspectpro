/**
 * Forms page component managing form list and creation
 * Handles form CRUD operations and navigation
 */

import React, { useState, useEffect } from 'react';
import FormList from '../components/Forms/FormList';
import { InspectionForm } from '../types';
import { v4 as uuidv4 } from 'uuid';

const Forms: React.FC = () => {
  const [forms, setForms] = useState<InspectionForm[]>([]);

  useEffect(() => {
    // Load forms from localStorage or API
    const savedForms = localStorage.getItem('inspectionForms');
    if (savedForms) {
      const parsedForms = JSON.parse(savedForms);
      // Convert date strings back to Date objects
      const formsWithDates = parsedForms.map((form: any) => ({
        ...form,
        createdAt: new Date(form.createdAt),
        updatedAt: new Date(form.updatedAt)
      }));
      setForms(formsWithDates);
    } else {
      // Initialize with sample data
      const sampleForms: InspectionForm[] = [
        {
          id: uuidv4(),
          title: 'Apartment Cleaning Inspection',
          description: 'Standard cleaning inspection for residential properties',
          industry: 'property-management',
          sections: [
            {
              id: uuidv4(),
              title: 'General Information',
              order: 0,
              fields: [
                {
                  id: uuidv4(),
                  type: 'text',
                  label: 'Property Address',
                  required: true
                },
                {
                  id: uuidv4(),
                  type: 'select',
                  label: 'Property Type',
                  required: true,
                  options: ['Apartment', 'House', 'Condo']
                }
              ]
            }
          ],
          createdBy: 'current-user',
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
          updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
          version: 1,
          isTemplate: false,
          isPublished: true,
          settings: {
            allowOffline: true,
            requireLocation: true,
            requireSignature: false,
            autoSave: true
          }
        },
        {
          id: uuidv4(),
          title: 'Restaurant Safety Check',
          description: 'Health and safety inspection for food service establishments',
          industry: 'food-service',
          sections: [
            {
              id: uuidv4(),
              title: 'Basic Information',
              order: 0,
              fields: [
                {
                  id: uuidv4(),
                  type: 'text',
                  label: 'Restaurant Name',
                  required: true
                },
                {
                  id: uuidv4(),
                  type: 'rating',
                  label: 'Overall Cleanliness',
                  required: true,
                  validation: { min: 1, max: 5 }
                }
              ]
            }
          ],
          createdBy: 'current-user',
          createdAt: new Date(Date.now() - 172800000), // 2 days ago
          updatedAt: new Date(Date.now() - 7200000), // 2 hours ago
          version: 2,
          isTemplate: false,
          isPublished: false,
          settings: {
            allowOffline: true,
            requireLocation: true,
            requireSignature: true,
            autoSave: true
          }
        }
      ];
      setForms(sampleForms);
      localStorage.setItem('inspectionForms', JSON.stringify(sampleForms));
    }
  }, []);

  const handleDeleteForm = (id: string) => {
    const updatedForms = forms.filter(form => form.id !== id);
    setForms(updatedForms);
    localStorage.setItem('inspectionForms', JSON.stringify(updatedForms));
  };

  const handleSaveForm = (form: InspectionForm) => {
    const updatedForms = forms.some(f => f.id === form.id)
      ? forms.map(f => f.id === form.id ? form : f)
      : [...forms, form];
    
    setForms(updatedForms);
    localStorage.setItem('inspectionForms', JSON.stringify(updatedForms));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FormList forms={forms} onDeleteForm={handleDeleteForm} />
    </div>
  );
};

export default Forms;