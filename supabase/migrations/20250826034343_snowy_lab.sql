/*
  # Create Forms Table

  1. New Tables
    - `inspection_forms`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `industry` (text, required)
      - `sections` (jsonb, required)
      - `created_by` (text, required - will be user_id later)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `version` (integer)
      - `is_template` (boolean)
      - `is_published` (boolean)
      - `settings` (jsonb)

  2. Security
    - Enable RLS on `inspection_forms` table
    - Add policy for users to manage their own forms
*/

CREATE TABLE IF NOT EXISTS inspection_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  industry text NOT NULL,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_by text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  version integer DEFAULT 1,
  is_template boolean DEFAULT false,
  is_published boolean DEFAULT false,
  settings jsonb DEFAULT '{
    "allowOffline": true,
    "requireLocation": true,
    "requireSignature": false,
    "autoSave": true
  }'::jsonb
);

ALTER TABLE inspection_forms ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to manage their own forms
-- For now, using created_by as text, later will use auth.uid()
CREATE POLICY "Users can manage own forms" ON inspection_forms
  FOR ALL USING (true); -- Temporary policy, will be restricted later

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_inspection_forms_created_by ON inspection_forms(created_by);
CREATE INDEX IF NOT EXISTS idx_inspection_forms_industry ON inspection_forms(industry);
CREATE INDEX IF NOT EXISTS idx_inspection_forms_created_at ON inspection_forms(created_at DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_inspection_forms_updated_at ON inspection_forms;
CREATE TRIGGER update_inspection_forms_updated_at
  BEFORE UPDATE ON inspection_forms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();