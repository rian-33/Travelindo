import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import { ArrowLeft } from 'lucide-react';

const sections = [
  {
    title: 'Data yang Kami Kumpulkan',
    body: 'Kami mengumpulkan data yang Anda berikan secara langsung, seperti nama, alamat email, dan preferensi perjalanan saat mendaftar atau mengisi formulir. Kami juga mengumpulkan data penggunaan secara anonim untuk meningkatkan pengalaman.',
  },
  {
    title: 'Penggunaan Data',
    body: 'Data Anda digunakan untuk menampilkan rekomendasi destinasi, mengirim buletin (hanya jika Anda berlangganan), serta meningkatkan kualitas layanan. Kami tidak menjual data pribadi Anda kepada pihak mana pun.',
  },
  {
    title: 'Cookie & Penyimpanan Lokal',
    body: 'Layanan kami menyimpan preferensi dan sesi Anda melalui penyimpanan lokal browser (localStorage). Anda dapat menghapusnya kapan saja melalui pengaturan peramban.',
  },
  {
    title: 'Berbagi Data ke Pihak Ketiga',
    body: 'Data dibagikan hanya kepada penyedia infrastruktur (hosting & analitik) yang mengikat perjanjian kerahasiaan. Gambar destinasi dimuat melalui layanan CDN pihak ketiga.',
  },
  {
    title: 'Hak Anda',
    body: 'Anda berhak mengakses, memperbaiki, atau menghapus data pribadi Anda. Hubungi kami melalui fitur bantuan di aplikasi untuk menjalankan hak tersebut.',
  },
];

export default function PrivacyPolicy() {
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
            Kebijakan Privasi
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