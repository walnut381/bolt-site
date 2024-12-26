/*
  # Initial Schema Setup for PC Builder Website

  1. New Tables
    - users (handled by Supabase Auth)
    - pc_configs
      - id (uuid, primary key)
      - title (text)
      - price_range (numeric)
      - description (text)
      - components (jsonb)
      - created_at (timestamp)
      - user_id (uuid, foreign key)
    - favorites
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - config_id (uuid, foreign key)
      - created_at (timestamp)
    - likes
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - config_id (uuid, foreign key)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

CREATE TABLE pc_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price_range numeric NOT NULL,
  description text,
  components jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  config_id uuid REFERENCES pc_configs(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, config_id)
);

CREATE TABLE likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  config_id uuid REFERENCES pc_configs(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, config_id)
);

-- Enable RLS
ALTER TABLE pc_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Policies for pc_configs
CREATE POLICY "Anyone can view pc_configs" ON pc_configs
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own configs" ON pc_configs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for favorites
CREATE POLICY "Users can view their own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

-- Policies for likes
CREATE POLICY "Anyone can view likes" ON likes
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own likes" ON likes
  FOR ALL USING (auth.uid() = user_id);