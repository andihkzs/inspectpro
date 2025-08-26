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
    console.log('📋 FormService: Getting all forms...');
    console.log('📋 FormService: Supabase configured:', isSupabaseConfigured());
    
    if (isSupabaseConfigured()) {
      console.log('📋 FormService: Using Supabase');
      return this.getFormsFromSupabase();
    }
    console.log('📋 FormService: Using localStorage fallback');
    return this.getFormsFromLocalStorage();
  }

  /**
   * Create a new form
   */
  async createForm(formData: Omit<InspectionForm, 'id' | 'createdAt' | 'updatedAt'>): Promise<InspectionForm> {
    console.log('📝 FormService: Creating form, data:', formData);
    console.log('📝 FormService: Supabase configured:', isSupabaseConfigured());
    
    const form: InspectionForm = {
      ...formData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('📝 FormService: Form with generated ID:', form);

    if (isSupabaseConfigured()) {
      console.log('📝 FormService: Saving to Supabase');
      return this.createFormInSupabase(form);
    }
    console.log('📝 FormService: Saving to localStorage');
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
      console.log('📊 Supabase: Fetching forms from database...');
      const { data, error } = await supabase!
        .from('inspection_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('📊 Supabase: Error fetching forms:', error);
        throw error;
      }

      console.log('📊 Supabase: Raw data from database:', data);
      const transformedForms = data.map(this.transformFromDatabase);
      console.log('📊 Supabase: Transformed forms:', transformedForms);
      return transformedForms;
    } catch (error) {
      console.error('Error fetching forms from Supabase:', error);
      // Fallback to localStorage
      console.log('📊 Supabase: Falling back to localStorage');
      return this.getFormsFromLocalStorage();
    }
  }

  private async createFormInSupabase(form: InspectionForm): Promise<InspectionForm> {
    try {
      console.log('💾 Supabase: Creating form in database:', form);
      const dbForm = this.transformToDatabase(form);
      console.log('💾 Supabase: Transformed form for database:', dbForm);
      
      const { data, error } = await supabase!
        .from('inspection_forms')
        .insert(dbForm)
        .select()
        .single();

      if (error) {
        console.error('💾 Supabase: Error creating form:', error);
        throw error;
      }

      console.log('💾 Supabase: Form created successfully:', data);
      return this.transformFromDatabase(data);
    } catch (error) {
      console.error('Error creating form in Supabase:', error);
      // Fallback to localStorage
      console.log('💾 Supabase: Falling back to localStorage');
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
        .eq('id', id);

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
    console.log('📝 Creating form in localStorage:', form);
    const forms = this.getFormsFromLocalStorage();
    console.log('📋 Current forms before save:', forms);
    forms.unshift(form);
    console.log('📋 Forms after adding new form:', forms);
    this.saveFormsToLocalStorage(forms);
    console.log('💾 Form saved to localStorage successfully');
    
    // Verify the save worked
    const savedForms = this.getFormsFromLocalStorage();
    console.log('🔍 Verification - Forms now in localStorage:', savedForms);
    
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
    console.log('💾 Saving forms to localStorage:', forms);
    const jsonData = JSON.stringify(forms);
    console.log('💾 JSON data being saved:', jsonData);
    localStorage.setItem(this.STORAGE_KEY, jsonData);
    console.log('💾 Successfully saved to localStorage with key:', this.STORAGE_KEY);
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
      created_at: form.createdAt?.toISOString(),
      updated_at: form.updatedAt?.toISOString(),
      version: form.version,
      is_template: form.isTemplate,
      is_published: form.isPublished,
      settings: form.settings
    };
  }

  private transformFromDatabase(data: any): InspectionForm {
    console.log('🔄 Transforming database record:', data);
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