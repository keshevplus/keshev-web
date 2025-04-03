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
}
