<<<<<<< HEAD
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

  additional?: Array<any>;
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


// Dynamic import of page data files for lazy loading
const pageModules = import.meta.glob('../data/*Page.ts');

export const contentService = {
  /**
   * Lazily loads page content module matching the page key.
   * Drop a new data file in src/data named <page>Page.ts to auto-register.
   */
  async getPageContent(page: string): Promise<ContentItem[] | any> {
    const modulePath = `../data/${page}Page.ts`;
    const loader = pageModules[modulePath];
    if (!loader) {
      throw new Error(`Unknown page: ${page}`);
    }
    const mod = await loader();
    // default export should be the page's data object or array
    const data = (mod as { default: any }).default;
    // Ensure array return for consistency
    return Array.isArray(data) ? data : [data];
  }
};

// Deprecated synchronous loader, use contentService.getPageContent instead
export function getPageContent(): ContentItem[] {
  console.warn('getPageContent is deprecated, use contentService.getPageContent');
  return [];
=======
export interface HomePageContent {
  heading: string;
  subheading?: string;
  body?: ContentItem[];
  heroText: string;
  ctaButtonText: string;
  servicesHeading: string;
  servicesSubheading: string;
  ctaHeading: string;
  ctaSubheading: string;
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
  image: string; // Added the missing 'image' property
}
export interface ContentItem {
  heading: string;
  subheading?: string;
  body?: ContentItem[] | {
    title: string;
    subtitle?: string;
    description: string;
    image?: string;
    icon?: string; 
    file?: string;
  }[];
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  icon?: string; 
  file?: string;
  additional?: Array<ContentItem | {
    title: string;
    subtitle?: string;
    description: string;
    image?: string;
    icon?: string; 
    file?: string;
  }>;
}

import aboutPageData from '../data/aboutPage';
import servicesPageData from '../data/servicesPage';
import diagnosisPageData from '../data/diagnosisPage';
import formsPageData from '../data/formsPage';
import contactPageData from '../data/contactPage';
import adhdPageData from '../data/adhdPage';

export const contentService = {
  async getPageContent(page: string): Promise<ContentItem[]> {
    // This could be replaced with real API calls later
    switch (page) {
      case 'about':
        return [aboutPageData];
      case 'services':
        return [servicesPageData];
      case 'adhd':
        return [adhdPageData];
      case 'diagnosis':
        return [diagnosisPageData];
      case 'forms':
        return [formsPageData];
      case 'contact':
        return [contactPageData];
      default:
        throw new Error(`Unknown page: ${page}`);
    }
  }
};

export function getPageContent(page: string): ContentItem[] {
  switch (page) {
    case 'about':
      return [aboutPageData];
    case 'services':
      return [servicesPageData];
    case 'adhd':
      return [adhdPageData];
    case 'diagnosis':
      return [diagnosisPageData];
    case 'forms':
      return [formsPageData];
    case 'contact':
      return [contactPageData];
    default:
      return [];
  }
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
}
