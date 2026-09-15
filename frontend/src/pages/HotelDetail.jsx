import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeSlideVariants, scrollReveal } from '@/lib/motion';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Section } from '@/components/layout';
import { ArrowLeft, Star, MapPin, Users, BedDouble, Wifi, Sparkles, Calendar } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { mockHotels } from '@/data/hotels';

export default function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const found = mockHotels.find((h) => String(h.id) === String(id));
    setHotel(found || null);
    setActiveImage(0);
  }, [id]);

  if (!hotel) {
    return (
      <div className="bg-surface-bg min-h-[60vh]">
        <Section spacing="lg">
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-serif text-2xl font-bold text-text-primary mb-2">
                Penginapan Tidak Ditemukan
              </h2>
              <p className="text-text-secondary mb-8">
                Penginapan yang Anda cari tidak tersedia atau telah dihapus.
              </p>
              <Link
                to="/hotels"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary text-text-inverse hover:bg-brand-primary-hover px-6 py-3 font-semibold rounded-full transition-all duration-fast ease-brand"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Penginapan
              </Link>
            </motion.div>
        </Section>
      </div>
    );
  }

  const galleryImages = [
    hotel.image,
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop',
  ];

  return (
    <div className="bg-surface-bg min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[60vh] lg:h-[70vh]">
        <OptimizedImage
          src={galleryImages[activeImage]}
          alt={hotel.name}
          preset="hero"
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Back Button */}
        <Link
          to="/hotels"
          className="absolute top-6 left-6 z-10 w-12 h-12 rounded-full bg-surface-elevated/90 backdrop-blur-sm flex items-center justify-center shadow-card hover:bg-surface-elevated transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </Link>

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
              <OptimizedImage src={img} alt={`${hotel.name} ${i + 1}`} preset="thumbnail" className="w-full h-full object-cover" />
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
                  <Badge variant="primary" size="sm">{hotel.type}</Badge>
                  <Badge variant="secondary" size="sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    {hotel.location}
                  </Badge>
                </div>

                <h1 className="font-serif text-display-lg lg:text-display-xl font-bold text-text-primary mb-4">
                  {hotel.name}
                </h1>

                <div className="flex items-center gap-4 text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-amber-500 fill-current" />
                    <span className="font-semibold text-text-primary">{hotel.rating}</span>
                    <span className="text-sm">(1.2k ulasan)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-5 h-5" />
                    <span>{hotel.location}</span>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div variants={scrollReveal} style={{ transitionDelay: '100ms' }}>
                <h2 className="font-serif text-headline-2 font-bold text-text-primary mb-4">Tentang Penginapan</h2>
                <p className="text-text-secondary leading-relaxed">{hotel.description}</p>
              </motion.div>

              {/* Amenities */}
              <motion.div variants={scrollReveal} style={{ transitionDelay: '200ms' }}>
                <h2 className="font-serif text-headline-2 font-bold text-text-primary mb-4">Fasilitas</h2>
                <div className="flex flex-wrap gap-3">
                  {hotel.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline" size="lg" className="gap-1.5">
                      <Sparkles className="w-4 h-4 text-brand-primary" />
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Highlights */}
              <motion.div variants={scrollReveal} style={{ transitionDelay: '300ms' }}>
                <h2 className="font-serif text-headline-2 font-bold text-text-primary mb-4">Yang Perlu Diketahui</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <HighlightCard icon={<BedDouble className="w-5 h-5" />} label="Kamar" value={hotel.type} />
                  <HighlightCard icon={<Users className="w-5 h-5" />} label="Kapasitas" value="2 Orang" />
                  <HighlightCard icon={<Wifi className="w-5 h-5" />} label="WiFi" value="Gratis" />
                  <HighlightCard icon={<Calendar className="w-5 h-5" />} label="Check-in" value="14:00" />
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Booking Panel */}
            <motion.div variants={scrollReveal} style={{ transitionDelay: '150ms' }} className="lg:col-span-1">
              <div className="sticky top-24 bg-surface-elevated rounded-[var(--radius-feature)] shadow-float border border-border p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-muted text-sm">Per malam</p>
                    <p className="font-serif text-3xl font-bold text-brand-primary">{formatRupiah(hotel.price)}</p>
                  </div>
                  <Badge variant="primary">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {hotel.rating}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-text-primary">Tanggal Menginap</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input type="date" className="input-base pl-12" />
                  </div>

                  <label className="block text-sm font-medium text-text-primary">Jumlah Kamar</label>
                  <select className="input-base">
                    <option value="1">1 Kamar</option>
                    <option value="2">2 Kamar</option>
                    <option value="3">3 Kamar</option>
                    <option value="4">4+ Kamar</option>
                  </select>
                </div>

                <Button className="w-full" size="lg">
                  Pesan Sekarang
                </Button>

                <div className="pt-4 border-t border-border space-y-3 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Harga per Malam</span>
                    <span className="font-medium text-text-primary">{formatRupiah(hotel.price)}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Biaya Layanan</span>
                    <span className="font-medium text-text-primary">{formatRupiah(Math.round(hotel.price * 0.07))}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Pajak</span>
                    <span className="font-medium text-text-primary">{formatRupiah(Math.round(hotel.price * 0.11))}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-semibold text-text-primary">
                    <span>Total per Malam</span>
                    <span>{formatRupiah(Math.round(hotel.price * 1.18))}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
      </Section>
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