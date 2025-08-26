/**
 * Supabase database type definitions
 * Generated types for type-safe database operations
 */

export interface Database {
  public: {
    Tables: {
      inspection_forms: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          industry: string;
          sections: any[]; // JSON array of FormSection
          created_by: string;
          created_at: string;
          updated_at: string;
          version: number;
          is_template: boolean;
          is_published: boolean;
          settings: {
            allowOffline: boolean;
            requireLocation: boolean;
            requireSignature: boolean;
            autoSave: boolean;
          };
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          industry: string;
          sections?: any[];
          created_by: string;
          created_at?: string;
          updated_at?: string;
          version?: number;
          is_template?: boolean;
          is_published?: boolean;
          settings?: {
            allowOffline?: boolean;
            requireLocation?: boolean;
            requireSignature?: boolean;
            autoSave?: boolean;
          };
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          industry?: string;
          sections?: any[];
          created_by?: string;
          created_at?: string;
          updated_at?: string;
          version?: number;
          is_template?: boolean;
          is_published?: boolean;
          settings?: {
            allowOffline?: boolean;
            requireLocation?: boolean;
            requireSignature?: boolean;
            autoSave?: boolean;
          };
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}