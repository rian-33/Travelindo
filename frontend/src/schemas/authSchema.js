import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(1, 'Kata sandi wajib diisi').min(8, 'Kata sandi minimal 8 karakter'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Nama lengkap wajib diisi').min(2, 'Nama minimal 2 karakter').max(100, 'Nama terlalu panjang'),
    email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
    password: z.string().min(1, 'Kata sandi wajib diisi').min(8, 'Kata sandi minimal 8 karakter').regex(/[A-Z]/, 'Harus mengandung huruf besar').regex(/[a-z]/, 'Harus mengandung huruf kecil').regex(/[0-9]/, 'Harus mengandung angka'),
    confirmPassword: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi tidak cocok',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, 'Kata sandi wajib diisi').min(8, 'Kata sandi minimal 8 karakter').regex(/[A-Z]/, 'Harus mengandung huruf besar').regex(/[a-z]/, 'Harus mengandung huruf kecil').regex(/[0-9]/, 'Harus mengandung angka'),
    confirmPassword: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi tidak cocok',
    path: ['confirmPassword'],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Kata sandi saat ini wajib diisi'),
    newPassword: z.string().min(1, 'Kata sandi baru wajib diisi').min(8, 'Kata sandi minimal 8 karakter').regex(/[A-Z]/, 'Harus mengandung huruf besar').regex(/[a-z]/, 'Harus mengandung huruf kecil').regex(/[0-9]/, 'Harus mengandung angka'),
    confirmPassword: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Kata sandi tidak cocok',
    path: ['confirmPassword'],
  });

export const profileSchema = z.object({
  name: z.string().min(1, 'Nama lengkap wajib diisi').min(2, 'Nama minimal 2 karakter').max(100, 'Nama terlalu panjang'),
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  phone: z.string().optional().refine((val) => !val || /^[\d\s\-+()]{10,}$/.test(val), 'Nomor telepon tidak valid'),
  birthDate: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), 'Tanggal lahir tidak valid'),
  gender: z.enum(['male', 'female', 'other']).optional(),
});