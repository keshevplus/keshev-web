import BaseApiService from '../base/BaseApiService';

class ServicesService extends BaseApiService {
  async getAllServices() {
    return this.authenticatedRequest('/api/services');
  }

  async createService(serviceData: any) {
    return this.authenticatedRequest('/api/services', {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
  }

  async updateService(id: string, serviceData: any) {
    return this.authenticatedRequest(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData)
    });
  }

  async deleteService(id: string) {
    return this.authenticatedRequest(`/api/services/${id}`, {
      method: 'DELETE'
    });
  }
}

export const servicesService = new ServicesService();
