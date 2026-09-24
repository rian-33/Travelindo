import { describe, it, expect } from 'vitest';
import {
  cn,
  slugify,
  truncate,
  clamp,
  formatRupiah,
  parseQueryString,
  buildQueryString,
  getInitials,
  isValidUrl,
} from '../utils';

describe('cn', () => {
  it('menggabungkan class dan menangani duplicate tailwind', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('flex', undefined, false, 'items-center')).toBe('flex items-center');
  });
});

describe('slugify', () => {
  it('mengubah judul menjadi slug', () => {
    expect(slugify('  Bali & Lombok  ')).toBe('bali-lombok');
    expect(slugify('Raja-Ampat')).toBe('raja-ampat');
  });
});

describe('truncate', () => {
  it('memotong teks panjang dengan elipsis', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
    expect(truncate('Short', 100)).toBe('Short');
  });
});

describe('clamp', () => {
  it('membatasi nilai di antara min dan max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(7, 0, 10)).toBe(7);
  });
});

describe('formatRupiah', () => {
  it('memformat angka ke format Rupiah', () => {
    expect(formatRupiah(250000)).toBe(`Rp\u00A0250.000`);
  });
});

describe('parseQueryString / buildQueryString', () => {
  it('mem-parse dan membangun kembali query string', () => {
    expect(parseQueryString('?a=1&b=2&b=3')).toEqual({ a: '1', b: ['2', '3'] });
    expect(buildQueryString({ a: 1, b: undefined, c: '' })).toBe('a=1');
  });
});

describe('getInitials', () => {
  it('mengambil inisial maksimal 2 huruf', () => {
    expect(getInitials('Budi Santoso')).toBe('BS');
    expect(getInitials('Ayu')).toBe('A');
  });
});

describe('isValidUrl', () => {
  it('memvalidasi URL', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('bukan-url')).toBe(false);
  });
});