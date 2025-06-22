import { z } from 'zod';

export const registerValidator = z.object({
  email: z.string().email(),
  fullName: z.string().min(1, 'Full name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z
    .string()
    .min(6, 'Confirm password must be at least 6 characters long'),
  address: z.string().min(1, 'Address is required'),
});
