/**
 * Core TypeScript type definitions for the Inspection Form Builder
 * Defines interfaces for forms and system entities
 */

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

export interface AITemplate {
  id: string;
  name: string;
  industry: string;
  description: string;
  sections: FormSection[];
  confidence: number;
  suggestedFields: FormField[];
}