import { BaseApiService } from './base/BaseApiService';
import { 
  ILead, 
  ICreateLeadDto, 
  IUpdateLeadDto, 
  ILeadsResponse 
} from '../models/interfaces/ILead';

/**
 * LeadService - ORM-like interface for working with lead data
 */
export class LeadService extends BaseApiService {
  /**
   * Get all leads with pagination and optional filtering
   */
  async getAllLeads(page = 1, limit = 100, filter = ''): Promise<ILeadsResponse> {
    try {
      // Construct the URL with query parameters
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      if (filter) queryParams.append('filter', filter);
      
      const url = `leads?${queryParams.toString()}`;
      console.log(`Fetching leads with URL: ${url}`);
      
      const response = await this.authenticatedRequest<any>(url);
      console.log('Received leads response:', response);
      
      // Helper function for normalizing data
      const normalizeLead = (lead: Record<string, any>): ILead => ({
        id: lead.id || '',
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        subject: lead.subject || '',
        message: lead.message || '',
        created_at: lead.created_at || lead.createdAt || new Date().toISOString(),
        is_read: typeof lead.is_read === 'boolean' ? lead.is_read : false,
        user_id: lead.user_id || null,
        previous_message_count: lead.previous_message_count || 0
      });
      
      // Create default pagination
      const createDefaultPagination = (itemsCount: number) => ({
        total: itemsCount,
        page,
        limit,
        totalPages: Math.ceil(itemsCount / limit),
        hasNextPage: itemsCount > page * limit,
        hasPrevPage: page > 1
      });
      
      // Handle different response formats
      if (response && response.leads) {
        const normalizedLeads = response.leads.map(normalizeLead);
        return {
          leads: normalizedLeads,
          pagination: response.pagination || createDefaultPagination(normalizedLeads.length)
        };
      }
      
      // Handle other response formats...
      // ...existing code for other response formats...
      
      // Fallback: empty response
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
      // Return empty results on error
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
  async getLeadById(id: string): Promise<ILead | null> {
    try {
      console.log(`Getting lead details for id: ${id}`);
      const lead = await this.authenticatedRequest<ILead>(`leads/${id}`);
      return lead || null;
    } catch (error) {
      console.error(`Error fetching lead ${id}:`, error);
      return null;
    }
  }

  /**
   * Mark a lead as read
   */
  async markLeadAsRead(id: string): Promise<ILead | null> {
    try {
      console.log('Marking lead as read:', id);
      const response = await this.authenticatedRequest<ILead>(`leads/${id}/read`, {
        method: 'PUT',
        body: JSON.stringify({ is_read: true })
      });
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
      const response = await this.authenticatedRequest<{ success: boolean }>(`leads/${id}`, {
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
      const response = await this.authenticatedRequest<{ count: number }>('leads/unread-count');
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
