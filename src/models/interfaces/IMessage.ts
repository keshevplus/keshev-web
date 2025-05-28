import { IPagination } from './IPagination';

/**
 * Message model representing a contact form submission
 */
export interface IMessage {
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
export interface ICreateMessageDto {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

/**
 * Data for updating an existing message
 */
export interface IUpdateMessageDto {
  readonly name?: string;
  readonly email?: string;
  readonly subject?: string;
  readonly message?: string;
  readonly is_read?: boolean;
}

/**
 * Response format for paginated message data
 */
export interface IMessagesResponse {
  readonly messages: readonly IMessage[];
  readonly pagination: IPagination;
}
