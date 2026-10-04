/**
 * Generator gambar dummy (SVG placeholder) untuk TraveLindo.
 *
 * Semua gambar di aplikasi ini masih berupa placeholder. File ini membuat
 * kerangka visual agar setiap halaman/tab tidak tampil kosong, sampai foto asli
 * (Cloudinary / Unsplash) siap dipakai.
 *
 * Jalankan:  npm run dummy:images --prefix frontend
 */

import { mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'img', 'dummy');

/* ------------------------------------------------------------------ *
 * Token desain (mengikuti tailwind.config.js)
 * ------------------------------------------------------------------ */

const BRAND = {
  ink: '#3D322C',
  muted: '#8A7D72',
};

const ACCENT = '#C85C3E';

/** Palet per kategori: warna gradasi + glyph + label overline. */
const THEMES = {
  coastal: { from: '#EAF2F4', to: '#CFE3E8', ink: '#22484F', glyph: 'waves', label: 'DESTINASI' },
  inland: { from: '#EFF3EC', to: '#D8E4D4', ink: '#2F4730', glyph: 'mountain', label: 'DESTINASI' },
  heritage: { from: '#F6F0E4', to: '#E4D3B4', ink: '#4C3A22', glyph: 'temple', label: 'DESTINASI' },
  culinary: { from: '#F7F2EC', to: '#EADBCB', ink: '#4B382C', glyph: 'bowl', label: 'KULINER' },
  resort: { from: '#EAF4F2', to: '#C9E3DE', ink: '#1F4A45', glyph: 'hotel', label: 'PENGINAPAN' },
  hotel: { from: '#EFF1F5', to: '#D6DCE6', ink: '#2F3A4A', glyph: 'hotel', label: 'PENGINAPAN' },
  villa: { from: '#F1F0EC', to: '#DCD8CE', ink: '#403C33', glyph: 'hotel', label: 'PENGINAPAN' },
  promo: { from: '#FBEFF3', to: '#F3D3DE', ink: '#6B2740', glyph: 'ticket', label: 'PROMO' },
  auth: { from: '#F8EDE6', to: '#E9CDB8', ink: BRAND.ink, glyph: 'compass', label: 'MEMBER' },
  brand: { from: '#F6EDE4', to: '#E4CDB4', ink: BRAND.ink, glyph: 'compass', label: 'TRAVELINDO' },
  empty: { from: '#F4F1ED', to: '#E4DED6', ink: BRAND.muted, glyph: 'image', label: 'PLACEHOLDER' },
};

// Alias yang dipakai manifest.
THEMES.destinasi = THEMES.coastal;
THEMES.pantai = THEMES.coastal;
THEMES.laut = THEMES.coastal;
THEMES.gunung = THEMES.inland;
THEMES.kuliner = THEMES.culinary;
THEMES.penginapan = THEMES.resort;
THEMES.kosong = THEMES.empty;

/* ------------------------------------------------------------------ *
 * Template SVG
 * ------------------------------------------------------------------ */

const CANVAS = 1200;

/**
 * Area aman: komposisi hanya digambar di dalam kotak ini agar tetap terbaca
 * setelah di-crop `object-cover` ke rasio 16/9, 4/5, 1/1, atau 2/1.
 */
const SAFE = { x: 0.17, y: 0.15, w: 0.66, h: 0.7 };

const GLYPHS = {
  mountain:
    '<path d="M60 210 L170 60 L244 154 L300 82 L340 210 Z"/><circle cx="180" cy="20" r="26"/>',
  temple:
    '<path d="M60 210 L200 20 L340 210 Z"/><path d="M116 210 L200 92 L284 210"/><path d="M60 228 H340 M86 252 H314 M120 276 H280"/><circle cx="200" cy="-8" r="18"/>',
  waves:
    '<path d="M40 150 q50 -42 100 0 t100 0 t100 0 t100 0"/><path d="M40 212 q50 -42 100 0 t100 0 t100 0 t100 0"/><circle cx="300" cy="80" r="34"/>',
  bowl:
    '<path d="M50 160 H350 A150 150 0 0 1 50 160 Z"/><path d="M20 160 H380"/><path d="M165 110 q32 -48 72 -24"/><path d="M270 92 q24 -40 56 -16"/>',
  hotel:
    '<rect x="100" y="60" width="200" height="150" rx="8"/><path d="M76 60 H324"/><path d="M140 108 h30 M200 108 h30 M260 108 h30 M140 158 h30 M200 158 h30 M260 158 h30 M172 210 v-40 h56 v40"/><path d="M180 28 v32 M220 28 v32"/>',
  ticket:
    '<path d="M56 130 H300 a30 30 0 0 1 30 30 V190 a30 30 0 0 1 -30 30 H56 a30 30 0 0 1 -30 -30 V160 a30 30 0 0 1 30 -30 Z"/><path d="M170 130 V220" stroke-dasharray="12 12"/><circle cx="245" cy="175" r="14"/>',
  compass:
    '<circle cx="200" cy="130" r="118"/><path d="M200 44 L234 130 L200 216 L166 130 Z"/><circle cx="200" cy="130" r="8"/>',
  image:
    '<rect x="60" y="70" width="280" height="170" rx="14"/><circle cx="120" cy="116" r="18"/><path d="M76 232 L168 138 L232 194 L280 152 L340 232"/>',
};

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Pecah teks menjadi maksimal `maxLines` baris. */
function wrap(text, maxChars, maxLines) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    if (`${current} ${word}`.trim().length > maxChars) {
      lines.push(current.trim());
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }
  if (current) lines.push(current);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[,.;:]$/, '')}...`;
  return kept;
}

function svgText({ text, x, y, size, weight = 400, fill, family = 'sans', anchor = 'middle', letterSpacing }) {
  return (
    `<text x="${x}" y="${y}" text-anchor="${anchor}"` +
    ` font-family="${escapeXml(family)}" font-size="${size}" font-weight="${weight}"` +
    (letterSpacing ? ` letter-spacing="${letterSpacing}"` : '') +
    ` fill="${fill}">${escapeXml(text)}</text>`
  );
}

const SERIF = 'Georgia, "Times New Roman", serif';
const SANS = '"Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';

/**
 * Render satu file SVG dummy.
 * @param {{ overline?: string, title: string, subtitle?: string, theme?: string }} meta
 * @param {{ width?: number, height?: number, compact?: boolean }} options
 */
function renderSvg(meta, options = {}) {
  const { overline, title, subtitle, theme = 'empty' } = meta;
  const { width = CANVAS, height = CANVAS, compact = false } = options;

  const t = THEMES[theme] || THEMES.empty;
  const cx = width / 2;
  const scale = width / CANVAS;
  const uid = `${theme}-${width}x${height}`;

  const boxX = width * SAFE.x;
  const boxY = height * SAFE.y;
  const boxW = width * SAFE.w;
  const boxH = height * SAFE.h;

  const titleSize = Math.round((compact ? 54 : 58) * scale);
  const subSize = Math.round((compact ? 26 : 28) * scale);
  const overSize = Math.round(19 * scale);
  const glyphBox = Math.round((compact ? 150 : 168) * scale);
  const glyphScale = glyphBox / 400;
  const glyphTop = boxY + boxH * 0.4 - glyphBox / 2;

  const titleLines = wrap(title, compact ? 20 : 22, 2);
  const subLines = subtitle ? wrap(subtitle, compact ? 34 : 38, 2) : [];

  const titleBlockH = titleLines.length * titleSize * 1.16;
  const subBlockH = subLines.length * subSize * 1.34;
  const gap = subLines.length ? Math.round(subSize * 0.9) : 0;

  const blockTop =
    boxY + boxH * 0.74 - (titleBlockH + gap + subBlockH) / 2;

  let cursorY = blockTop + (overline ? overSize * 1.6 : 0);

  const parts = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeXml(`${t.label} - ${title}`)}">`
  );
  parts.push(`<title>${escapeXml(title)}</title>`);

  parts.push(
    `<defs>` +
      `<linearGradient id="bg-${uid}" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0%" stop-color="${t.from}"/>` +
      `<stop offset="100%" stop-color="${t.to}"/>` +
      `</linearGradient>` +
      `<pattern id="dots-${uid}" width="26" height="26" patternUnits="userSpaceOnUse">` +
      `<circle cx="2" cy="2" r="1.6" fill="${t.ink}" opacity="0.16"/>` +
      `</pattern>` +
      `<pattern id="grid-${uid}" width="64" height="64" patternUnits="userSpaceOnUse">` +
      `<path d="M64 0 H0 V64" fill="none" stroke="${t.ink}" stroke-width="1" opacity="0.1"/>` +
      `</pattern>` +
      `</defs>`
  );

  parts.push(`<rect width="${width}" height="${height}" fill="url(#bg-${uid})"/>`);
  parts.push(`<rect width="${width}" height="${height}" fill="url(#grid-${uid})"/>`);
  parts.push(`<rect width="${width}" height="${height}" fill="url(#dots-${uid})"/>`);

  parts.push(
    `<rect x="${boxX.toFixed(1)}" y="${boxY.toFixed(1)}" width="${boxW.toFixed(1)}" height="${boxH.toFixed(1)}" rx="${Math.round(26 * scale)}" fill="#FFFFFF" opacity="0.55" stroke="${t.ink}" stroke-opacity="0.18" stroke-width="${Math.max(1, Math.round(2 * scale))}"/>`
  );

  parts.push(
    `<g transform="translate(${(cx - glyphBox / 2).toFixed(1)}, ${glyphTop.toFixed(1)}) scale(${glyphScale.toFixed(4)})" fill="none" stroke="${t.ink}" stroke-opacity="0.5" stroke-width="13" stroke-linecap="round" stroke-linejoin="round">${GLYPHS[t.glyph]}</g>`
  );

  if (overline) {
    parts.push(
      svgText({
        text: overline,
        x: cx,
        y: cursorY,
        size: overSize,
        weight: 700,
        fill: ACCENT,
        letterSpacing: (3.6 * scale).toFixed(1),
      })
    );
    cursorY += overSize * 1.5;
  }

  for (const line of titleLines) {
    parts.push(
      svgText({ text: line, x: cx, y: cursorY, size: titleSize, weight: 700, fill: t.ink, family: SERIF })
    );
    cursorY += titleSize * 1.16;
  }

  if (subLines.length) {
    cursorY += gap;
    for (const line of subLines) {
      parts.push(svgText({ text: line, x: cx, y: cursorY, size: subSize, weight: 400, fill: t.ink, family: SANS }));
      cursorY += subSize * 1.34;
    }
  }

  // Label "GAMBAR DUMMY" miring di pojok kiri atas.
  const badgeW = Math.round(236 * scale);
  const badgeH = Math.round(54 * scale);
  const badgeX = Math.round(48 * scale);
  const badgeY = Math.round(48 * scale);
  parts.push(
    `<g transform="rotate(-6 ${badgeX + badgeW / 2} ${badgeY + badgeH / 2})">` +
      `<rect x="${badgeX}" y="${badgeY}" width="${badgeW}" height="${badgeH}" rx="${badgeH / 2}" fill="${t.ink}" opacity="0.72"/>` +
      svgText({
        text: 'GAMBAR DUMMY',
        x: badgeX + badgeW / 2,
        y: badgeY + badgeH / 2 + (7 * scale).toFixed(1),
        size: Math.round(21 * scale),
        weight: 700,
        fill: '#FFFFFF',
        letterSpacing: (2.2 * scale).toFixed(1),
      }) +
      `</g>`
  );

  // Penanda ukuran di pojok kanan bawah.
  parts.push(
    svgText({
      text: `${width}x${height}`,
      x: width - 48 * scale,
      y: height - 40 * scale,
      size: Math.round(19 * scale),
      weight: 600,
      fill: t.ink,
      anchor: 'end',
    })
  );

  parts.push('</svg>');
  return parts.join('\n');
}

/* ------------------------------------------------------------------ *
 * Manifest: metadata tiap gambar dummy
 * ------------------------------------------------------------------ */

const DESTINATIONS = [
  { slug: 'pantai-kuta', name: 'Pantai Kuta', location: 'Bali', tags: 'Pantai, Surf, Sunset', theme: 'pantai' },
  {
    slug: 'candi-borobudur',
    name: 'Candi Borobudur',
    location: 'Jawa Tengah',
    tags: 'Budaya, Sejarah, UNESCO',
    theme: 'heritage',
  },
  {
    slug: 'taman-nasional-komodo',
    name: 'Taman Nasional Komodo',
    location: 'Nusa Tenggara Timur',
    tags: 'Komodo, Diving, Alam',
    theme: 'laut',
  },
  {
    slug: 'gunung-rinjani',
    name: 'Gunung Rinjani',
    location: 'Nusa Tenggara Barat',
    tags: 'Gunung, Hiking, Segara Anak',
    theme: 'gunung',
  },
  { slug: 'raja-ampat', name: 'Raja Ampat', location: 'Papua Barat', tags: 'Pulau, Diving, Laut', theme: 'laut' },
  {
    slug: 'danau-toba',
    name: 'Danau Toba',
    location: 'Sumatera Utara',
    tags: 'Danau, Vulkanik, Budaya Batak',
    theme: 'gunung',
  },
  {
    slug: 'gunung-bromo',
    name: 'Gunung Bromo',
    location: 'Jawa Timur',
    tags: 'Gunung, Sunrise, Kawah',
    theme: 'gunung',
  },
  {
    slug: 'kepulauan-derawan',
    name: 'Kepulauan Derawan',
    location: 'Kalimantan Timur',
    tags: 'Pulau, Diving, Penyu',
    theme: 'laut',
  },
  {
    slug: 'tana-toraja',
    name: 'Tana Toraja',
    location: 'Sulawesi Selatan',
    tags: 'Budaya, Alam, Tongkonan',
    theme: 'heritage',
  },
];

const CULINARY = [
  {
    slug: 'warung-nasi-ayam-kedewatan',
    name: 'Warung Nasi Ayam Kedewatan',
    region: 'Bali',
    description: 'Nasi ayam khas Bali dengan sambal matah dan lawar.',
  },
  {
    slug: 'gudeg-yu-djum',
    name: 'Gudeg Yu Djum',
    region: 'Yogyakarta',
    description: 'Gudeg nangka manis dengan pilihan ayam dan telur.',
  },
  {
    slug: 'sei-sapi-lamalera',
    name: "Se'i Sapi Lamalera",
    region: 'Labuan Bajo',
    description: "Daging asap khas Nusa Tenggara dengan sambal lu'at.",
  },
  {
    slug: 'ayam-taliwang-irama',
    name: 'Ayam Taliwang Irama',
    region: 'Lombok',
    description: 'Ayam bakar pedas dengan plecing kangkung segar.',
  },
  {
    slug: 'rumah-makan-padang-sederhana',
    name: 'Rumah Makan Padang Sederhana',
    region: 'Sumatera Utara',
    description: 'Hilangan Minang autentik dengan rendang sebagai andalan.',
  },
  {
    slug: 'rawon-nguling',
    name: 'Rawon Nguling',
    region: 'Jawa Timur',
    description: 'Rawon kuah kluwek legendaris dengan daging yang lembut.',
  },
  {
    slug: 'sate-makmur',
    name: 'Sate Makmur',
    region: 'Jawa Barat',
    description: 'Sate kambing dengan bumbu kacang khas Jawa Barat.',
  },
  {
    slug: 'mie-aceh-titi-bobrok',
    name: 'Mie Aceh Titi Bobrok',
    region: 'Aceh',
    description: 'Mie goreng pedas khas Aceh dengan udang dan daging.',
  },
  {
    slug: 'pempek-pak-raden',
    name: 'Pempek Pak Raden',
    region: 'Sumatera Selatan',
    description: 'Pempek kapal selam original dengan cuko pedas manis.',
  },
];

const HOTELS = [
  {
    slug: 'ayana-resort',
    name: 'Ayana Resort',
    type: 'Resort',
    location: 'Bali',
    description: 'Kolam renang infinity dan spa kelas dunia di tepi tebing.',
    theme: 'resort',
  },
  {
    slug: 'tentrem-hotel',
    name: 'Tentrem Hotel',
    type: 'Hotel',
    location: 'Yogyakarta',
    description: 'Hotel bintang lima dengan arsitektur Jawa modern.',
    theme: 'hotel',
  },
  {
    slug: 'padma-hotel',
    name: 'Padma Hotel',
    type: 'Hotel',
    location: 'Bandung',
    description: 'Hotel pegunungan dengan lapangan golf dan spa.',
    theme: 'hotel',
  },
  {
    slug: 'plataran-komodo',
    name: 'Plataran Komodo',
    type: 'Resort',
    location: 'Labuan Bajo',
    description: 'Pantai pribadi, pusat diving, dan sunset memukau.',
    theme: 'resort',
  },
  {
    slug: 'the-ritz-carlton',
    name: 'The Ritz-Carlton',
    type: 'Hotel',
    location: 'Jakarta',
    description: 'Fine dining, spa mewah, dan layanan bintang lima.',
    theme: 'hotel',
  },
  {
    slug: 'alila-villas-uluwatu',
    name: 'Alila Villas Uluwatu',
    type: 'Villa',
    location: 'Bali',
    description: 'Kolam pribadi dan hamparan laut di tebing Uluwatu.',
    theme: 'villa',
  },
  {
    slug: 'hotel-tugu-malang',
    name: 'Hotel Tugu Malang',
    type: 'Hotel',
    location: 'Jawa Timur',
    description: 'Boutique hotel dengan koleksi seni dan antik Nusantara.',
    theme: 'hotel',
  },
  {
    slug: 'mesastila-resort',
    name: 'MesaStila Resort',
    type: 'Resort',
    location: 'Jawa Tengah',
    description: 'Perkebunan kopi, wellness, dan yoga di lereng gunung.',
    theme: 'resort',
  },
];

const ISLANDS = [
  {
    slug: 'bali',
    name: 'Bali',
    tagline: 'Dewata Island',
    description: 'Pantai indah, budaya kaya, sunset legendaris. 12 Destinasi - ★4.8',
    theme: 'pantai',
  },
  {
    slug: 'raja-ampat',
    name: 'Raja Ampat',
    tagline: 'Surga Di Bumi',
    description: 'Karang dan ikan spektakuler. 8 Destinasi - ★5.0',
    theme: 'laut',
  },
  {
    slug: 'komodo',
    name: 'Komodo',
    tagline: 'Naga Purba',
    description: 'Komodo liar dan spot diving kelas dunia. 6 Destinasi - ★4.9',
    theme: 'laut',
  },
];

/** Daftar file yang akan ditulis: path relatif -> { meta, options } */
function buildManifest() {
  const files = new Map();
  const add = (path, meta, options) => files.set(path, { meta, options });

  /* Beranda */
  add('home/hero-indonesia.svg', {
    overline: 'HERO BERANDA',
    title: 'Temukan Keindah Tersembunyi Indonesia',
    subtitle: '12 Destinasi - Terpilih Bulan Ini',
    theme: 'destinasi',
  });
  add('home/promo-banner.svg', {
    overline: 'PENAWARAN TERBATAS',
    title: 'Pengalaman Premium, Harga Bersahabat',
    subtitle: 'Kode TRAVELINDO20 - Potongan 20%',
    theme: 'promo',
  }, { compact: true });
  add('home/texture-journal.svg', { title: 'Pola Jurnal', theme: 'destinasi' }, {
    width: 1600,
    height: 900,
    compact: true,
  });

  /* Pulau ikonik */
  for (const island of ISLANDS) {
    add(`island/${island.slug}.svg`, {
      overline: island.tagline.toUpperCase(),
      title: island.name,
      subtitle: island.description,
      theme: island.theme,
    });
  }

  /* Destinasi: 3 tampilan perempat (utama + 2 galeri) */
  for (const dest of DESTINATIONS) {
    add(`destination/${dest.slug}-1.svg`, {
      overline: 'DESTINASI',
      title: dest.name,
      subtitle: `${dest.location} · ${dest.tags}`,
      theme: dest.theme,
    });
    add(`destination/${dest.slug}-2.svg`, {
      overline: 'FOTO 2 DARI 3',
      title: `Pemandangan ${dest.name}`,
      subtitle: `Suasana ${dest.location}`,
      theme: dest.theme,
    }, { compact: true });
    add(`destination/${dest.slug}-3.svg`, {
      overline: 'FOTO 3 DARI 3',
      title: `Detail ${dest.name}`,
      subtitle: `${dest.location} · Menunggu foto asli`,
      theme: dest.theme,
    }, { compact: true });
  }

  /* Kuliner */
  for (const place of CULINARY) {
    add(`culinary/${place.slug}.svg`, {
      overline: 'KULINER',
      title: place.name,
      subtitle: `${place.region} · ${place.description}`,
      theme: 'kuliner',
    });
  }

  /* Penginapan: 3 tampilan per hotel */
  for (const hotel of HOTELS) {
    add(`hotel/${hotel.slug}-1.svg`, {
      overline: 'PENGINAPAN',
      title: hotel.name,
      subtitle: `${hotel.type} · ${hotel.location}`,
      theme: hotel.theme,
    });
    add(`hotel/${hotel.slug}-2.svg`, {
      overline: 'FOTO 2 DARI 3',
      title: `Interior ${hotel.name}`,
      subtitle: `${hotel.type} · ${hotel.location}`,
      theme: hotel.theme,
    }, { compact: true });
    add(`hotel/${hotel.slug}-3.svg`, {
      overline: 'FOTO 3 DARI 3',
      title: `Fasilitas ${hotel.name}`,
      subtitle: hotel.description,
      theme: hotel.theme,
    }, { compact: true });
  }

  /* Halaman auth */
  add('auth/login.svg', {
    overline: 'SELAMAT DATANG KEMBALI',
    title: 'Pemandangan Bali',
    subtitle: 'Lanjutkan rencana perjalanan impian Anda bersama TraveLindo',
    theme: 'auth',
  }, { compact: true });
  add('auth/register.svg', {
    overline: 'MULAI PETUALANGAN BARU',
    title: 'Pemandangan Gunung Rinjani',
    subtitle: 'Bergabunglah dengan ribuan traveler lainnya',
    theme: 'auth',
  }, { compact: true });

  /* Promo */
  add('promo/banner-diskon.svg', {
    overline: 'PROMO & PENAWARAN EKSKUSIF',
    title: 'Gunakan Kode Kupon Kami',
    subtitle: 'Diskon, cashback, dan Early Bird untuk perjalanan berikutnya',
    theme: 'promo',
  });

  /* Share card */
  add('og/cover.svg', {
    overline: 'PLATFORM PERENCANAAN PERJALANAN',
    title: 'TraveLindo',
    subtitle: 'Temukan Keindahan Tersembunyi Indonesia',
    theme: 'brand',
  }, { width: 1200, height: 630, compact: true });

  /* Placeholder generik (dirujuk lib/cloudinary.js) */
  add('placeholder/generic.svg', {
    title: 'Gambar belum tersedia',
    subtitle: 'Slot gambar menunggu aset asli',
    theme: 'kosong',
  });
  add('placeholder/blur.svg', { title: 'Memuat', theme: 'kosong' });
  add('placeholder/hero.svg', { title: 'Gambar Hero Belum Tersedia', theme: 'kosong' });
  add('placeholder/card.svg', { title: 'Gambar Kartu Belum Tersedia', theme: 'kosong' }, { compact: true });

  return files;
}

/* ------------------------------------------------------------------ *
 * Entry point
 * ------------------------------------------------------------------ */

async function main() {
  const files = buildManifest();
  await rm(OUT_DIR, { recursive: true, force: true });

  let count = 0;
  for (const [relPath, { meta, options }] of files) {
    const target = join(OUT_DIR, relPath);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, `${renderSvg(meta, options)}\n`, 'utf8');
    count += 1;
  }

  console.log(`OK ${count} gambar dummy dibuat di frontend/public/img/dummy`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});