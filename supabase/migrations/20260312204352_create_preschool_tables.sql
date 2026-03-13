/*
  # Create Preschool Website Tables

  1. New Tables
    - `programs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `age_group` (text)
      - `icon` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)
    
    - `features`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `icon` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)
    
    - `activities`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `category` (text) - 'activities', 'events', 'admissions'
      - `created_at` (timestamp)
    
    - `gallery`
      - `id` (uuid, primary key)
      - `image_url` (text)
      - `title` (text)
      - `description` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access
*/

CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  age_group text NOT NULL,
  icon text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL CHECK (category IN ('activities', 'events', 'admissions')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Programs are viewable by everyone"
  ON programs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Programs can be inserted by authenticated users"
  ON programs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Programs can be updated by authenticated users"
  ON programs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Programs can be deleted by authenticated users"
  ON programs FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Features are viewable by everyone"
  ON features FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Features can be inserted by authenticated users"
  ON features FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Features can be updated by authenticated users"
  ON features FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Features can be deleted by authenticated users"
  ON features FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Activities are viewable by everyone"
  ON activities FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Activities can be inserted by authenticated users"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Activities can be updated by authenticated users"
  ON activities FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Activities can be deleted by authenticated users"
  ON activities FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Gallery items are viewable by everyone"
  ON gallery FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Gallery items can be inserted by authenticated users"
  ON gallery FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Gallery items can be updated by authenticated users"
  ON gallery FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Gallery items can be deleted by authenticated users"
  ON gallery FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO programs (title, description, age_group, icon, order_index) VALUES
  ('Play Group', 'Safe, nurturing and playful atmosphere', '1-2 years', 'baby', 1),
  ('Nursery', 'Caring and qualified early childhood educators', '2-3 years', 'blocks', 2),
  ('Kindergarten', 'Caring ahlbhe cout so/ childhood educators', '3-4 years', 'book-open', 3),
  ('Prep', 'Creative and engaging learning experiences', '4-5 years', 'palette', 4),
  ('Prep', 'Fun activities on/rang casurs and bontants', '5-6 years', 'book', 5);

INSERT INTO features (title, description, icon, order_index) VALUES
  ('Loving Environment', 'Safe, nurturing and playful atmosphere', 'heart', 1),
  ('Experienced Teachers', 'Caring and qualified early childhood educators', 'user', 2),
  ('Fun Activities', 'Creative and engaging learning experiences', 'palette', 3);

INSERT INTO activities (title, description, image_url, category) VALUES
  ('Activities', 'Hands-on learning through play', 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg', 'activities'),
  ('Events', 'Special celebrations and gatherings', 'https://images.pexels.com/photos/8613317/pexels-photo-8613317.jpeg', 'events'),
  ('Admissions', 'Join our preschool family', 'https://images.pexels.com/photos/8613325/pexels-photo-8613325.jpeg', 'admissions');
