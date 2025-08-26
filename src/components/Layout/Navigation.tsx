/**
 * Main dashboard page component
 * Displays all saved forms with statistics and management options
 */

import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formService } from '../../services/formService';
import { InspectionForm } from '../types';
import DashboardOverview from '../components/Dashboard/DashboardOverview';
import { 
  DocumentPlusIcon, 
  DocumentIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
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
    if (!confirm('Are you sure you want to delete this form?')) return;
    
    try {
      await formService.deleteForm(id);
      setForms(forms.filter(form => form.id !== id));
    } catch (err) {
      console.error('Error deleting form:', err);
      setError('Failed to delete form. Please try again.');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const stats = {
    total: forms.length,
    published: forms.filter(f => f.isPublished).length,
    draft: forms.filter(f => !f.isPublished).length,
    totalFields: forms.reduce((acc, form) => acc + form.sections.reduce((sAcc, section) => sAcc + section.fields.length, 0), 0)
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, Demo User
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your inspections today
        </p>
      </div>

      <DashboardOverview />
    </div>
  );
};

export default Dashboard;