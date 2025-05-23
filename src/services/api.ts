// In development, use the local proxy server to bypass CORS issues
const IS_DEV = import.meta.env.DEV;

// Local proxy server that forwards requests to the real API but bypasses CORS issues
const PROXY_URL = 'http://localhost:3001/api';

// Choose API URL based on environment - proxy for dev, real API for production
export const API_BASE_URL = IS_DEV ? PROXY_URL : import.meta.env.VITE_API_BASE_URL;
export const DEV_ADMIN_TOKEN = 'dev-admin-token-xyz'; // The token set by AuthContext for the dev admin

// Helper function for authenticated API requests
const authenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  console.log(`[API] Request to ${url} with token: ${token ? token.substring(0, 10) + '...' : 'none'}`);

  // IMPORTANT: Always make real API calls to fetch real data, regardless of token
  // Log if using dev token, but don't return mock data
  if (token === 'dev-admin-token-xyz') {
    console.warn(`DEV ADMIN MODE: Making real API call to ${url} despite using dev token`);
  }

  if (!token) {
    // No real token and not dev admin token. Redirect to login.
    // Ensure this runs only on the client-side if this code could ever be part of SSR/SSG.
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login'; 
    }
    throw new Error('No token, authorization denied. Please log in.');
  }

  const fullUrl = url.startsWith('http')
    ? url
    : `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;

  try {
    console.log(`🔎 Making API request to: ${fullUrl}`);
    console.log(`🔑 Using auth token: ${token ? token.substring(0, 10) + '...' : 'none'}`);
    
    // Prepare headers with both token formats for maximum compatibility
    const headers = {
      'x-auth-token': token, // Ensure your backend expects 'x-auth-token'
      'Authorization': `Bearer ${token}`, // Add Bearer token format too for API compatibility
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    // Log the final request details
    console.log('💬 Request headers:', Object.keys(headers));
    console.log('💬 Request method:', options.method || 'GET');
    
    const response = await fetch(fullUrl, {
      ...options,
      headers
    });

    if (!response.ok) {
      let errorData = { message: `HTTP error! status: ${response.status}` };
      try {
        // Attempt to parse JSON error response from backend
        errorData = await response.json();
      } catch (e) {
        // If response is not JSON, use the status text or the generic message
        errorData.message = response.statusText || errorData.message;
      }
      
      if (response.status === 401) { // Unauthorized or Token is not valid
        console.error('Authentication error (401): Token might be invalid or expired.');
        // Clear potentially invalid token and user from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login'; 
        }
      }
      // Include more details in the error if available from errorData
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    
    // Handle cases where response might be empty (e.g., 204 No Content for DELETE)
    if (response.status === 204) {
        return Promise.resolve({ success: true, message: 'Operation successful (No Content)' });
    }
    return await response.json();
  } catch (error) {
    // Log the detailed error object, not just error.message if it's an Error instance
    console.error(`API request failed for ${url}:`, error instanceof Error ? error.message : error);
    throw error; // Re-throw the error to be caught by the calling service/component
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

// Messages service
export const messagesService = {
  async getAllMessages(page = 1, limit = 10, filter = '') {
    try {
      // Fix endpoint to correctly match the backend route structure
      // The API_BASE_URL already includes '/api', so we need to use the correct path
      const messageApiUrl = `/api/messages?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`;
      console.log('📞 Making messages API request to:', messageApiUrl);
      
      // Make real API call with the correct endpoint
      const response = await authenticatedRequest(messageApiUrl);
      console.log('📊 API Response for messages:', response);
      
      // Return the API response (even if empty)
      if (response && response.messages) {
        console.log(`✅ Retrieved ${response.messages.length} messages from API`);
        return response;
      } else {
        // Initialize empty response format if needed
        console.log('No messages found in API response, returning empty array');
        return { 
          messages: [], 
          pagination: { 
            total: 0, 
            page, 
            limit, 
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false
          }
        };
      }
    } catch (error) {
      console.error('Error in getAllMessages:', error);
      // Return empty results instead of mock data
      return { 
        messages: [], 
        pagination: { 
          total: 0, 
          page, 
          limit, 
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false
        }
      };
    }
  },

  async getMessageById(id: string) {
    // Fix endpoint to correctly match the backend route structure
    return authenticatedRequest(`/api/messages/${id}`);
  },

  async deleteMessage(id: string) {
    // Fix endpoint to correctly match the backend route structure
    return authenticatedRequest(`/api/messages/${id}`, {
      method: 'DELETE'
    });
  }
};

// Leads service
export const leadsService = {
  async getAllLeads(page = 1, limit = 10, filter = '') {
    try {
      // Fix endpoint to correctly match the backend route structure
      // The API_BASE_URL already includes '/api', so we need to use the correct path
      const leadApiUrl = `/api/leads?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`;
      console.log('📞 Making leads API request to:', leadApiUrl);
      
      // Make real API call with the correct endpoint
      const response = await authenticatedRequest(leadApiUrl);
      console.log('📊 API Response for leads:', response);
      
      // Return the API response (even if empty)
      if (response && response.leads) {
        console.log(`✅ Retrieved ${response.leads.length} leads from API`);
        return response;
      } else {
        // Initialize empty response format if needed
        console.log('No leads found in API response, returning empty array');
        return { 
          leads: [], 
          pagination: { 
            total: 0, 
            page, 
            limit, 
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false
          }
        };
      }
    } catch (error) {
      console.error('Error in getAllLeads:', error);
      // Return empty results instead of mock data
      return { 
        leads: [], 
        pagination: { 
          total: 0, 
          page, 
          limit, 
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false
        }
      };
    }
  },

  async getLeadById(id: string) {
    // Fix endpoint to correctly match the backend route structure
    return authenticatedRequest(`/api/leads/${id}`);
  },

  async deleteLead(id: string) {
    // Fix endpoint to correctly match the backend route structure
    return authenticatedRequest(`/api/leads/${id}`, {
      method: 'DELETE'
    });
  }
};

// Auth service for admin users
export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password_hash: password }),
      });
      
      console.log('Login API response status:', response.status);
      const data = await response.json();
      if (!response.ok) {
        console.error('Login failed:', data);
        throw new Error(data?.message || `Login failed with status ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('API login error:', error);
      throw error;
    }
  },
  
  async registerTestAdmin(email: string, password: string, username: string) {
    // This is only for development purposes
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    try {
      // For development, we'll create a test admin directly
      // In production, we would call the API
      const testAdminData = {
        token: `test-admin-${Date.now()}`,
        user: {
          id: 1000,
          username: username || 'Test Admin',
          email: email,
          role: 'admin'
        }
      };
      
      // Store in localStorage to simulate a real login
      localStorage.setItem('token', testAdminData.token);
      localStorage.setItem('user', JSON.stringify(testAdminData.user));
      
      return testAdminData;
    } catch (error) {
      console.error('Error creating test admin:', error);
      throw error;
    }
  }
};