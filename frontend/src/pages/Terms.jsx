import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import { ArrowLeft } from 'lucide-react';

const sections = [
  {
    title: '1. Penggunaan Layanan',
    body: 'Dengan menggunakan TraveLindo, Anda setuju untuk menggunakan layanan kami hanya untuk tujuan sah, termasuk merencanakan perjalanan, mencari destinasi, penginapan, dan kuliner. Anda tidak boleh menyalahgunakan layanan maupun mengganggu operasional platform.',
  },
  {
    title: '2. Informasi Pengguna',
    body: 'Informasi yang Anda berikan saat mendaftar harus benar dan terkini. Anda bertanggung jawab penuh atas kerahasiaan akun dan aktivitas yang terjadi di dalamnya.',
  },
  {
    title: '3. Pembatalan & Pengembalian',
    body: 'Kebijakan pembatalan dan pengembalian dana mengikuti ketentuan masing-masing mitra (hotel, pemandu, dan penyedia layanan). TraveLindo berperan sebagai penghubung informasi dan tidak memegang dana transaksi secara langsung.',
  },
  {
    title: '4. Batasan Tanggung Jawab',
    body: 'Kami berusaha menyajikan informasi destinasi seakurat mungkin. Namun, nilai budget, rating, dan ketersediaan dapat berubah sewaktu-waktu. TraveLindo tidak bertanggung jawab atas ketidaksesuaian yang disebabkan kelalaian pihak ketiga.',
  },
  {
    title: '5. Perubahan Ketentuan',
    body: 'TraveLindo dapat mengubah ketentuan ini dari waktu ke waktu. Perubahan akan diumumkan melalui halaman ini dan berlaku sejak tanggal pembaruan.',
  },
];

export default function Terms() {
  return (
    <div className="bg-surface-bg">
      <Section spacing="lg">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-brand-primary font-semibold hover:underline transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Beranda
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Syarat &amp; Ketentuan
          </h1>
          <p className="text-text-secondary mb-10">
            Terakhir diperbarui: September 2026
          </p>

          <div className="space-y-8">
            {sections.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-serif text-xl font-bold text-text-primary mb-2">
                  {item.title}
                </h2>
                <p className="text-text-secondary leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>
    </div>
  );
}