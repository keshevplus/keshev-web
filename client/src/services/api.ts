// Helper function for authenticated API requests
const authenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token, authorization denied');
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      // If token is invalid, clear local storage to force re-login
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/admin/login'; // Redirect to login
      }
      throw new Error(errorData.message || 'Error with API request');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
};

// Pages service
export const pagesService = {
  async getAllPages() {
    return authenticatedRequest('/api/admin/pages');
  },

  async createPage(pageData: any) {
    return authenticatedRequest('/api/admin/pages', {
      method: 'POST',
      body: JSON.stringify(pageData)
    });
  },

  async updatePage(id: string, pageData: any) {
    return authenticatedRequest(`/api/admin/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pageData)
    });
  }
};

// Services service
export const servicesService = {
  async getAllServices() {
    return authenticatedRequest('/api/admin/services');
  },

  async createService(serviceData: any) {
    return authenticatedRequest('/api/admin/services', {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
  },

  async updateService(id: string, serviceData: any) {
    return authenticatedRequest(`/api/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData)
    });
  },

  async deleteService(id: string) {
    return authenticatedRequest(`/api/admin/services/${id}`, {
      method: 'DELETE'
    });
  }
};

// Forms service
export const formsService = {
  async getAllForms() {
    return authenticatedRequest('/api/admin/forms');
  },

  async createForm(formData: any) {
    return authenticatedRequest('/api/admin/forms', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  },

  async updateForm(id: string, formData: any) {
    return authenticatedRequest(`/api/admin/forms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData)
    });
  },

  async deleteForm(id: string) {
    return authenticatedRequest(`/api/admin/forms/${id}`, {
      method: 'DELETE'
    });
  }
};

// Content service
export const contentService = {
  async getAllContent(page = 1, limit = 10, filter = '') {
    return authenticatedRequest(`/api/admin/content?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`);
  },

  async getContentById(id: string) {
    return authenticatedRequest(`/api/admin/content/${id}`);
  },

  async createContent(contentData: any) {
    return authenticatedRequest('/api/admin/content', {
      method: 'POST',
      body: JSON.stringify(contentData)
    });
  },

  async updateContent(id: string, contentData: any) {
    return authenticatedRequest(`/api/admin/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contentData)
    });
  },

  async deleteContent(id: string) {
    return authenticatedRequest(`/api/admin/content/${id}`, {
      method: 'DELETE'
    });
  }
};

// Leads service
export const leadsService = {
  async getAllLeads(page = 1, limit = 10, filter = '') {
    return authenticatedRequest(`/api/admin/leads?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`);
  },

  async getLeadById(id: string) {
    return authenticatedRequest(`/api/admin/leads/${id}`);
  },

  async deleteLead(id: string) {
    return authenticatedRequest(`/api/admin/leads/${id}`, {
      method: 'DELETE'
    });
  }
};