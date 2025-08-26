/**
 * Core TypeScript type definitions for the Inspection Form Builder
 * Defines interfaces for forms, users, inspections, and system entities
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'inspector' | 'reviewer';
  avatar?: string;
  active: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'rating' | 'photo' | 'video' | 'signature';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  conditional?: {
    dependsOn: string;
    condition: string;
    value: any;
  };
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  order: number;
}

export interface InspectionForm {
  id: string;
  title: string;
  description?: string;
  industry: string;
  sections: FormSection[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  isTemplate: boolean;
  isPublished: boolean;
  settings: {
    allowOffline: boolean;
    requireLocation: boolean;
    requireSignature: boolean;
    autoSave: boolean;
  };
}

export interface InspectionResponse {
  id: string;
  formId: string;
  inspectorId: string;
  assignedBy: string;
  responses: Record<string, any>;
  status: 'pending' | 'in_progress' | 'completed' | 'reviewed' | 'rejected';
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  startedAt?: Date;
  completedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  notes?: string;
  attachments: string[];
  signature?: string;
}

export interface Report {
  id: string;
  inspectionId: string;
  generatedAt: Date;
  format: 'pdf' | 'csv' | 'json';
  downloadUrl: string;
  qrCode?: string;
  shareableLink?: string;
  expiresAt?: Date;
}

export interface Dashboard {
  totalInspections: number;
  completedInspections: number;
  pendingInspections: number;
  overdueDays: number;
  completionRate: number;
  avgCompletionTime: number;
  recentActivity: Array<{
    id: string;
    type: 'inspection_completed' | 'form_created' | 'user_assigned';
    message: string;
    timestamp: Date;
    user: string;
  }>;
}

export interface AITemplate {
  id: string;
  name: string;
  industry: string;
  description: string;
  sections: FormSection[];
  confidence: number;
  suggestedFields: FormField[];
}