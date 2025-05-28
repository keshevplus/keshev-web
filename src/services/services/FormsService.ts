import BaseApiService from '../base/BaseApiService';

class FormsService extends BaseApiService {
  async getAllForms() {
    return this.authenticatedRequest('/api/forms');
  }

  async createForm(formData: any) {
    return this.authenticatedRequest('/api/forms', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  }

  async updateForm(id: string, formData: any) {
    return this.authenticatedRequest(`/api/forms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData)
    });
  }

  async deleteForm(id: string) {
    return this.authenticatedRequest(`/api/forms/${id}`, {
      method: 'DELETE'
    });
  }
}

export const formsService = new FormsService();
