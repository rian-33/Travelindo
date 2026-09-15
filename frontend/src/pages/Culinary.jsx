import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeSlideVariants, staggerItem } from '@/lib/motion';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Select } from '@/components/ui/Select';
import { Section, SectionHeader, SectionGrid } from '@/components/layout';
import { X } from 'lucide-react';
import { getCulinaryPlaces } from '@/services/api';

const mockCulinary = [
  { id: 'culinary-1', name: 'Warung Nasi Ayam Kedewatan', region: 'Bali', description: 'Nasi ayam khas Bali dengan sambal matah dan lawar.', imageUrl: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-2', name: 'Gudeg Yu Djum', region: 'Yogyakarta', description: 'Gudeg nangka manis dengan pilihan ayam dan telur.', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-3', name: 'Se\'i Sapi Lamalera', region: 'Labuan Bajo', description: 'Daging asap khas Nusa Tenggara dengan sambal lu\'at.', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-4', name: 'Ayam Taliwang Irama', region: 'Lombok', description: 'Ayam bakar pedas dengan plecing kangkung segar.', imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-5', name: 'Rumah Makan Padang Sederhana', region: 'Sumatera Utara', description: 'Hidangan Minang autentik dengan rendang sebagai andalan.', imageUrl: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-6', name: 'Rawon Nguling', region: 'Jawa Timur', description: 'Rawon kuah kluwek legendaris dengan daging yang lembut.', imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-7', name: 'Sate Makmur', region: 'Jawa Barat', description: 'Sate kambing dengan bumbu kacang khas Jawa Barat.', imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-8', name: 'Mie Aceh Titi Bobrok', region: 'Aceh', description: 'Mie goreng pedas khas Aceh dengan udang dan daging.', imageUrl: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80' },
  { id: 'culinary-9', name: 'Pempek Pak Raden', region: 'Sumatera Selatan', description: 'Pempek kapal selam original dengan cuko pedas manis.', imageUrl: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80' },
];

const regions = [
  { value: '', label: 'Seluruh Wilayah' },
  { value: 'Bali', label: 'Bali' },
  { value: 'Yogyakarta', label: 'Yogyakarta' },
  { value: 'Labuan Bajo', label: 'Labuan Bajo' },
  { value: 'Lombok', label: 'Lombok' },
  { value: 'Sumatera Utara', label: 'Sumatera Utara' },
  { value: 'Jawa Timur', label: 'Jawa Timur' },
  { value: 'Jawa Barat', label: 'Jawa Barat' },
  { value: 'Aceh', label: 'Aceh' },
  { value: 'Sumatera Selatan', label: 'Sumatera Selatan' },
];

export default function Culinary() {
  const [places, setPlaces] = useState([]);
  const [region, setRegion] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getCulinaryPlaces();
        setPlaces(data.length > 0 ? data : mockCulinary);
      } catch {
        setPlaces(mockCulinary);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredPlaces = useMemo(() => {
    if (!region) return places;
    return places.filter((place) => place.region === region);
  }, [places, region]);

  return (
    <div className="bg-surface-bg min-h-screen">
      <Section spacing="md" background="muted">
          <motion.div variants={fadeSlideVariants} className="mb-8">
            <SectionHeader
              title="Sajian Kuliner Khas"
              subtitle="Cicipi kekayaan rasa Nusantara dari wilayah pilihan Anda."
              action={
                region && (
                  <button
                    onClick={() => setRegion('')}
                    className="flex items-center gap-1 text-sm text-brand-primary hover:underline"
                  >
                    <X className="w-3 h-3" />
                    Hapus Filter
                  </button>
                )
              }
            />
          </motion.div>

          <motion.div variants={fadeSlideVariants} style={{ transitionDelay: '100ms' }}>
            <Select
              label="Wilayah"
              placeholder="Pilih wilayah"
              options={regions}
              value={region}
              onChange={setRegion}
              searchable
              clearable
            />
          </motion.div>
      </Section>

      <Section spacing="lg">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <motion.article key={i} className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-elevated animate-pulse">
                  <div className="aspect-video bg-surface-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-surface-muted rounded w-3/4 animate-pulse" />
                    <div className="h-6 bg-surface-muted rounded w-1/2 animate-pulse" />
                    <div className="h-4 bg-surface-muted rounded animate-pulse" />
                    <div className="h-4 bg-surface-muted rounded w-5/6 animate-pulse" />
                  </div>
                </motion.article>
              ))}
            </div>
          ) : filteredPlaces.length > 0 ? (
            <SectionGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              gap="gap-6"
              reveal
              stagger
            >
              {filteredPlaces.map((place, index) => (
                <motion.div key={place.id} variants={staggerItem}>
                  <CulinaryCard place={place} />
                </motion.div>
              ))}
            </SectionGrid>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg className="w-16 h-16 mx-auto text-text-muted/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="font-serif text-xl font-bold text-text-primary mb-2">Belum Ada Data Kuliner</h3>
              <p className="text-text-secondary">Coba pilih wilayah lain untuk melihat kuliner khasnya.</p>
            </motion.div>
          )}
      </Section>
    </div>
  );
}

function CulinaryCard({ place }) {
  return (
    <motion.article
      className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-elevated shadow-card hover:shadow-float transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <div className="aspect-video relative overflow-hidden">
        <OptimizedImage
          src={place.imageUrl}
          alt={place.name}
          preset="cardLandscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-surface-elevated/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-primary">
          {place.region}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-text-primary mb-2">{place.name}</h3>
        <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">{place.description}</p>
      </div>
    </motion.article>
  );
}