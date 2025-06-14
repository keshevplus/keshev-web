<<<<<<< HEAD
// TypeScript declaration for Vite's import.meta.env
declare interface ImportMeta {
  readonly env: {
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly MODE: string;
    readonly VITE_DEV_ADMIN_EMAIL?: string;
    [key: string]: string | boolean | undefined;
  };
}

// In development, use the local proxy server to bypass CORS issues
const IS_DEV = import.meta.env.DEV;

// Local proxy server that forwards requests to the real API but bypasses CORS issues
const PROXY_URL = import.meta.env.VITE_PROXY_URL || 'http://localhost:3000/api';

// Choose API URL based on environment - proxy for dev, real API for production
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export const DEV_ADMIN_TOKEN = 'dev-admin-token-xyz'; // The token set by AuthContext for the dev admin

// Log API configuration on startup
console.log(`[API Config] Using API at: ${API_BASE_URL} (${IS_DEV ? 'Development' : 'Production'} mode)`);

// Export all services
export * from './services/PagesService';
export * from './services/ServicesService';
export * from './services/FormsService';
export * from './services/ContentService';
export * from './services/MessagesService';
export * from './services/AuthService';
=======
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function for authenticated API requests
const authenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token, authorization denied');
  }

  const fullUrl = url.startsWith('http')
    ? url
    : `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;

  try {
    const response = await fetch(fullUrl, {
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
    return authenticatedRequest(`${API_BASE_URL}/admin/pages`);
  },

  async createPage(pageData: any) {
    return authenticatedRequest(`${API_BASE_URL}/admin/pages`, {
      method: 'POST',
      body: JSON.stringify(pageData)
    });
  },

  async updatePage(id: string, pageData: any) {
    return authenticatedRequest(`${API_BASE_URL}/admin/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pageData)
    });
  }
};

// Services service
export const servicesService = {
  async getAllServices() {
    return authenticatedRequest(`${API_BASE_URL}/admin/services`);
  },

  async createService(serviceData: any) {
    return authenticatedRequest(`${API_BASE_URL}/admin/services`, {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
  },

  async updateService(id: string, serviceData: any) {
    return authenticatedRequest(`${API_BASE_URL}/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData)
    });
  },

  async deleteService(id: string) {
    return authenticatedRequest(`${API_BASE_URL}/admin/services/${id}`, {
      method: 'DELETE'
    });
  }
};

// Forms service
export const formsService = {
  async getAllForms() {
    return authenticatedRequest(`${API_BASE_URL}/admin/forms`);
  },

  async createForm(formData: any) {
    return authenticatedRequest(`${API_BASE_URL}/admin/forms`, {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  },

  async updateForm(id: string, formData: any) {
    return authenticatedRequest(`${API_BASE_URL}/admin/forms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData)
    });
  },

  async deleteForm(id: string) {
    return authenticatedRequest(`${API_BASE_URL}/admin/forms/${id}`, {
      method: 'DELETE'
    });
  }
};

// Content service
export const contentService = {
  async getAllContent(page = 1, limit = 10, filter = '') {
    return authenticatedRequest(`${API_BASE_URL}/admin/content?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`);
  },

  async getContentById(id: string) {
    return authenticatedRequest(`${API_BASE_URL}/admin/content/${id}`);
  },

  async createContent(contentData: any) {
    return authenticatedRequest(`${API_BASE_URL}/admin/content`, {
      method: 'POST',
      body: JSON.stringify(contentData)
    });
  },

  async updateContent(id: string, contentData: any) {
    return authenticatedRequest(`${API_BASE_URL}/admin/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contentData)
    });
  },

  async deleteContent(id: string) {
    return authenticatedRequest(`${API_BASE_URL}/api/content/${id}`, {
      method: 'DELETE'
    });
  }
};

// Leads service
export const leadsService = {
  async getAllLeads(page = 1, limit = 10, filter = '') {
    return authenticatedRequest(`${API_BASE_URL}/admin/leads?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`);
  },

  async getLeadById(id: string) {
    return authenticatedRequest(`${API_BASE_URL}/admin/leads/${id}`);
  },

  async deleteLead(id: string) {
    return authenticatedRequest(`${API_BASE_URL}/admin/leads/${id}`, {
      method: 'DELETE'
    });
  }
};
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
