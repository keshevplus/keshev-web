export interface ContentItem {
  title: string;
  description: string;
  image?: string | null;
  file?: string;  // Base path for the file, extensions (.pdf, .docx) will be added in the component
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

import { PageContent } from '../types/content';

export const adhdPageData: LocalPageContent = {
  heading: 'ADHD Information',
  subheading: 'Learn more about ADHD',
  body: [
    {
      title: 'Introduction',
      description: 'This is some placeholder content for the ADHD page.',
    },
  ],
};

import { aboutPageData } from '../data/aboutPage';
import { servicesPageData } from '../data/servicesPage';
import { diagnosisPageData } from '../data/diagnosisPage';
import { formsPageData } from '../data/formsPage';
import { contactPageData } from '../data/contactPage';

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
        return [];
    }
  },
};

export async function getPageContent(page: string): Promise<LocalPageContent[]> {
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
