import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeSlideVariants, staggerItem } from '@/lib/motion';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Card, CardImage, CardContent, CardFooter } from '@/components/ui/Card';
import { Section, SectionHeader, SectionGrid } from '@/components/layout';
import { Star, X, Search } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { mockHotels } from '@/data/hotels';

const locations = [
  { value: '', label: 'Semua Lokasi' },
  { value: 'Bali', label: 'Bali' },
  { value: 'Yogyakarta', label: 'Yogyakarta' },
  { value: 'Bandung', label: 'Bandung' },
  { value: 'Labuan Bajo', label: 'Labuan Bajo' },
  { value: 'Jakarta', label: 'Jakarta' },
  { value: 'Jawa Timur', label: 'Jawa Timur' },
  { value: 'Jawa Tengah', label: 'Jawa Tengah' },
];

const types = [
  { value: '', label: 'Semua Tipe' },
  { value: 'Hotel', label: 'Hotel' },
  { value: 'Resort', label: 'Resort' },
  { value: 'Villa', label: 'Villa' },
];

const sortOptions = [
  { value: 'rating', label: 'Rating Tertinggi' },
  { value: 'price-asc', label: 'Harga Terendah' },
  { value: 'price-desc', label: 'Harga Tertinggi' },
];

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [sort, setSort] = useState('rating');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setHotels(mockHotels);
    setIsLoading(false);
  }, []);

  const filteredHotels = useMemo(() => {
    let result = [...hotels];

    if (location) result = result.filter((h) => h.location === location);
    if (type) result = result.filter((h) => h.type === type);
    if (search) {
      const normalized = search.toLowerCase();
      result = result.filter((h) => h.name.toLowerCase().includes(normalized) || h.location.toLowerCase().includes(normalized));
    }

    switch (sort) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [hotels, location, type, search, sort]);

  const hasFilters = location || type || search;

  return (
    <div className="bg-surface-bg min-h-screen">
      <Section spacing="md" background="muted">
          <motion.div variants={fadeSlideVariants} className="mb-8">
            <SectionHeader
              title="Penginapan Eksklusif"
              subtitle="Tempat beristirahat terbaik setelah seharian menjelajah."
              action={
                hasFilters && (
                  <Button variant="ghost" size="sm" leftIcon={<X className="w-4 h-4" />} onClick={() => { setLocation(''); setType(''); setSearch(''); }}>
                    Hapus Filter
                  </Button>
                )
              }
            />
          </motion.div>

          <motion.div variants={fadeSlideVariants} style={{ transitionDelay: '100ms' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Cari hotel, lokasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-base pl-12"
              />
            </div>
            <Select
              label="Lokasi"
              placeholder="Pilih lokasi"
              options={locations}
              value={location}
              onChange={setLocation}
              searchable
              clearable
            />
            <Select
              label="Tipe"
              placeholder="Tipe penginapan"
              options={types}
              value={type}
              onChange={setType}
              searchable
              clearable
            />
            <Select
              label="Urutkan"
              placeholder="Urutkan"
              options={sortOptions}
              value={sort}
              onChange={setSort}
            />
          </motion.div>
      </Section>

      <Section spacing="lg">
          <motion.div variants={fadeSlideVariants}>
            <SectionHeader
              title={`Ditemukan ${filteredHotels.length} Penginapan`}
            />
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} variant="default" className="animate-pulse">
                  <CardImage aspect="landscape" preset="cardLandscape" src="/placeholder.svg" />
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-4 bg-surface-muted rounded w-3/4 animate-pulse" />
                      <div className="h-6 bg-surface-muted rounded w-1/2 animate-pulse" />
                      <div className="flex gap-2">
                        <div className="h-8 bg-surface-muted rounded flex-1 animate-pulse" />
                        <div className="h-8 bg-surface-muted rounded w-20 animate-pulse" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredHotels.length > 0 ? (
            <SectionGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              gap="gap-6"
              reveal
              stagger
            >
              {filteredHotels.map((hotel, index) => (
                <motion.div key={hotel.id} variants={staggerItem}>
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
            </SectionGrid>
          ) : (
            <motion.div className="text-center py-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <svg className="w-16 h-16 mx-auto text-text-muted/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <h3 className="font-serif text-xl font-bold text-text-primary mb-2">Tidak Ada Penginapan Ditemukan</h3>
              <p className="text-text-secondary">Coba ubah filter atau kata kunci pencarian Anda.</p>
            </motion.div>
          )}
      </Section>
    </div>
  );
}

function HotelCard({ hotel }) {
  return (
    <Link to={`/hotels/${hotel.id}`} className="block group">
      <Card variant="immersive" hover>
        <CardImage
          src={hotel.image}
          alt={hotel.name}
          aspect="landscape"
          preset="cardLandscape"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-500" />

          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="primary" size="sm">{hotel.type}</Badge>
            <Badge variant="secondary" size="sm">{hotel.location}</Badge>
          </div>

          <div className="absolute top-3 right-3 bg-surface-elevated/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-text-primary shadow-sm flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-500 fill-current" />
            {hotel.rating}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
            {hotel.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="outline" size="sm" className="bg-surface-elevated/90 backdrop-blur-sm text-xs">
                {amenity}
              </Badge>
            ))}
          </div>
        </CardImage>

        <CardContent className="relative -mt-6 pb-6">
          <div className="bg-surface-elevated rounded-[var(--radius-card)] p-5 shadow-card border border-border mx-4 relative z-10">
            <p className="text-caption font-semibold text-brand-primary mb-2 uppercase tracking-wider">
              {hotel.type} • {hotel.location}
            </p>
            <h3 className="font-serif text-xl font-bold text-text-primary mb-3 group-hover:text-brand-primary transition-colors">
              {hotel.name}
            </h3>

            <CardFooter>
              <div>
                <p className="text-text-muted text-xs mb-1">Per malam</p>
                <p className="font-semibold text-text-primary text-xl">
                  {formatRupiah(hotel.price)}
                </p>
              </div>
              <Button size="sm" variant="primary" className="w-full sm:w-auto">
                Pesan
              </Button>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}