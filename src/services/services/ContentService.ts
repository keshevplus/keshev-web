import BaseApiService from '../base/BaseApiService';

class ContentService extends BaseApiService {
  async getAllContent(page = 1, limit = 10, filter = '') {
    return this.authenticatedRequest(`/api/content?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`);
  }

  async getContentById(id: string) {
    return this.authenticatedRequest(`/api/content/${id}`);
  }

  async createContent(contentData: any) {
    return this.authenticatedRequest('/api/content', {
      method: 'POST',
      body: JSON.stringify(contentData)
    });
  }

  async updateContent(id: string, contentData: any) {
    return this.authenticatedRequest(`/api/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contentData)
    });
  }

  async deleteContent(id: string) {
    return this.authenticatedRequest(`/api/content/${id}`, {
      method: 'DELETE'
    });
  }
}

export const contentService = new ContentService();
