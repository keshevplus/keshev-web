import { ContentItem } from '../types/content';
import aboutPageData from '../data/aboutPage';
import servicesPageData from '../data/servicesPage';
import adhdPageData from '../data/adhdPage';
import diagnosisPageData from '../data/diagnosisPage';
import formsPageData from '../data/formsPage';
import contactPageData from '../data/contactPage';

export const contentService = {
  async getPageContent(page: string): Promise<ContentItem[]> {
    switch (page) {
      case 'about':
<<<<<<< HEAD
        return [
          {
            ...aboutPageData,
            sections: aboutPageData.sections.map(section => ({
              ...section,
              text: section.text || ''
            }))
          }
        ];
      case 'services':
        return [
          {
            ...servicesPageData,
            sections: servicesPageData.sections.map(section => ({
              ...section,
              text: section.text || ''
            }))
          }
        ];
      case 'adhd':
        return [
          {
            ...adhdPageData,
            sections: adhdPageData.sections.map(section => ({
              ...section,
              text: section.text || ''
            }))
          }
        ];
      case 'diagnosis':
        return [
          {
            ...diagnosisPageData,
            sections: diagnosisPageData.sections.map(section => ({
              ...section,
              text: section.text || ''
            }))
          }
        ];
      case 'forms':
        return [
          {
            ...formsPageData,
            sections: formsPageData.sections.map(section => ({
              ...section,
              text: section.text || ''
            }))
          }
        ];
      case 'contact':
        return [
          {
            ...contactPageData,
            sections: contactPageData.sections.map(section => ({
              ...section,
              heading: section.heading || '',
              text: section.text || '',
            }))
          }
        ];
=======
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
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
      default:
        throw new Error(`Unknown page: ${page}`);
    }
  }
};