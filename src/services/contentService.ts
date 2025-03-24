import { PageContent } from '../types/content';
import { aboutPageData } from '../data/aboutPage';

export const contentService = {
  async getPageContent(page: string): Promise<PageContent[]> {
    // This could be replaced with real API calls later
    switch (page) {
      case 'about':
        return [aboutPageData];
      default:
        return [];
    }
  }
};
