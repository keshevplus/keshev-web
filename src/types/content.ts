export interface ContentItem {
  title: string;
  description: string;
  image?: string | null;
  icon?: string | null; // Optional icon for the content item
  file?: string;  // Base path for the file, extensions (.pdf, .docx) will be added in the component
  subtitle?: string;
  imagePosition?: 'left' | 'right';
}

export interface LocalPageContent {
  heading: string;
  subheading: string;
  body: ContentItem[];
  additional?: ContentItem[];
  additionalInfo?: {
    heading: string;
    description: string;
  };
}

export interface HomePageContent {
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
}

import aboutPageData from '../data/aboutPage';
import servicesPageData from '../data/servicesPage';
import diagnosisPageData from '../data/diagnosisPage';
import formsPageData from '../data/formsPage';
import { contactPageData } from '../data/contactPage';
import adhdPageData from '../data/adhdPage';

export const contentService = {
  async getPageContent(page: string): Promise<LocalPageContent[]> {
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

export function getPageContent(page: string): LocalPageContent[] {
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
}
