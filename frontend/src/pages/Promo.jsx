import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeSlideVariants, staggerItem } from '@/lib/motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Section, SectionHeader, SectionGrid } from '@/components/layout';
import { Tag, Sparkles, Percent, Gift, Copy, Check, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

const mockPromos = [
  {
    id: 1,
    title: 'Diskon Pengguna Baru',
    code: 'TRAVELINDO20',
    description: 'Potongan 20% untuk pemesanan pertama destinasi manapun. Berlaku untuk semua paket wisata selama 30 hari pertama pendaftaran.',
    discount: '20%',
    type: 'percentage',
    validUntil: '2024-12-31',
    color: 'from-brand-primary to-brand-primary-hover',
    terms: ['Minimal pembelian Rp 500.000', 'Hanya untuk akun baru', 'Tidak bisa dikombinkan dengan promo lain', 'Berlaku 1x penggunaan'],
  },
  {
    id: 2,
    title: 'Liburan Keluarga',
    code: 'FAMILYFUN',
    description: 'Cashback Rp 500.000 untuk pemesanan penginapan tipe Villa atau Resort minimal 3 malam. Cashback masuk ke saldo Travelindo.',
    discount: 'Rp 500.000',
    type: 'cashback',
    validUntil: '2024-11-30',
    color: 'from-amber-500 to-orange-500',
    terms: ['Minimal 3 malam menginap', 'Tipe Villa/Resort saja', 'Cashback max Rp 500.000', 'Berlaku hingga 30 Nov 2024'],
  },
  {
    id: 3,
    title: 'Eksplorasi Timur',
    code: 'TIMURINDAH',
    description: 'Diskon khusus 15% untuk penerbangan dan tur ke wilayah NTT, Maluku, dan Papua. Termasuk paket ke Raja Ampat, Komodo, dan Banda.',
    discount: '15%',
    type: 'percentage',
    validUntil: '2025-01-31',
    color: 'from-emerald-500 to-teal-600',
    terms: ['Tujuan: NTT, Maluku, Papua', 'Minimal 2 orang', 'Termasuk paket tour', 'Tidak berlaku hari libur nasional'],
  },
  {
    id: 4,
    title: 'Early Bird Summer',
    code: 'SUMMER25',
    description: 'Booking liburan musim panas (Juni-Agustus) minimal 60 hari sebelumnya mendapat diskon 25% + upgrade kamar gratis (tersedia).',
    discount: '25%',
    type: 'percentage',
    validUntil: '2024-10-31',
    color: 'from-yellow-400 to-orange-500',
    terms: ['Booking 60 hari sebelum', 'Perjalanan Juni-Agustus', 'Upgrade sesuai ketersediaan', 'Non-refundable'],
  },
  {
    id: 5,
    title: 'Paket Honeymoon',
    code: 'LOVEBIRDS',
    description: 'Paket romantis untuk pasangan baru menikah: diskon 30% + dinner romantis + spa couple + late checkout 2 PM.',
    discount: '30%',
    type: 'percentage',
    validUntil: '2024-12-31',
    color: 'from-rose-400 to-pink-500',
    terms: ['Bukti nikah max 1 tahun', 'Minimal 4 malam', 'Termasuk dinner & spa', 'Subject to availability'],
  },
  {
    id: 6,
    title: 'Student Discount',
    code: 'STUDENT10',
    description: 'Diskon 10% untuk mahasiswa dengan KTM aktif. Berlaku untuk semua destinasi domestik. Bisa dikombinkan dengan promo Early Bird.',
    discount: '10%',
    type: 'percentage',
    validUntil: '2025-06-30',
    color: 'from-blue-500 to-indigo-500',
    terms: ['KTM/Student ID aktif', 'Domestik saja', 'Bisa kombinasikan', 'Max 2 tiket per booking'],
  },
];

export default function Promo() {
  const [activeCategory, setActiveCategory] = useState('all');
  const toast = useToast();

  const categories = [
    { value: 'all', label: 'Semua', icon: Sparkles },
    { value: 'percentage', label: 'Diskon %', icon: Percent },
    { value: 'cashback', label: 'Cashback', icon: Gift },
  ];

  const filteredPromos = useMemo(() => {
    if (activeCategory === 'all') return mockPromos;
    return mockPromos.filter((p) => p.type === activeCategory);
  }, [activeCategory]);

  const copyCode = (code, title) => {
    navigator.clipboard.writeText(code);
    toast.success('Kode Disalin!', `Kode "${code}" untuk ${title} sudah disalin ke clipboard.`);
  };

  return (
    <div className="bg-surface-bg min-h-screen">
      <Section spacing="md" background="muted">
          <motion.div variants={fadeSlideVariants} className="mb-8">
            <SectionHeader
              title="Promo & Penawaran Eksklusif"
              subtitle="Gunakan kode kupon di bawah ini saat melakukan pembayaran untuk mendapatkan diskon spesial."
            />
          </motion.div>

          {/* Category Tabs */}
          <motion.div variants={fadeSlideVariants} style={{ transitionDelay: '100ms' }} className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === cat.value
                    ? 'bg-brand-primary text-text-inverse shadow-card'
                    : 'bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface-muted border border-border'
                )}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </motion.div>
      </Section>

      <Section spacing="lg">
          {filteredPromos.length > 0 ? (
            <SectionGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              gap="gap-6"
              reveal
              stagger
            >
              {filteredPromos.map((promo, index) => (
                <motion.div key={promo.id} variants={staggerItem}>
                  <PromoCard promo={promo} onCopy={copyCode} />
                </motion.div>
              ))}
            </SectionGrid>
          ) : (
            <motion.div className="text-center py-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Tag className="w-16 h-16 mx-auto text-text-muted/50 mb-4" />
              <h3 className="font-serif text-xl font-bold text-text-primary mb-2">Tidak Ada Promo Tersedia</h3>
              <p className="text-text-secondary">Promo untuk kategori ini belum tersedia. Cek kembali nanti!</p>
            </motion.div>
          )}
      </Section>
    </div>
  );
}

function PromoCard({ promo, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(promo.code, promo.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const daysLeft = Math.ceil((new Date(promo.validUntil) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-feature)] border border-border',
        'bg-gradient-to-br',
        promo.color
      )}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-float)' }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

      <div className="relative p-6 lg:p-8 h-full flex flex-col">
        {/* Badge */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant={promo.type === 'percentage' ? 'primary' : 'accent'} size="sm">
            {promo.type === 'percentage' ? <Percent className="w-3 h-3 mr-1" /> : <Gift className="w-3 h-3 mr-1" />}
            {promo.discount}
          </Badge>
          <Badge variant="outline" size="sm" className="bg-white/20 text-white border-white/30">
            <Clock className="w-3 h-3 mr-1" />
            {daysLeft > 0 ? `${daysLeft} hari` : 'Berakhir'}
          </Badge>
        </div>

        <h3 className="font-serif text-xl lg:text-2xl font-bold text-white mb-3">
          {promo.title}
        </h3>

        <p className="text-white/90 text-sm mb-6 flex-1 leading-relaxed">
          {promo.description}
        </p>

        {/* Code Section */}
        <div className="bg-white/15 border border-white/30 border-dashed rounded-xl p-4 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-lg text-white tracking-wider select-all">
              {promo.code}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/20 text-white hover:bg-white/30 border-white/30"
            onClick={handleCopy}
            rightIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? 'Tersalin!' : 'Salin'}
          </Button>
        </div>

        {/* Terms */}
        <details className="mt-6 group">
          <summary className="flex items-center justify-between text-white/80 text-sm font-medium cursor-pointer list-none">
            <span>Syarat & Ketentuan</span>
            <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </summary>
          <div className="mt-4 text-white/70 text-sm space-y-2">
            {promo.terms.map((term, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 flex-shrink-0" />
                <span>{term}</span>
              </div>
            ))}
          </div>
        </details>
      </div>
    </motion.div>
  );
}