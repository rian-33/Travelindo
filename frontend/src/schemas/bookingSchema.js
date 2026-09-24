import { z } from 'zod';

export const guestSchema = z.object({
  adults: z.number().int().min(1, 'Minimal 1 dewasa').max(10, 'Maksimal 10 dewasa'),
  children: z.number().int().min(0).max(10, 'Maksimal 10 anak'),
  infants: z.number().int().min(0).max(5, 'Maksimal 5 bayi'),
});

export const dateRangeSchema = z
  .object({
    from: z.date({ required_error: 'Tanggal check-in wajib dipilih' }),
    to: z.date({ required_error: 'Tanggal check-out wajib dipilih' }),
  })
  .refine((data) => data.to > data.from, {
    message: 'Tanggal check-out harus setelah check-in',
    path: ['to'],
  })
  .refine((data) => data.from >= new Date(new Date().setHours(0, 0, 0, 0)), {
    message: 'Tanggal check-in tidak bisa di masa lalu',
    path: ['from'],
  });

export const bookingSchema = z.object({
  destinationId: z.string().min(1, 'Destinasi wajib dipilih'),
  packageId: z.string().min(1, 'Paket wajib dipilih'),
  dates: dateRangeSchema,
  guests: guestSchema,
  contactEmail: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  contactPhone: z.string().min(1, 'Nomor telepon wajib diisi').regex(/^[\d\s\-+()]{10,}$/, 'Nomor telepon tidak valid'),
  specialRequests: z.string().max(500, 'Permintaan khusus maksimal 500 karakter').optional(),
  termsAccepted: z.boolean().refine((val) => val === true, 'Anda harus menyetujui syarat & ketentuan'),
});

export const hotelBookingSchema = z.object({
  hotelId: z.string().min(1, 'Hotel wajib dipilih'),
  roomTypeId: z.string().min(1, 'Tipe kamar wajib dipilih'),
  dates: dateRangeSchema,
  guests: guestSchema,
  contactEmail: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  contactPhone: z.string().min(1, 'Nomor telepon wajib diisi').regex(/^[\d\s\-+()]{10,}$/, 'Nomor telepon tidak valid'),
  specialRequests: z.string().max(500, 'Permintaan khusus maksimal 500 karakter').optional(),
  termsAccepted: z.boolean().refine((val) => val === true, 'Anda harus menyetujui syarat & ketentuan'),
});