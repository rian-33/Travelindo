import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeSlideVariants, scrollReveal } from '@/lib/motion';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Section } from '@/components/layout';
import { MapPin, Star, Calendar, Users, Tag, ArrowLeft, Heart, Share2, Map } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { useFavoritesStore } from '@/stores';
import { DestinationMap } from '@/components/maps/DestinationMap';
import { getDestinationById } from '@/services/api';

const mockDestinations = {
  '1': { id: '1', name: 'Pantai Kuta', location: 'Bali', rating: 4.8, estimatedBudget: 1500000, imageUrl: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80', latitude: -8.7185, longitude: 115.1686, tags: ['Bali', 'Pantai'], description: 'Pantai Kuta adalah salah satu pantai paling terkenal di Bali dengan ombak yang cocok untuk berselancar dan sunset yang spektakuler.' },
  '2': { id: '2', name: 'Candi Borobudur', location: 'Jawa Tengah', rating: 4.9, estimatedBudget: 1200000, imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80', latitude: -7.6079, longitude: 110.2038, tags: ['Jawa', 'Budaya', 'Yogyakarta'], description: 'Candi Borobudur adalah candi Buddha terbesar di dunia dan situs warisan dunia UNESCO yang megah.' },
  '3': { id: '3', name: 'Taman Nasional Komodo', location: 'Nusa Tenggara Timur', rating: 5.0, estimatedBudget: 3500000, imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', latitude: -8.5433, longitude: 119.4894, tags: ['NTT', 'Alam', 'Labuan Bajo'], description: 'Taman Nasional Komodo adalah habitat asli komodo dan surga diving dengan keanekaragaman hayati laut yang kaya.' },
  '4': { id: '4', name: 'Gunung Rinjani', location: 'Nusa Tenggara Barat', rating: 4.7, estimatedBudget: 2000000, imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80', latitude: -8.4105, longitude: 116.4589, tags: ['Lombok', 'Gunung', 'NTB'], description: 'Gunung Rinjani adalah gunung api aktif kedua tertinggi di Indonesia dengan danau kawah Segara Anak yang indah.' },
  '5': { id: '5', name: 'Raja Ampat', location: 'Papua Barat', rating: 5.0, estimatedBudget: 8000000, imageUrl: 'https://images.unsplash.com/photo-1516690553959-71a414d6b9b6?auto=format&fit=crop&w=800&q=80', latitude: -0.5067, longitude: 130.5956, tags: ['Papua', 'Pantai', 'Diving', 'Laut'], description: 'Raja Ampat adalah surga menyelam kelas dunia dengan keanekaragaman hayati laut tertinggi dan gugusan pulau karst yang dramatis.' },
  '6': { id: '6', name: 'Danau Toba', location: 'Sumatera Utara', rating: 4.7, estimatedBudget: 2500000, imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80', latitude: 2.6889, longitude: 98.8181, tags: ['Sumatra', 'Danau', 'Alam', 'Medan'], description: 'Danau Toba adalah danau vulkanik terbesar di dunia dengan Pulau Samosir di tengahnya dan budaya Batak yang kental.' },
  '7': { id: '7', name: 'Gunung Bromo', location: 'Jawa Timur', rating: 4.8, estimatedBudget: 1800000, imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80', latitude: -7.9425, longitude: 112.9530, tags: ['Jawa', 'Gunung', 'Alam', 'Malang'], description: 'Gunung Bromo menawarkan lautan pasir, kawah berasap, dan sunrise yang legendaris dari Penanjakan.' },
  '8': { id: '8', name: 'Kepulauan Derawan', location: 'Kalimantan Timur', rating: 4.8, estimatedBudget: 4500000, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', latitude: 2.2833, longitude: 118.1167, tags: ['Kalimantan', 'Pantai', 'Diving', 'Pulau'], description: 'Kepulauan Derawan adalah surga bawah laut dengan danau ubur-ubur, penyu hijau, dan pasir putih yang masih alami.' },
  '9': { id: '9', name: 'Tana Toraja', location: 'Sulawesi Selatan', rating: 4.7, estimatedBudget: 3000000, imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80', latitude: -3.1234, longitude: 119.8765, tags: ['Sulawesi', 'Budaya', 'Alam', 'Makassar'], description: 'Tana Toraja terkenal dengan rumah tongkonan, upacara adat Rambu Solo, dan pemandangan pegunungan yang memesona.' },
};

export default function DetailDestination() {
  const { id } = useParams();
  const [dest, setDest] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const { isDestinationFavorite, toggleDestination } = useFavoritesStore();

  useEffect(() => {
    let mounted = true;
    const data = mockDestinations[id] || null;
    setDest(data);
    if (data) {
      getDestinationById(id).then((fromApi) => {
        if (mounted && fromApi) setDest((prev) => ({ ...(prev || {}), ...fromApi }));
      });
    }
    return () => {
      mounted = false;
    };
  }, [id]);

  const isFav = dest ? isDestinationFavorite(dest.id) : false;

  if (!dest) {
    return (
      <div className="bg-surface-bg min-h-[60vh]">
        <Section spacing="lg">
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-serif text-2xl font-bold text-text-primary mb-2">
                Destinasi Tidak Ditemukan
              </h2>
              <p className="text-text-secondary mb-8">
                Destinasi yang Anda cari tidak tersedia atau telah dihapus.
              </p>
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary text-text-inverse hover:bg-brand-primary-hover px-6 py-3 font-semibold rounded-full transition-all duration-fast ease-brand"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Destinasi
              </Link>
            </motion.div>
        </Section>
      </div>
    );
  }

  const galleryImages = [
    dest.imageUrl,
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  ];

  return (
    <div className="bg-surface-bg min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[60vh] lg:h-[70vh]">
        <OptimizedImage
          src={galleryImages[activeImage]}
          alt={dest.name}
          preset="hero"
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-10 w-12 h-12 rounded-full bg-surface-elevated/90 backdrop-blur-sm flex items-center justify-center shadow-card hover:bg-surface-elevated transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </Link>

        {/* Actions */}
        <div className="absolute top-6 right-6 z-10 flex gap-2">
          <button
            onClick={() => toggleDestination(dest)}
            className={cn(
              'w-12 h-12 rounded-full bg-surface-elevated/90 backdrop-blur-sm flex items-center justify-center shadow-card transition-all',
              isFav ? 'text-red-500' : 'text-text-secondary hover:text-red-500'
            )}
            aria-label={isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            <Heart className={cn('w-5 h-5', isFav && 'fill-current')} />
          </button>
          <button className="w-12 h-12 rounded-full bg-surface-elevated/90 backdrop-blur-sm flex items-center justify-center shadow-card hover:bg-surface-elevated transition-colors" aria-label="Bagikan">
            <Share2 className="w-5 h-5 text-text-primary" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={cn(
                'w-16 h-16 rounded-xl overflow-hidden border-2 transition-all',
                i === activeImage ? 'border-brand-primary scale-110' : 'border-transparent hover:border-brand-primary/50'
              )}
              aria-label={`Gambar ${i + 1}`}
              aria-current={i === activeImage ? 'true' : 'false'}
            >
              <OptimizedImage src={img} alt={`${dest.name} ${i + 1}`} preset="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <Section spacing="lg" background="muted">
          <motion.div variants={fadeSlideVariants} className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div variants={scrollReveal}>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="secondary" size="sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    {dest.location}
                  </Badge>
                  {dest.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="font-serif text-display-lg lg:text-display-xl font-bold text-text-primary mb-4">
                  {dest.name}
                </h1>

                <div className="flex items-center gap-4 text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-amber-500 fill-current" />
                    <span className="font-semibold text-text-primary">{dest.rating}</span>
                    <span className="text-sm">(1.2k ulasan)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-5 h-5" />
                    <span>{dest.location}</span>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div variants={scrollReveal} style={{ transitionDelay: '100ms' }}>
                <h2 className="font-serif text-headline-2 font-bold text-text-primary mb-4">Tentang Destinasi</h2>
                <p className="text-text-secondary leading-relaxed">{dest.description}</p>
              </motion.div>

              {/* Highlights */}
              <motion.div variants={scrollReveal} style={{ transitionDelay: '200ms' }}>
                <h2 className="font-serif text-headline-2 font-bold text-text-primary mb-4">Yang Perlu Diketahui</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <HighlightCard icon={<Calendar className="w-5 h-5" />} label="Durasi" value="2-3 Hari" />
                  <HighlightCard icon={<Users className="w-5 h-5" />} label="Kesulitan" value="Sedang" />
                  <HighlightCard icon={<Tag className="w-5 h-5" />} label="Musim Terbaik" value="April - Oktober" />
                  <HighlightCard icon={<MapPin className="w-5 h-5" />} label="Akses" value="Penerangan + Darat" />
                </div>
              </motion.div>

              {/* Map */}
              <motion.div variants={scrollReveal} style={{ transitionDelay: '300ms' }}>
                <h2 className="font-serif text-headline-2 font-bold text-text-primary mb-4">Lokasi</h2>
                <button
                  onClick={() => setShowMap(true)}
                  className="w-full aspect-video rounded-[var(--radius-card)] overflow-hidden border border-border bg-surface-muted flex items-center justify-center gap-3 text-brand-primary font-medium hover:bg-surface-elevated transition-colors"
                >
                  <Map className="w-6 h-6" />
                  Buka Peta Interaktif
                </button>
              </motion.div>
            </div>

            {/* Sidebar - Booking Panel */}
            <motion.div variants={scrollReveal} style={{ transitionDelay: '150ms' }} className="lg:col-span-1">
              <div className="sticky top-24 bg-surface-elevated rounded-[var(--radius-feature)] shadow-float border border-border p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-muted text-sm">Mulai dari</p>
                    <p className="font-serif text-3xl font-bold text-brand-primary">{formatRupiah(dest.estimatedBudget)}</p>
                  </div>
                  <Badge variant="primary">Orang</Badge>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-text-primary">Tanggal Keberangkatan</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input type="date" className="input-base pl-12" />
                  </div>

                  <label className="block text-sm font-medium text-text-primary">Jumlah Orang</label>
                  <select className="input-base">
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                    <option value="4">4 Orang</option>
                    <option value="5">5+ Orang</option>
                  </select>
                </div>

                <Button className="w-full" size="lg" rightIcon={<ArrowLeft className="w-4 h-4 -rotate-90" />}>
                  Pesan Sekarang
                </Button>

                <div className="pt-4 border-t border-border space-y-3 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Harga Paket</span>
                    <span className="font-medium text-text-primary">{formatRupiah(dest.estimatedBudget)}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Biaya Layanan</span>
                    <span className="font-medium text-text-primary">{formatRupiah(Math.round(dest.estimatedBudget * 0.05))}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Pajak</span>
                    <span className="font-medium text-text-primary">{formatRupiah(Math.round(dest.estimatedBudget * 0.11))}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-semibold text-text-primary">
                    <span>Total</span>
                    <span>{formatRupiah(Math.round(dest.estimatedBudget * 1.16))}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <FeatureIcon icon={<Star className="w-5 h-5" />} label="Rating" value={dest.rating} />
                  <FeatureIcon icon={<MapPin className="w-5 h-5" />} label="Lokasi" value={dest.location} />
                  <FeatureIcon icon={<Tag className="w-5 h-5" />} label="Tag" value={dest.tags.length} />
                </div>
              </div>
            </motion.div>
          </motion.div>
      </Section>

      {/* Map Modal */}
      {showMap && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowMap(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Peta lokasi"
        >
          <motion.div
            className="bg-surface-elevated rounded-[var(--radius-feature)] shadow-float max-w-4xl w-full max-h-[90vh] border border-border overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-surface-elevated z-10">
              <h3 className="font-serif text-xl font-bold text-text-primary">Lokasi {dest.name}</h3>
              <button onClick={() => setShowMap(false)} className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-muted transition-colors" aria-label="Tutup peta">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="h-[500px]">
              <DestinationMap destination={dest} readOnly />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function HighlightCard({ icon, label, value }) {
  return (
    <div className="bg-surface-elevated rounded-xl p-4 border border-border text-center">
      <div className="text-brand-primary mb-2">{icon}</div>
      <p className="font-semibold text-text-primary">{value}</p>
      <p className="text-caption text-text-muted uppercase tracking-wider">{label}</p>
    </div>
  );
}

function FeatureIcon({ icon, label, value }) {
  return (
    <div className="p-3 rounded-xl bg-surface-muted">
      <div className="text-brand-primary mb-1">{icon}</div>
      <p className="font-semibold text-text-primary text-sm">{value}</p>
      <p className="text-caption text-text-muted">{label}</p>
    </div>
  );
}