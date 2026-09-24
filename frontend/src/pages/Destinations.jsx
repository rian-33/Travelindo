import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeSlideVariants, staggerItem } from '@/lib/motion';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Card, CardImage, CardContent, CardFooter } from '@/components/ui/Card';
import { Section, SectionHeader, SectionGrid } from '@/components/layout';
import { Star, ChevronRight, Filter, X, Map } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { useFavoritesStore } from '@/stores';
import { getDestinations, getCulinaryPlaces } from '@/services/api';
import { destinations as mockDestinations } from '@/data/destinations';

const mockCulinary = [
  { id: 'culinary-1', name: 'Warung Nasi Ayam Kedewatan', region: 'Bali', description: 'Nasi ayam khas Bali dengan sambal matah dan lawar.', imageUrl: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-2', name: 'Gudeg Yu Djum', region: 'Yogyakarta', description: 'Gudeg nangka manis dengan pilihan ayam dan telur.', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-3', name: 'Se\'i Sapi Lamalera', region: 'Labuan Bajo', description: 'Daging asap khas Nusa Tenggara dengan sambal lu\'at.', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-4', name: 'Ayam Taliwang Irama', region: 'Lombok', description: 'Ayam bakar pedas dengan plecing kangkung segar.', imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-5', name: 'Rumah Makan Padang Sederhana', region: 'Sumatera Utara', description: 'Hidangan Minang autentik dengan rendang sebagai andalan.', imageUrl: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-6', name: 'Rawon Nguling', region: 'Jawa Timur', description: 'Rawon kuah kluwek legendaris dengan daging yang lembut.', imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80' },
];

const regions = [
  { value: '', label: 'Seluruh Indonesia' },
  { value: 'Bali', label: 'Bali' },
  { value: 'Jawa Tengah', label: 'Jawa Tengah' },
  { value: 'Nusa Tenggara Timur', label: 'Nusa Tenggara Timur' },
  { value: 'Nusa Tenggara Barat', label: 'Nusa Tenggara Barat' },
  { value: 'Papua Barat', label: 'Papua Barat' },
  { value: 'Sumatera Utara', label: 'Sumatera Utara' },
  { value: 'Jawa Timur', label: 'Jawa Timur' },
  { value: 'Kalimantan Timur', label: 'Kalimantan Timur' },
  { value: 'Sulawesi Selatan', label: 'Sulawesi Selatan' },
];

const sortOptions = [
  { value: 'rating', label: 'Rating Tertinggi' },
  { value: 'budget-asc', label: 'Budget Terendah' },
  { value: 'budget-desc', label: 'Budget Tertinggi' },
  { value: 'name', label: 'Nama (A-Z)' },
];

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [culinaryPlaces, setCulinaryPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isDestinationFavorite, toggleDestination } = useFavoritesStore();

  // Sync with URL params
  const region = searchParams.get('region') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'rating';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [destData, culinaryData] = await Promise.all([
          getDestinations(search, true),
          getCulinaryPlaces(),
        ]);
        setDestinations(destData.length > 0 ? destData : mockDestinations);
        setCulinaryPlaces(culinaryData.length > 0 ? culinaryData : mockCulinary);
      } catch {
        setDestinations(mockDestinations);
        setCulinaryPlaces(mockCulinary);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [search, region]);

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    if (region) {
      result = result.filter((d) => d.location === region);
    }

    if (search) {
      const normalizedSearch = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(normalizedSearch) ||
          d.location.toLowerCase().includes(normalizedSearch) ||
          d.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))
      );
    }

    // Sort
    switch (sort) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'budget-asc':
        result.sort((a, b) => a.estimatedBudget - b.estimatedBudget);
        break;
      case 'budget-desc':
        result.sort((a, b) => b.estimatedBudget - a.estimatedBudget);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [destinations, region, search, sort]);

  // Filter culinary
  const filteredCulinary = useMemo(() => {
    if (!region) return culinaryPlaces;
    return culinaryPlaces.filter((c) => c.region === region);
  }, [culinaryPlaces, region]);

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = region || search;

  return (
    <div className="bg-surface-bg min-h-screen">
      {/* Header Section */}
      <Section spacing="md" background="muted">
          <motion.div variants={fadeSlideVariants} className="mb-8">
            <SectionHeader
              title="Eksplorasi Berdasarkan Wilayah"
              subtitle="Pilih wilayah untuk melihat wisata dan kuliner khas di sekitarnya."
              action={
                hasActiveFilters && (
                  <Button variant="ghost" size="sm" leftIcon={<X className="w-4 h-4" />} onClick={clearFilters}>
                    Hapus Filter
                  </Button>
                )
              }
            />
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeSlideVariants} style={{ transitionDelay: '100ms' }} className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex-1 max-w-md">
              <Select
                label="Wilayah"
                placeholder="Pilih wilayah"
                options={regions}
                value={region}
                onChange={(v) => handleFilterChange('region', v)}
                searchable
                clearable
              />
            </div>
            <div className="flex-1 max-w-md">
              <Select
                label="Urutkan"
                placeholder="Urutkan berdasarkan"
                options={sortOptions}
                value={sort}
                onChange={(v) => handleFilterChange('sort', v)}
              />
            </div>
            <div className="flex-1 max-w-md lg:hidden">
              <Button variant="outline" className="w-full" leftIcon={<Filter className="w-4 h-4" />}>
                Filter Lanjutan
              </Button>
            </div>
          </motion.div>
      </Section>

      {/* Results */}
      <Section spacing="lg">
          {/* Destinations */}
          <motion.section variants={fadeSlideVariants} className="mb-16 lg:mb-24">
            <SectionHeader
              title="Tempat Wisata"
              subtitle={`${filteredDestinations.length} tempat ditemukan`}
            />

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Card key={i} variant="default" className="animate-pulse">
                    <CardImage aspect="portrait" preset="cardPortrait" src="/placeholder.svg" />
                    <CardContent>
                      <div className="h-4 bg-surface-muted rounded w-3/4 mb-3 animate-pulse" />
                      <div className="h-6 bg-surface-muted rounded w-1/2 animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredDestinations.length > 0 ? (
              <SectionGrid
                columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
                gap="gap-6"
                reveal
                stagger
              >
                {filteredDestinations.map((dest) => (
                  <motion.div key={dest.id} variants={staggerItem}>
                    <DestinationCard dest={dest} isFavorite={isDestinationFavorite(dest.id)} onToggleFavorite={toggleDestination} />
                  </motion.div>
                ))}
              </SectionGrid>
            ) : (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Map className="w-16 h-16 mx-auto text-text-muted/50 mb-4" />
                <h3 className="font-serif text-xl font-bold text-text-primary mb-2">Tidak Ada Destinasi Ditemukan</h3>
                <p className="text-text-secondary">Coba ubah filter atau kata kunci pencarian Anda.</p>
              </motion.div>
            )}
          </motion.section>

          {/* Culinary */}
          <motion.section variants={fadeSlideVariants}>
            <SectionHeader
              title="Kuliner Khas"
              subtitle={`${filteredCulinary.length} tempat ditemukan`}
            />

            {filteredCulinary.length > 0 ? (
              <SectionGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                gap="gap-6"
                reveal
                stagger
              >
                {filteredCulinary.map((place) => (
                  <motion.div key={place.id} variants={staggerItem}>
                    <CulinaryCard place={place} />
                  </motion.div>
                ))}
              </SectionGrid>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-text-secondary">Belum ada data kuliner di wilayah ini.</p>
              </motion.div>
            )}
          </motion.section>
      </Section>
    </div>
  );
}

function DestinationCard({ dest, isFavorite, onToggleFavorite }) {
  return (
    <Link to={`/destination/${dest.id}`} className="group block">
      <Card variant="default" hover>
        <CardImage
          src={dest.imageUrl}
          alt={dest.name}
          aspect="portrait"
          preset="cardPortrait"
        >
          <div className="absolute top-3 left-3 flex gap-2">
            <button
              onClick={(e) => { e.preventDefault(); onToggleFavorite(dest); }}
              className={cn(
                'w-10 h-10 rounded-full bg-surface-elevated/90 backdrop-blur-sm flex items-center justify-center shadow-card transition-all',
                isFavorite ? 'text-red-500' : 'text-text-secondary hover:text-red-500'
              )}
              aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
            >
              <svg className={cn('w-5 h-5', isFavorite && 'fill-current')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>
          </div>

          <div className="absolute top-3 right-3 bg-surface-elevated/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-text-primary shadow-sm flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-500 fill-current" />
            {dest.rating}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
            {dest.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" size="sm" className="bg-surface-elevated/90 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </CardImage>

        <CardContent className="pt-0">
          <div className="text-caption font-semibold text-text-secondary mb-2 uppercase tracking-wider">
            {dest.location}
          </div>
          <h3 className="font-serif text-xl font-bold text-text-primary mb-3 group-hover:text-brand-primary transition-colors">
            {dest.name}
          </h3>

          <CardFooter>
            <div>
              <p className="text-text-muted text-xs mb-1">Mulai dari</p>
              <p className="font-semibold text-text-primary text-lg">
                {formatRupiah(dest.estimatedBudget)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-text-inverse transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
}

function CulinaryCard({ place }) {
  return (
    <Card variant="default" hover className="group">
      <CardImage
        src={place.imageUrl}
        alt={place.name}
        aspect="landscape"
        className="group-hover:scale-105"
      >
        <div className="absolute top-3 left-3 bg-surface-elevated/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-primary">
          {place.region}
        </div>
      </CardImage>
      <CardContent>
        <h3 className="font-serif text-lg font-bold text-text-primary mb-2">{place.name}</h3>
        <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">{place.description}</p>
      </CardContent>
    </Card>
  );
}