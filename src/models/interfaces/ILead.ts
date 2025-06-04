import { IPagination } from './IPagination';

/**
 * Lead model representing a customer inquiry
 */
export interface ILead {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  is_read?: boolean;
  user_id?: number | null;
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
