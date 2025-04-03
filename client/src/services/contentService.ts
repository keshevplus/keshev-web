import { LocalPageContent } from '../types/content';
import aboutPageData from '../data/aboutPage';
import servicesPageData from '../data/servicesPage';
import adhdPageData from '../data/adhdPage';
import diagnosisPageData from '../data/diagnosisPage';
import formsPageData from '../data/formsPage';
import contactPageData from '../data/contactPage';

export const contentService = {
  async getPageContent(page: string): Promise<LocalPageContent[]> {
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