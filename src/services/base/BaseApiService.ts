import { API_URL } from '../../config/constants';

/**
 * Base class for all API services with authentication support
 */
export class BaseApiService {
  protected baseUrl: string;

  constructor(baseUrl = API_URL) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }
  
  /**
   * Helper function for authenticated API requests
   * @param url - API endpoint path
   * @param options - Fetch options
   */
  protected async authenticatedRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('token');
    
    console.log(`[API Request] ${url} with token: ${token ? token.substring(0, 10) + '...' : 'none'}`);

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
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}/${urlPath}`;

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
        return data as T;
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        return { success: true, message: 'Operation successful, but no JSON response' } as unknown as T;
      }
    } catch (error) {
      console.error(`API request failed for ${url}:`, error instanceof Error ? error.message : error);
      throw error;
    }
  }
}

export default BaseApiService;
