import { API_BASE_URL } from './api';

// Helper function for authenticated API requests
const authenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  console.log(`[API] Request to ${url} with token: ${token ? token.substring(0, 10) + '...' : 'none'}`);

  if (!token) {
    // Redirect to login if no token
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
    
    // Prepare headers with token
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    const response = await fetch(fullUrl, {
      ...options,
      headers
    });

    if (!response.ok) {
      let errorData = { message: `HTTP error! status: ${response.status}` };
      try {
        errorData = await response.json();
      } catch (e) {
        errorData.message = response.statusText || errorData.message;
      }
      
      if (response.status === 401) {
        console.error('Authentication error (401): Token might be invalid or expired.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login'; 
        }
      }
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    
    if (response.status === 204) {
        return Promise.resolve({ success: true, message: 'Operation successful (No Content)' });
    }
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${url}:`, error instanceof Error ? error.message : error);
    throw error;
  }
};

// Type definitions
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  date_received: string;
  is_read?: boolean;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface LeadsResponse {
  leads: Lead[];
  pagination: PaginationData;
}

// Leads service
export const leadsService = {
  async markLeadAsRead(id: string): Promise<any> {
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
  
  async getAllLeads(page = 1, limit = 100, filter = ''): Promise<LeadsResponse> {
    try {
      console.log(`🔍 Fetching leads from API: page ${page}, limit ${limit}, filter: ${filter}`);
      
      const fullUrl = `/leads?page=${page}&limit=${limit}${filter ? `&filter=${encodeURIComponent(filter)}` : ''}`;
      console.log(`🔗 Full request URL: ${fullUrl}`);
      
      const response = await authenticatedRequest(fullUrl);
      console.log('📊 Raw API response:', response);
      
      // Process the response based on its structure
      if (!response) {
        console.warn('Empty response received from API');
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
      
      // Check if response has leads property
      if (response.leads) {
        console.log(`✅ Found ${response.leads.length} leads in response.leads`);
        
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
      
      // Check if response itself is an array of leads
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
      
      // Look for an array property in the response that might contain leads
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

  async getLeadById(id: string): Promise<Lead> {
    return authenticatedRequest(`/leads/${id}`);
  },

  async deleteLead(id: string): Promise<any> {
    return authenticatedRequest(`/leads/${id}`, {
      method: 'DELETE'
    });
  }
};

export default leadsService;
