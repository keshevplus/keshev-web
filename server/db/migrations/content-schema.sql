-- Content Schema for Keshev Plus Website

-- Create content_pages table for page-level information
CREATE TABLE IF NOT EXISTS content_pages (
  id SERIAL PRIMARY KEY,
  page_key VARCHAR(50) NOT NULL UNIQUE,
  heading TEXT NOT NULL,
  subheading TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create content_sections table for page sections and their properties
CREATE TABLE IF NOT EXISTS content_sections (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES content_pages(id) ON DELETE CASCADE,
  section_key VARCHAR(50) NOT NULL,
  heading TEXT,
  subheading TEXT,
  button_text TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page_id, section_key)
);

-- Create content_items for individual content items within sections
CREATE TABLE IF NOT EXISTS content_items (
  id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES content_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create content_body for flexible page body content
CREATE TABLE IF NOT EXISTS content_body (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES content_pages(id) ON DELETE CASCADE,
  content_type VARCHAR(20) NOT NULL, -- 'text', 'image', 'list', etc.
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add trigger for update_updated_at_column for all content tables
CREATE TRIGGER update_content_pages_updated_at
BEFORE UPDATE ON content_pages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_sections_updated_at
BEFORE UPDATE ON content_sections
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_items_updated_at
BEFORE UPDATE ON content_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_body_updated_at
BEFORE UPDATE ON content_body
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
