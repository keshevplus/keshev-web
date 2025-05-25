import { API_BASE_URL } from './api';

// Helper function for authenticated API requests
const authenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  console.log(`[Leads API] Request to ${url} with token: ${token ? token.substring(0, 10) + '...' : 'none'}`);

  if (!token) {
    // Redirect to login if no token
    if (typeof window !== 'undefined') {
      console.error('No authentication token found, redirecting to login');
      window.location.href = '/admin/login'; 
    }
    throw new Error('No token, authorization denied. Please log in.');
  }

  // Ensure correct API endpoint construction
  // Strip leading slash from the path part (if present) to avoid double slashes
  const urlPath = url.startsWith('/') ? url.substring(1) : url;
  // Ensure API_BASE_URL doesn't have a trailing slash
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  // Construct the full URL
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}/${urlPath}`;

  try {
    console.log(`🔎 Making API request to: ${fullUrl}`);
    
    // Prepare headers with token - using both formats for compatibility
    const headers = {
      'Authorization': `Bearer ${token}`,
      'x-auth-token': token,
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    console.log(`Request details: ${options.method || 'GET'} ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      ...options,
      headers
    });

    console.log(`Response status: ${response.status} ${response.statusText}`);

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
    
    // Parse the JSON response with better error handling
    try {
      const data = await response.json();
      console.log('Response data structure:', Object.keys(data));
      return data;
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      return { success: true, message: 'Operation successful, but no JSON response' };
    }
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
      // Ensure consistent path format for the API endpoint
      const response = await authenticatedRequest(`leads/${id}/read`, {
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
      
      // Format the query parameters consistently
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      
      if (filter) {
        queryParams.append('filter', filter);
      }
      
      // The API endpoint should be 'leads' (not '/api/leads' since the base URL already includes /api)
      const endpoint = `leads?${queryParams.toString()}`;
      console.log(`🔗 API endpoint: ${endpoint}`);
      
      const response = await authenticatedRequest(endpoint);
      console.log('📊 API response received:', typeof response);
      
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
      
      // Simple response normalization function
      const normalizeLead = (lead: Record<string, any>) => ({
        ...lead,
        id: lead.id || lead._id || `temp-${Date.now()}`, // Ensure ID exists
        is_read: typeof lead.is_read === 'boolean' ? lead.is_read : false, // Ensure read status
        // Add any other required normalization here
        name: lead.name || 'Unknown',
        email: lead.email || '',
        phone: lead.phone || '',
        subject: lead.subject || '',
        message: lead.message || '',
        created_at: lead.created_at || lead.createdAt || new Date().toISOString(),
        date_received: lead.date_received || lead.dateReceived || lead.created_at || lead.createdAt || new Date().toISOString()
      });
      
      // Create default pagination if needed
      const createDefaultPagination = (itemsCount: number) => ({
        total: itemsCount,
        page,
        limit,
        totalPages: Math.ceil(itemsCount / limit),
        hasNextPage: itemsCount > page * limit,
        hasPrevPage: page > 1
      });
      
      // Handle different response formats
      
      // Case 1: response has 'leads' property (most likely format)
      if (response.leads) {
        console.log(`✅ Found ${response.leads.length} leads in response.leads`);
        const normalizedLeads = response.leads.map(normalizeLead);
        
        return {
          leads: normalizedLeads,
          pagination: response.pagination || createDefaultPagination(normalizedLeads.length)
        };
      }
      
      // Case 2: response has 'data' property (common REST API format)
      if (response.data) {
        const data = Array.isArray(response.data) ? response.data : [response.data];
        console.log(`✅ Found ${data.length} leads in response.data`);
        const normalizedLeads = data.map(normalizeLead);
        
        return {
          leads: normalizedLeads,
          pagination: response.pagination || response.meta || createDefaultPagination(normalizedLeads.length)
        };
      }
      
      // Case 3: response itself is an array of leads
      if (Array.isArray(response)) {
        console.log(`✅ Response is an array with ${response.length} leads`);
        const normalizedLeads = response.map(normalizeLead);
        
        return {
          leads: normalizedLeads,
          pagination: createDefaultPagination(normalizedLeads.length)
        };
      }
      
      // Case 4: response has other array properties that might contain leads
      for (const key of Object.keys(response)) {
        if (Array.isArray(response[key])) {
          console.log(`✅ Found array in response[${key}] with ${response[key].length} items`);
          const normalizedLeads = response[key].map(normalizeLead);
          
          return {
            leads: normalizedLeads,
            pagination: response.pagination || createDefaultPagination(normalizedLeads.length)
          };
        }
      }
      
      // Case 5: Response is a single lead object
      if (typeof response === 'object' && response !== null && !Array.isArray(response)) {
        // Check if it has typical lead properties
        if (response.name || response.email || response.message) {
          console.log('✅ Response appears to be a single lead object');
          const normalizedLead = normalizeLead(response);
          
          return {
            leads: [normalizedLead],
            pagination: createDefaultPagination(1)
          };
        }
      }
      
      // Fallback: empty response
      console.warn('⚠️ Could not find leads data in API response:', response);
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
    console.log(`Getting lead details for id: ${id}`);
    return authenticatedRequest(`leads/${id}`);
  },

  async deleteLead(id: string): Promise<any> {
    console.log(`Deleting lead with id: ${id}`);
    return authenticatedRequest(`leads/${id}`, {
      method: 'DELETE'
    });
  }
};

export default leadsService;
