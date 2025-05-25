import { API_BASE_URL } from './api';

/**
 * Message model representing a contact form submission
 */
export interface Message {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly created_at: string;
  readonly is_read?: boolean;
}

/**
 * Data required to create a new message
 */
export interface CreateMessageDto {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

/**
 * Data for updating an existing message
 */
export interface UpdateMessageDto {
  readonly name?: string;
  readonly email?: string;
  readonly subject?: string;
  readonly message?: string;
  readonly is_read?: boolean;
}

/**
 * Pagination data structure
 */
export interface PaginationData {
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPrevPage: boolean;
}

/**
 * Response format for paginated message data
 */
export interface MessagesResponse {
  readonly messages: readonly Message[];
  readonly pagination: PaginationData;
}

/**
 * Helper function for authenticated API requests
 * @param url - API endpoint path
 * @param options - Fetch options
 */
const authenticatedRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('token');
  
  console.log(`[Messages API] Request to ${url} with token: ${token ? token.substring(0, 10) + '...' : 'none'}`);

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
 * MessageService - ORM-like interface for working with message data
 */
class MessageService {
  /**
   * Get all messages with pagination and optional filtering
   */
  async getAllMessages(page = 1, limit = 100, filter = ''): Promise<MessagesResponse> {
    try {
      // Construct the URL with query parameters
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      if (filter) queryParams.append('filter', filter);
      
      const url = `messages?${queryParams.toString()}`;
      console.log(`Fetching messages with URL: ${url}`);
      
      const response = await authenticatedRequest<any>(url);
      console.log('Received messages response:', response);
      
      // Helper functions for normalizing data
      const normalizeMessage = (message: Record<string, any>): Message => ({
        id: message.id || '',
        name: message.name || '',
        email: message.email || '',
        subject: message.subject || '',
        message: message.message || '',
        created_at: message.created_at || message.createdAt || new Date().toISOString(),
        is_read: typeof message.is_read === 'boolean' ? message.is_read : false
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
      
      // Case 1: response has 'messages' property
      if (response.messages) {
        console.log(`✅ Found ${response.messages.length} messages in response.messages`);
        const normalizedMessages = response.messages.map(normalizeMessage);
        
        return {
          messages: normalizedMessages,
          pagination: response.pagination || createDefaultPagination(normalizedMessages.length)
        };
      }
      
      // Case 2: response has 'data' property (common REST API format)
      if (response.data) {
        const data = Array.isArray(response.data) ? response.data : [response.data];
        console.log(`✅ Found ${data.length} messages in response.data`);
        const normalizedMessages = data.map(normalizeMessage);
        
        return {
          messages: normalizedMessages,
          pagination: response.pagination || response.meta || createDefaultPagination(normalizedMessages.length)
        };
      }
      
      // Case 3: response itself is an array of messages
      if (Array.isArray(response)) {
        console.log(`✅ Response is an array with ${response.length} messages`);
        const normalizedMessages = response.map(normalizeMessage);
        
        return {
          messages: normalizedMessages,
          pagination: createDefaultPagination(normalizedMessages.length)
        };
      }
      
      // Case 4: response has other array properties that might contain messages
      for (const key of Object.keys(response)) {
        if (Array.isArray(response[key])) {
          console.log(`✅ Found array in response[${key}] with ${response[key].length} items`);
          const normalizedMessages = response[key].map(normalizeMessage);
          
          return {
            messages: normalizedMessages,
            pagination: response.pagination || createDefaultPagination(normalizedMessages.length)
          };
        }
      }
      
      // Fallback: empty response
      console.warn('⚠️ Could not find messages data in API response:', response);
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
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Return empty results
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
  }

  /**
   * Get a single message by ID
   */
  async getMessageById(id: string): Promise<Message | null> {
    try {
      console.log(`Getting message details for id: ${id}`);
      const message = await authenticatedRequest<Message>(`messages/${id}`);
      return message || null;
    } catch (error) {
      console.error(`Error fetching message ${id}:`, error);
      return null;
    }
  }

  /**
   * Create a new message
   */
  async createMessage(messageData: CreateMessageDto): Promise<Message | null> {
    try {
      const response = await authenticatedRequest<Message>('messages', {
        method: 'POST',
        body: JSON.stringify(messageData)
      });
      return response;
    } catch (error) {
      console.error('Error creating message:', error);
      return null;
    }
  }

  /**
   * Update an existing message
   */
  async updateMessage(id: string, messageData: UpdateMessageDto): Promise<Message | null> {
    try {
      const response = await authenticatedRequest<Message>(`messages/${id}`, {
        method: 'PUT',
        body: JSON.stringify(messageData)
      });
      return response;
    } catch (error) {
      console.error(`Error updating message ${id}:`, error);
      return null;
    }
  }

  /**
   * Mark a message as read
   */
  async markMessageAsRead(id: string): Promise<Message | null> {
    try {
      console.log('Marking message as read:', id);
      const response = await authenticatedRequest<Message>(`messages/${id}/read`, {
        method: 'PUT',
        body: JSON.stringify({ is_read: true })
      });
      console.log('Mark as read response:', response);
      return response;
    } catch (error) {
      console.error('Error marking message as read:', error);
      return null;
    }
  }

  /**
   * Delete a message
   */
  async deleteMessage(id: string): Promise<boolean> {
    try {
      console.log(`Deleting message with id: ${id}`);
      const response = await authenticatedRequest<{ success: boolean }>(`messages/${id}`, {
        method: 'DELETE'
      });
      return response?.success || false;
    } catch (error) {
      console.error(`Error deleting message ${id}:`, error);
      return false;
    }
  }

  /**
   * Get count of unread messages
   */
  async getUnreadCount(): Promise<number> {
    try {
      const response = await authenticatedRequest<{ count: number }>('messages/unread-count');
      return response?.count || 0;
    } catch (error) {
      console.error('Error getting unread message count:', error);
      return 0;
    }
  }
}

// Create and export a singleton instance
export const messagesService = new MessageService();
export default messagesService;
