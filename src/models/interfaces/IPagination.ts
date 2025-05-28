/**
 * Standard pagination data structure
 */
export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Generic paginated response interface for any data type
 */
export interface IPaginatedResponse<T> {
  data: T[];
  pagination: IPagination;
}

export default IPagination;
