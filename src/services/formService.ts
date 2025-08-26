/**
 * Form service for database operations
 * Handles CRUD operations for inspection forms with Supabase fallback to localStorage
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { InspectionForm } from '../types';
import { v4 as uuidv4 } from 'uuid';

class FormService {
  private readonly STORAGE_KEY = 'inspectionForms';
  private readonly DEFAULT_USER_ID = 'demo-user'; // Temporary until auth is implemented

  /**
   * Get all forms for the current user
   */
  async getAllForms(): Promise<InspectionForm[]> {
    if (isSupabaseConfigured()) {
      return this.getFormsFromSupabase();
    }
    return this.getFormsFromLocalStorage();
  }

  /**
   * Create a new form
   */
  async createForm(formData: Omit<InspectionForm, 'id' | 'createdAt' | 'updatedAt'>): Promise<InspectionForm> {
    const form: InspectionForm = {
      ...formData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isSupabaseConfigured()) {
      return this.createFormInSupabase(form);
    }
    return this.createFormInLocalStorage(form);
  }

  /**
   * Update an existing form
   */
  async updateForm(id: string, updates: Partial<InspectionForm>): Promise<InspectionForm> {
    const updatedForm = {
      ...updates,
      id,
      updatedAt: new Date()
    };

    if (isSupabaseConfigured()) {
      return this.updateFormInSupabase(id, updatedForm);
    }
    return this.updateFormInLocalStorage(id, updatedForm);
  }

  /**
   * Delete a form
   */
  async deleteForm(id: string): Promise<void> {
    if (isSupabaseConfigured()) {
      return this.deleteFormFromSupabase(id);
    }
    return this.deleteFormFromLocalStorage(id);
  }

  /**
   * Get a single form by ID
   */
  async getFormById(id: string): Promise<InspectionForm | null> {
    if (isSupabaseConfigured()) {
      return this.getFormFromSupabase(id);
    }
    return this.getFormFromLocalStorage(id);
  }

  // Supabase operations
  private async getFormsFromSupabase(): Promise<InspectionForm[]> {
    try {
      const { data, error } = await supabase!
        .from('inspection_forms')
        .select('*')
        .eq('created_by', this.DEFAULT_USER_ID)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(this.transformFromDatabase);
    } catch (error) {
      console.error('Error fetching forms from Supabase:', error);
      // Fallback to localStorage
      return this.getFormsFromLocalStorage();
    }
  }

  private async createFormInSupabase(form: InspectionForm): Promise<InspectionForm> {
    try {
      const dbForm = this.transformToDatabase(form);
      
      const { data, error } = await supabase!
        .from('inspection_forms')
        .insert(dbForm)
        .select()
        .single();

      if (error) throw error;

      return this.transformFromDatabase(data);
    } catch (error) {
      console.error('Error creating form in Supabase:', error);
      // Fallback to localStorage
      return this.createFormInLocalStorage(form);
    }
  }

  private async updateFormInSupabase(id: string, updates: Partial<InspectionForm>): Promise<InspectionForm> {
    try {
      const dbUpdates = this.transformToDatabase(updates as InspectionForm);
      
      const { data, error } = await supabase!
        .from('inspection_forms')
        .update(dbUpdates)
        .eq('id', id)
        .eq('created_by', this.DEFAULT_USER_ID)
        .select()
        .single();

      if (error) throw error;

      return this.transformFromDatabase(data);
    } catch (error) {
      console.error('Error updating form in Supabase:', error);
      // Fallback to localStorage
      return this.updateFormInLocalStorage(id, updates);
    }
  }

  private async deleteFormFromSupabase(id: string): Promise<void> {
    try {
      const { error } = await supabase!
        .from('inspection_forms')
        .delete()
        .eq('id', id)
        .eq('created_by', this.DEFAULT_USER_ID);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting form from Supabase:', error);
      // Fallback to localStorage
      return this.deleteFormFromLocalStorage(id);
    }
  }

  private async getFormFromSupabase(id: string): Promise<InspectionForm | null> {
    try {
      const { data, error } = await supabase!
        .from('inspection_forms')
        .select('*')
        .eq('id', id)
        .eq('created_by', this.DEFAULT_USER_ID)
        .single();

      if (error) throw error;

      return data ? this.transformFromDatabase(data) : null;
    } catch (error) {
      console.error('Error fetching form from Supabase:', error);
      // Fallback to localStorage
      return this.getFormFromLocalStorage(id);
    }
  }

  // LocalStorage operations (fallback)
  private getFormsFromLocalStorage(): InspectionForm[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return this.getDefaultForms();

      const forms = JSON.parse(data);
      return forms.map((form: any) => ({
        ...form,
        createdAt: new Date(form.createdAt),
        updatedAt: new Date(form.updatedAt)
      }));
    } catch (error) {
      console.error('Error loading forms from localStorage:', error);
      return this.getDefaultForms();
    }
  }

  private createFormInLocalStorage(form: InspectionForm): InspectionForm {
    const forms = this.getFormsFromLocalStorage();
    forms.unshift(form);
    this.saveFormsToLocalStorage(forms);
    return form;
  }

  private updateFormInLocalStorage(id: string, updates: Partial<InspectionForm>): InspectionForm {
    const forms = this.getFormsFromLocalStorage();
    const index = forms.findIndex(f => f.id === id);
    
    if (index === -1) {
      throw new Error('Form not found');
    }

    const updatedForm = { ...forms[index], ...updates };
    forms[index] = updatedForm;
    this.saveFormsToLocalStorage(forms);
    
    return updatedForm;
  }

  private deleteFormFromLocalStorage(id: string): void {
    const forms = this.getFormsFromLocalStorage();
    const filteredForms = forms.filter(f => f.id !== id);
    this.saveFormsToLocalStorage(filteredForms);
  }

  private getFormFromLocalStorage(id: string): InspectionForm | null {
    const forms = this.getFormsFromLocalStorage();
    return forms.find(f => f.id === id) || null;
  }

  private saveFormsToLocalStorage(forms: InspectionForm[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(forms));
  }

  // Data transformation helpers
  private transformToDatabase(form: InspectionForm): any {
    return {
      id: form.id,
      title: form.title,
      description: form.description || null,
      industry: form.industry,
      sections: form.sections,
      created_by: form.createdBy || this.DEFAULT_USER_ID,
      version: form.version,
      is_template: form.isTemplate,
      is_published: form.isPublished,
      settings: form.settings
    };
  }

  private transformFromDatabase(data: any): InspectionForm {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      industry: data.industry,
      sections: data.sections || [],
      createdBy: data.created_by,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      version: data.version,
      isTemplate: data.is_template,
      isPublished: data.is_published,
      settings: data.settings
    };
  }

  // Default sample forms for first-time users
  private getDefaultForms(): InspectionForm[] {
    // Clear any existing forms from localStorage on initialization
    localStorage.removeItem(this.STORAGE_KEY);
    return [];
  }
}

export const formService = new FormService();