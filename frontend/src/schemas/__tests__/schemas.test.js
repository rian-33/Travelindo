import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from '../authSchema';
import { bookingSchema, hotelBookingSchema } from '../bookingSchema';
import { reviewSchema, reviewFilterSchema } from '../reviewSchema';
import { searchSchema } from '../searchSchema';

describe('authSchema', () => {
  it('menerima login yang valid', () => {
    expect(
      loginSchema.safeParse({ email: 'user@example.com', password: 'Rahasia123' }).success
    ).toBe(true);
  });

  it('menolak email yang tidak valid', () => {
    expect(loginSchema.safeParse({ email: 'bukan-email', password: 'Rahasia123' }).success).toBe(
      false
    );
  });

  it('menolak password di bawah 8 karakter', () => {
    expect(loginSchema.safeParse({ email: 'user@example.com', password: 'short' }).success).toBe(
      false
    );
  });

  it('menerima register saat password dan konfirmasi cocok', () => {
    const result = registerSchema.safeParse({
      name: 'Budi Santoso',
      email: 'user@example.com',
      password: 'Rahasia123',
      confirmPassword: 'Rahasia123',
    });
    expect(result.success).toBe(true);
  });

  it('menolak register saat password tidak cocok', () => {
    const result = registerSchema.safeParse({
      name: 'Budi Santoso',
      email: 'user@example.com',
      password: 'Rahasia123',
      confirmPassword: 'Beda12345',
    });
    expect(result.success).toBe(false);
  });
});

describe('bookingSchema', () => {
  const future = new Date(Date.now() + 7 * 86400000);
  const later = new Date(Date.now() + 10 * 86400000);

  it('menerima booking hotel yang valid', () => {
    const result = hotelBookingSchema.safeParse({
      hotelId: 'h1',
      roomTypeId: 'r1',
      dates: { from: future, to: later },
      guests: { adults: 2, children: 0, infants: 0 },
      contactEmail: 'user@example.com',
      contactPhone: '081234567890',
      termsAccepted: true,
    });
    expect(result.success).toBe(true);
  });

  it('menolak jika syarat tidak disetujui', () => {
    const result = bookingSchema.safeParse({
      destinationId: 'd1',
      packageId: 'p1',
      dates: { from: future, to: later },
      guests: { adults: 2, children: 0, infants: 0 },
      contactEmail: 'user@example.com',
      contactPhone: '081234567890',
      termsAccepted: false,
    });
    expect(result.success).toBe(false);
  });
});

describe('reviewSchema', () => {
  it('menerima ulasan yang valid', () => {
    expect(
      reviewSchema.safeParse({ rating: 5, title: 'Luar biasa', content: 'Pengalaman yang sangat menyenangkan!' }).success
    ).toBe(true);
  });

  it('menolak rating di luar rentang', () => {
    expect(reviewSchema.safeParse({ rating: 9, title: 'Oke', content: 'Pengalaman menyenangkan sekali' }).success).toBe(
      false
    );
  });

  it('menerapkan default pada filter', () => {
    const parsed = reviewFilterSchema.parse({});
    expect(parsed.sortBy).toBe('newest');
    expect(parsed.page).toBe(1);
    expect(parsed.limit).toBe(10);
  });
});

describe('searchSchema', () => {
  it('menerima pencarian kosong', () => {
    expect(searchSchema.safeParse({}).success).toBe(true);
  });

  it('menolak jumlah dewasa yang tidak valid', () => {
    expect(
      searchSchema.safeParse({ guests: { adults: 99, children: 0 } }).success
    ).toBe(false);
  });
});