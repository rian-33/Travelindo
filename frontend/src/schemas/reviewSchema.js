import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.number().int().min(1, 'Rating minimal 1').max(5, 'Rating maksimal 5'),
  title: z.string().min(1, 'Judul ulasan wajib diisi').max(100, 'Judul terlalu panjang'),
  content: z.string().min(10, 'Ulasan minimal 10 karakter').max(2000, 'Ulasan maksimal 2000 karakter'),
  images: z.array(z.string().url('URL gambar tidak valid')).max(5, 'Maksimal 5 gambar').optional(),
  tags: z.array(z.string()).max(5, 'Maksimal 5 tag').optional(),
  wouldRecommend: z.boolean().optional(),
  travelType: z.enum(['solo', 'couple', 'family', 'friends', 'business']).optional(),
  visitDate: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), 'Tanggal kunjungan tidak valid'),
});

export const reviewFilterSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  travelType: z.enum(['solo', 'couple', 'family', 'friends', 'business']).optional(),
  sortBy: z.enum(['newest', 'oldest', 'highest', 'lowest', 'helpful']).default('newest'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(10),
});

export const reviewResponseSchema = z.object({
  content: z.string().min(1, 'Balasan wajib diisi').max(1000, 'Balasan maksimal 1000 karakter'),
});