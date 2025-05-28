import BaseApiService from '../base/BaseApiService';

class PagesService extends BaseApiService {
  async getAllPages() {
    return this.authenticatedRequest('/api/pages');
  }

  async createPage(pageData: any) {
    return this.authenticatedRequest('/api/pages', {
      method: 'POST',
      body: JSON.stringify(pageData)
    });
  }

  async updatePage(id: string, pageData: any) {
    return this.authenticatedRequest(`/api/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pageData)
    });
  }
}

export const pagesService = new PagesService();
