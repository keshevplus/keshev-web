import { IPagination } from './IPagination';

/**
 * Lead model representing a customer inquiry
 */
export interface ILead {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  date_received: string;
  is_read?: boolean;
  user_id?: string | null;
  previous_message_count?: number;
}

/**
 * Data required to create a new lead
 */
export interface ICreateLeadDto {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * Data for updating an existing lead
 */
export interface IUpdateLeadDto {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  is_read?: boolean;
}

/**
 * Response format for paginated lead data
 */
export interface ILeadsResponse {
  leads: ILead[];
  pagination: IPagination;
}
