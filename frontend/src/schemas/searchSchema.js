import { z } from 'zod';

export const searchSchema = z.object({
  destination: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.object({
    adults: z.number().int().min(1).max(10),
    children: z.number().int().min(0).max(10),
  }).optional(),
});