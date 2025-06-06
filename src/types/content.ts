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

export interface HomePageContent {
  title: string;
  subTitle?: string;
  heading?: string;
  subheading?: string;
  list?: string[];
  body?: ContentItem[];
  heroText: string;
  heroSubText?: string; // Added the missing heroSubText property
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
