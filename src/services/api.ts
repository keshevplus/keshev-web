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
const PROXY_URL = 'http://localhost:3001/api';

// Choose API URL based on environment - proxy for dev, real API for production
export const API_BASE_URL = IS_DEV ? PROXY_URL : 'https://api.keshevplus.co.il';
export const DEV_ADMIN_TOKEN = 'dev-admin-token-xyz'; // The token set by AuthContext for the dev admin

// Log API configuration on startup
console.log(`[API Config] Using API at: ${API_BASE_URL} (${IS_DEV ? 'Development' : 'Production'} mode)`);

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
    return authenticatedRequest(`${API_BASE_URL}/api/pages`);
  },

  async createPage(pageData: any) {
    return authenticatedRequest(`${API_BASE_URL}/api/pages`, {
      method: 'POST',
      body: JSON.stringify(pageData)
    });
  },

  async updatePage(id: string, pageData: any) {
    return authenticatedRequest(`${API_BASE_URL}/api/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pageData)
    });
  }
};

// Services service
export const servicesService = {
  async getAllServices() {
    return authenticatedRequest(`${API_BASE_URL}/api/services`);
  },

  async createService(serviceData: any) {
    return authenticatedRequest(`${API_BASE_URL}/api/services`, {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
  },

  async updateService(id: string, serviceData: any) {
    return authenticatedRequest(`${API_BASE_URL}/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData)
    });
  },

  async deleteService(id: string) {
    return authenticatedRequest(`${API_BASE_URL}/api/services/${id}`, {
      method: 'DELETE'
    });
  }
};

// Forms service
export const formsService = {
  async getAllForms() {
    return authenticatedRequest(`${API_BASE_URL}/api/forms`);
  },

  async createForm(formData: any) {
    return authenticatedRequest(`${API_BASE_URL}/api/forms`, {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  },

  async updateForm(id: string, formData: any) {
    return authenticatedRequest(`${API_BASE_URL}/api/forms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData)
    });
  },

  async deleteForm(id: string) {
    return authenticatedRequest(`${API_BASE_URL}/api/forms/${id}`, {
      method: 'DELETE'
    });
  }
};

// Content service
export const contentService = {
  async getAllContent(page = 1, limit = 10, filter = '') {
    return authenticatedRequest(`${API_BASE_URL}/api/content?page=${page}&limit=${limit}&filter=${encodeURIComponent(filter)}`);
  },

  async getContentById(id: string) {
    return authenticatedRequest(`${API_BASE_URL}/api/content/${id}`);
  },

  async createContent(contentData: any) {
    return authenticatedRequest(`${API_BASE_URL}/api/content`, {
      method: 'POST',
      body: JSON.stringify(contentData)
    });
  },

  async updateContent(id: string, contentData: any) {
    return authenticatedRequest(`${API_BASE_URL}/api/content/${id}`, {
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
  async markMessageAsRead(id: string) {
    try {
      const response = await authenticatedRequest(`/messages/${id}/read`, {
        method: 'PUT',
        body: JSON.stringify({ is_read: true })
      });
      
      console.log('✅ Message marked as read:', id);
      return response;
    } catch (error) {
      console.error('❌ Error marking message as read:', error);
      throw error;
    }
  },
  
  async getAllMessages(page = 1, limit = 100, filter = '') {
    try {
      // First attempt to fetch from the real API
      try {
        const response = await authenticatedRequest(`/messages?page=${page}&limit=${limit}&filter=${filter}`);
        
        console.log('📈 API Response for messages:', response);
        console.log('📈 Response type:', typeof response);
        console.log('📈 Response structure:', Object.keys(response || {}));
        
        // Add debug for specific checks of the response
        if (response === null || response === undefined) {
          console.warn('⚠️ Messages API returned null or undefined response');
          throw new Error('Empty response from messages API');
        }
        
        // Process and normalize the response
        if (response && typeof response === 'object') {
          // Case 1: Response has a messages property that is an array
          if (response.messages && Array.isArray(response.messages)) {
            console.log(`✅ Retrieved ${response.messages.length} messages from API (with messages property)`);
            
            // Ensure each message has an is_read property (default to false if missing)
            const normalizedMessages = response.messages.map((msg: { id: string; name: string; email: string; subject: string; message: string; created_at: string; is_read?: boolean }) => ({
              ...msg,
              is_read: typeof msg.is_read === 'boolean' ? msg.is_read : false
            }));
            
            return {
              messages: normalizedMessages,
              pagination: response.pagination || {
                total: normalizedMessages.length,
                page,
                limit,
                totalPages: Math.ceil(normalizedMessages.length / limit),
                hasNextPage: normalizedMessages.length > page * limit,
                hasPrevPage: page > 1
              }
            };
          }
          // Case 2: Response is an array (array of messages directly)
          else if (Array.isArray(response)) {
            console.log(`✅ Retrieved ${response.length} messages from API (array format)`);
            
            // Ensure each message has an is_read property (default to false if missing)
            const normalizedMessages = response.map(msg => ({
              ...msg,
              is_read: typeof msg.is_read === 'boolean' ? msg.is_read : false
            }));
            
            return { 
              messages: normalizedMessages, 
              pagination: { 
                total: normalizedMessages.length, 
                page, 
                limit, 
                totalPages: Math.ceil(normalizedMessages.length / limit),
                hasNextPage: normalizedMessages.length > page * limit,
                hasPrevPage: page > 1
              }
            };
          }
          // Case 3: Response might have data in a different property
          else {
            // Look for any array property that might contain messages
            for (const key of Object.keys(response)) {
              if (Array.isArray(response[key])) {
                console.log(`✅ Found potential messages array in property '${key}' with ${response[key].length} items`);
                
                // Ensure each message has an is_read property (default to false if missing)
                const normalizedMessages = response[key].map(msg => ({
                  ...msg,
                  is_read: typeof msg.is_read === 'boolean' ? msg.is_read : false
                }));
                
                return {
                  messages: normalizedMessages,
                  pagination: response.pagination || {
                    total: normalizedMessages.length,
                    page,
                    limit,
                    totalPages: Math.ceil(normalizedMessages.length / limit),
                    hasNextPage: normalizedMessages.length > page * limit,
                    hasPrevPage: page > 1
                  }
                };
              }
            }
          }
        } else {
          // Initialize empty response format if needed
          console.log('⚠️ No messages found in API response, returning empty array');
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
      } catch (innerError) {
        // Handle fetch errors without trying to clear a non-existent timeout
        console.error('Error in messages API request:', innerError);
        throw innerError;
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
    // Correct endpoint to match the backend route structure
    return authenticatedRequest(`/messages/${id}`);
  },

  async deleteMessage(id: string) {
    // Correct endpoint to match the backend route structure
    return authenticatedRequest(`/messages/${id}`, {
      method: 'DELETE'
    });
  }
};

// Leads service
export const leadsService = {
  async markLeadAsRead(id: string) {
    try {
      console.log('Marking lead as read:', id);
      const response = await authenticatedRequest(`/leads/${id}/read`, {
        method: 'PUT',
        body: JSON.stringify({ is_read: true })
      });
      console.log('Mark as read response:', response);
      return response;
    } catch (error) {
      console.error('Error marking lead as read:', error);
      throw error;
    }
  },
  
  async getAllLeads(page = 1, limit = 100, filter = '') {
    try {
      console.log(`🔍 Fetching leads from API: page ${page}, limit ${limit}, filter: ${filter}`);
      
      const fullUrl = `/leads?page=${page}&limit=${limit}${filter ? `&filter=${encodeURIComponent(filter)}` : ''}`;
      console.log(`🔗 Full request URL: ${fullUrl}`);
      
      const response = await authenticatedRequest(fullUrl);
      console.log('📊 Raw API response:', response);
      console.log('📈 Response structure:', Object.keys(response || {}));
      
      // Add debug for specific checks of the response
      if (response === null || response === undefined) {
        console.warn('⚠️ Leads API returned null or undefined response');
        throw new Error('Empty response from leads API');
      }
      
      // Process and normalize the response based on response structure
      // Case 1: Response has a leads property that is an array
      if (response.leads && Array.isArray(response.leads)) {
        console.log(`✅ Retrieved ${response.leads.length} leads from API (with leads property)`);
        
        // Ensure each lead has an is_read property (default to false if missing)
        const normalizedLeads = response.leads.map((lead: Record<string, any>) => ({
          ...lead,
          is_read: typeof lead.is_read === 'boolean' ? lead.is_read : false
        }));
        
        return {
          leads: normalizedLeads,
          pagination: response.pagination || {
            total: normalizedLeads.length,
            page,
            limit,
            totalPages: Math.ceil(normalizedLeads.length / limit),
            hasNextPage: normalizedLeads.length > page * limit,
            hasPrevPage: page > 1
          }
        };
      }
      
      // Case 2: Response itself is an array of leads
      if (Array.isArray(response)) {
        console.log(`✅ Response is an array with ${response.length} leads`);
        
        // Ensure each lead has an is_read property (default to false if missing)
        const normalizedLeads = response.map((lead: Record<string, any>) => ({
          ...lead,
          is_read: typeof lead.is_read === 'boolean' ? lead.is_read : false
        }));
        
        return {
          leads: normalizedLeads,
          pagination: {
            total: normalizedLeads.length,
            page,
            limit,
            totalPages: Math.ceil(normalizedLeads.length / limit),
            hasNextPage: normalizedLeads.length > page * limit,
            hasPrevPage: page > 1
          }
        };
      }
      
      // Case 3: Look for an array property in the response that might contain leads
      for (const key of Object.keys(response)) {
        if (Array.isArray(response[key])) {
          console.log(`✅ Found array in response[${key}] with ${response[key].length} items`);
          
          // Ensure each lead has an is_read property (default to false if missing)
          const normalizedLeads = response[key].map((lead: Record<string, any>) => ({
            ...lead,
            is_read: typeof lead.is_read === 'boolean' ? lead.is_read : false
          }));
          
          return {
            leads: normalizedLeads,
            pagination: response.pagination || {
              total: normalizedLeads.length,
              page,
              limit,
              totalPages: Math.ceil(normalizedLeads.length / limit),
              hasNextPage: normalizedLeads.length > page * limit,
              hasPrevPage: page > 1
            }
          };
        }
      }
      
      // Fallback: empty response
      console.warn('⚠️ Could not find leads data in API response');
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
    } catch (error) {
      console.error('Error fetching leads:', error);
      // Return empty results
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
    // Correct endpoint to match the backend route structure
    return authenticatedRequest(`/leads/${id}`);
  },

  async deleteLead(id: string) {
    // Correct endpoint to match the backend route structure
    return authenticatedRequest(`/leads/${id}`, {
      method: 'DELETE'
    });
  },
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
