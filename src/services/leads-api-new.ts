import { API_BASE_URL } from './api';

/**
 * Lead model representing a customer inquiry
 */
export interface Lead {
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

/**
 * Data required to create a new lead
 */
export interface CreateLeadDto {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * Data for updating an existing lead
 */
export interface UpdateLeadDto {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  is_read?: boolean;
}

/**
 * Pagination data structure for leads
 */
export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Response format for paginated lead data
 */
export interface LeadsResponse {
  leads: Lead[];
  pagination: PaginationData;
}

/**
 * Helper function for authenticated API requests
 * @param url - API endpoint path
 * @param options - Fetch options
 */
const authenticatedRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
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
  const urlPath = url.startsWith('/') ? url.substring(1) : url;
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
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
        return { success: true, message: 'Operation successful (No Content)' } as unknown as T;
    }
    
    // Parse the JSON response with better error handling
    try {
      const data = await response.json();
      console.log('Response data structure:', Object.keys(data));
      return data as T;
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      return { success: true, message: 'Operation successful, but no JSON response' } as unknown as T;
    }
  } catch (error) {
    console.error(`API request failed for ${url}:`, error instanceof Error ? error.message : error);
    throw error;
  }
};

/**
 * LeadService - ORM-like interface for working with lead data
 */
class LeadService {
  /**
   * Get all leads with pagination and optional filtering
   */
  async getAllLeads(page = 1, limit = 100, filter = ''): Promise<LeadsResponse> {
    try {
      // Construct the URL with query parameters
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      if (filter) queryParams.append('filter', filter);
      
      const url = `leads?${queryParams.toString()}`;
      console.log(`Fetching leads with URL: ${url}`);
      
      const response = await authenticatedRequest<any>(url);
      console.log('Received leads response:', response);
      
      // Helper function for normalizing data
      const normalizeLead = (lead: Record<string, any>): Lead => ({
        id: lead.id || '',
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        subject: lead.subject || '',
        message: lead.message || '',
        created_at: lead.created_at || lead.createdAt || new Date().toISOString(),
        date_received: lead.date_received || lead.dateReceived || lead.created_at || lead.createdAt || new Date().toISOString(),
        is_read: typeof lead.is_read === 'boolean' ? lead.is_read : false
      });
      
      // Create default pagination if needed
      const createDefaultPagination = (itemsCount: number): PaginationData => ({
        total: itemsCount,
        page,
        limit,
        totalPages: Math.ceil(itemsCount / limit),
        hasNextPage: itemsCount > page * limit,
        hasPrevPage: page > 1
      });
      
      // Handle different response formats
      
      // Case 1: response has 'leads' property
      if (response && response.leads) {
        console.log(`✅ Found ${response.leads.length} leads in response.leads`);
        const normalizedLeads = response.leads.map(normalizeLead);
        
        return {
          leads: normalizedLeads,
          pagination: response.pagination || createDefaultPagination(normalizedLeads.length)
        };
      }
      
      // Case 2: response has 'data' property (common REST API format)
      if (response && response.data) {
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
      if (response) {
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
      }
      
      // Case 5: Response is a single lead object
      if (response && typeof response === 'object' && !Array.isArray(response) &&
          (response.name || response.email || response.message)) {
        console.log('✅ Response appears to be a single lead object');
        const normalizedLead = normalizeLead(response);
        
        return {
          leads: [normalizedLead],
          pagination: createDefaultPagination(1)
        };
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
  }

  /**
   * Get a single lead by ID
   */
  async getLeadById(id: string): Promise<Lead | null> {
    try {
      console.log(`Getting lead details for id: ${id}`);
      const lead = await authenticatedRequest<Lead>(`leads/${id}`);
      return lead || null;
    } catch (error) {
      console.error(`Error fetching lead ${id}:`, error);
      return null;
    }
  }

  /**
   * Create a new lead
   */
  async createLead(leadData: CreateLeadDto): Promise<Lead | null> {
    try {
      const response = await authenticatedRequest<Lead>('leads', {
        method: 'POST',
        body: JSON.stringify(leadData)
      });
      return response;
    } catch (error) {
      console.error('Error creating lead:', error);
      return null;
    }
  }

  /**
   * Update an existing lead
   */
  async updateLead(id: string, leadData: UpdateLeadDto): Promise<Lead | null> {
    try {
      const response = await authenticatedRequest<Lead>(`leads/${id}`, {
        method: 'PUT',
        body: JSON.stringify(leadData)
      });
      return response;
    } catch (error) {
      console.error(`Error updating lead ${id}:`, error);
      return null;
    }
  }

  /**
   * Mark a lead as read
   */
  async markLeadAsRead(id: string): Promise<Lead | null> {
    try {
      console.log('Marking lead as read:', id);
      const response = await authenticatedRequest<Lead>(`leads/${id}/read`, {
        method: 'PUT',
        body: JSON.stringify({ is_read: true })
      });
      console.log('Mark as read response:', response);
      return response;
    } catch (error) {
      console.error('Error marking lead as read:', error);
      return null;
    }
  }

  /**
   * Delete a lead
   */
  async deleteLead(id: string): Promise<boolean> {
    try {
      console.log(`Deleting lead with id: ${id}`);
      const response = await authenticatedRequest<{ success: boolean }>(`leads/${id}`, {
        method: 'DELETE'
      });
      return response?.success || false;
    } catch (error) {
      console.error(`Error deleting lead ${id}:`, error);
      return false;
    }
  }

  /**
   * Get count of unread leads
   */
  async getUnreadCount(): Promise<number> {
    try {
      const response = await authenticatedRequest<{ count: number }>('leads/unread-count');
      return response?.count || 0;
    } catch (error) {
      console.error('Error getting unread lead count:', error);
      return 0;
    }
  }
}

// Create and export a singleton instance
export const leadsService = new LeadService();
export default leadsService;
