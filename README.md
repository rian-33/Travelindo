# Travelindo

Platform perencanaan perjalanan untuk mengeksplorasi keindahan Indonesia. Temukan destinasi, kuliner, dan penginapan terbaik dalam satu aplikasi.

## Fitur

- Jelajahi 50+ destinasi wisata Indonesia (Bali, Raja Ampat, Bromo, dan lainnya)
- Pencarian & filter destinasi berdasarkan wilayah, budget, dan rating
- Direktori kuliner khas Nusantara
- Daftar hotel, resort, dan villa dengan detail tipe kamar
- Promo & kode diskon eksklusif
- Peta interaktif (Leaflet) dengan lokasi destinasi

## Teknologi

**Frontend** (`frontend/`): React 18, Vite, Tailwind CSS, Framer Motion, Zustand, React Hook Form + Zod, React Leaflet, Lucide Icons

**Backend** (`backend/`): Express, Mongoose (MongoDB), Helmet

**Deployment**: Vercel (frontend statis + serverless API di `/api`)

## Memulai

```bash
# Install dependensi (root & frontend)
npm install
npm install --prefix frontend

# Copy environment
cp .env.example .env.local

# Jalankan development (backend + frontend sekaligus)
npm run dev

# Atau terpisah
npm run server   # backend di http://localhost:5000
npm run client   # frontend di http://localhost:5173
```

Butuh MongoDB lokal (default `mongodb://localhost:27017/travelindo`) atau atur `MONGO_URI`.

## Script

| Perintah                | Keterangan                                    |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Jalankan backend & frontend bersamaan         |
| `npm run start`         | Jalankan backend saja (production)            |
| `npm run build`         | Build frontend ke `frontend/dist`             |
| `npm run lint --prefix frontend` | Lint kode frontend                     |
| `npm test --prefix frontend`      | Jalankan unit test (Vitest)            |

## Lingkungan (`.env.local`)

| Variabel                     | Keterangan                                |
| ---------------------------- | ----------------------------------------- |
| `VITE_API_URL`               | Base URL API (dev: `http://localhost:5000/api`) |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloud name Cloudinary untuk gambar        |
| `VITE_CLOUDINARY_API_KEY`    | API key Cloudinary                        |
| `MONGO_URI`                  | Koneksi MongoDB (backend)                 |
| `PORT`                       | Port backend (default 5000)               |
| `JWT_SECRET` / `JWT_REFRESH_SECRET` | Rahasia JWT (untuk autentikasi masa depan) |

> Jangan gunakan prefix `VITE_` untuk rahasia (secret) — variabel `VITE_*` terekspos ke bundle frontend.

## Struktur

```
travelindo/
├── api/            # Fungsi serverless Vercel (Express app)
├── backend/        # API Express + Mongoose
├── frontend/
│   ├── src/
│   │   ├── components/   # UI & komponen halaman
│   │   ├── pages/        # Halaman React Router
│   │   ├── hooks/        # Custom hooks
│   │   ├── schemas/      # Validasi Zod
│   │   ├── stores/       # State global (Zustand)
│   │   └── lib/          # Util & helper
│   └── vite.config.js
└── vercel.json     # Konfigurasi deployment Vercel
```