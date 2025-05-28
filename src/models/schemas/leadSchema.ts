import { z } from 'zod';

/**
 * Validation schema for creating a new lead
 */
export const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Subject must be at least 2 characters long'),
  essage: z.string().min(2, 'Message must be at least 2 characters long'),
});

/**
 * Validation schema for updating a lead
 */
export const updateLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Subject must be at least 2 characters long').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters long').optional(),
  is_read: z.boolean().optional(),
});

/**
 * Type definitions based on the schemas
 */
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;

export default {
  createLeadSchema,
  updateLeadSchema
};
