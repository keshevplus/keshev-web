export type PageType =
  'home'
  | 'about'
  | 'services'
  | 'adhd'
  | 'diagnosis'
  | 'forms'
  | 'contact'
 | 'accessibility';

/**
 * Base type for page sections
 */
export interface PageSection {
  id: string; // Unique identifier for the section
  type: PageType; // Enforce same names as navbar
  heading?: string; // Optional title for the section
  text?: string; // Optional subtitle for the section
  pageId?: string; // Optional page ID if the section is linked to a specific page
  sections?: [
    {
    id?: string,
    heading?: string,
    text?: string,
    content?: string[], // Optional content for the section
    image?: string,
    bgColor?: string,
    textColor?: string,
  }
  ]; // Optional nested sections for sub-sections

  description?: string; // Optional description for the section
  image?: string; // Optional image URL for the section
  bgColor?: string; // Optional background color for the section
  textColor?: string; // Optional text color for the section
  ctaButtonText?: string; // Optional text for call-to-action button
  ctaButtonLink?: string; // Optional link for call-to-action button



  display_order?: number; // Optional display order for sorting sections
}