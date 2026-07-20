export interface PageItem {
  heading: string;
  text: string;
  image?: string;
  alt?: string;
  bgColor?: string;     // Added for card background
  textColor?: string;   // Added for card text styling
}

export interface ContentItem {
  title: string;
  subtitle?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  image?: string;

  sections?: Array<{
    heading: string;
    text: string;
    image?: string;
    alt?: string;
    bgColor?: string;
    textColor?: string;
  }>;

  body?: Array<{
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    icon?: string;
    file?: string;
    subItems?: Array<{
      title: string;
      description: string;
    }>;
    bgColor?: string;
    textColor?: string;
  }>;

  additional?: Array<unknown>;
}

// Create a consistent base interface for all page content types
export interface BasePageContent {
  title: string;
  description?: string;
  image?: string;
  sections: Array<{
    id: string;
    heading: string;
    text?: string;
    content?: string | string[];
    image?: string;
    ctaButtonText?: string;
    bgColor?: string;
    textColor?: string;
  }>;
}

export interface HomePageContent {
  title: string;
  image: string; // Hero image or logo for homepage
  description?: string;
  sections: Array<{ // Section definitions for homepage content
    id: string;
    heading: string;
    text?: string;
    content?: string | string[];
    image?: string;
    ctaButtonText?: string;
    bgColor?: string;
    textColor?: string;
  }>;
}
