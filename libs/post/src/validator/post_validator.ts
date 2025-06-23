import { z } from 'zod';

export const postValidator = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  authorId: z.string().uuid('Author ID must be a valid UUID'),
});
