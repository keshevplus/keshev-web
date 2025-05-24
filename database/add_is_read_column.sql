-- SQL statements to add is_read column to messages and leads tables

-- Add is_read column to messages table
ALTER TABLE messages
ADD COLUMN is_read BOOLEAN NOT NULL DEFAULT false;

-- Add is_read column to leads table
ALTER TABLE leads
ADD COLUMN is_read BOOLEAN NOT NULL DEFAULT false;

-- Set all existing messages and leads to unread by default
UPDATE messages SET is_read = false;
UPDATE leads SET is_read = false;

-- Create an index for faster querying of unread messages/leads
CREATE INDEX idx_messages_is_read ON messages(is_read);
CREATE INDEX idx_leads_is_read ON leads(is_read);

-- You can connect to the database and run these commands using:
-- psql postgresql://neondb_owner:npg_tYJvA94QMXLK@ep-icy-forest-a4rpjd22-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require -f add_is_read_column.sql
