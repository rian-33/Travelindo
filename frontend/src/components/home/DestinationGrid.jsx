import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { scrollReveal, staggerContainer, staggerItem } from '@/lib/motion';
import { Card, CardImage, CardContent, CardFooter, CardBadge } from '@/components/ui/Card';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

const featuredDestinations = [
  {
    id: 1,
    name: 'Raja Ampat',
    location: 'Papua Barat',
    rating: 5.0,
    estimatedBudget: 8000000,
    imageUrl: 'https://images.unsplash.com/photo-1516690553959-71a414d6b9b6?auto=format&fit=crop&w=800&q=80',
    tags: ['Pulau', 'Diving', 'Laut'],
    featured: true,
  },
  {
    id: 2,
    name: 'Candi Borobudur',
    location: 'Jawa Tengah',
    rating: 4.9,
    estimatedBudget: 1200000,
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    tags: ['Budaya', 'Sejarah', 'UNESCO'],
    featured: true,
  },
  {
    id: 3,
    name: 'Pantai Kuta',
    location: 'Bali',
    rating: 4.8,
    estimatedBudget: 1500000,
    imageUrl: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80',
    tags: ['Pantai', 'Surf', 'Sunset'],
  },
  {
    id: 4,
    name: 'Taman Nasional Komodo',
    location: 'Nusa Tenggara Timur',
    rating: 5.0,
    estimatedBudget: 3500000,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tags: ['Komodo', 'Diving', 'Alam'],
  },
  {
    id: 5,
    name: 'Gunung Rinjani',
    location: 'Nusa Tenggara Barat',
    rating: 4.7,
    estimatedBudget: 2000000,
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80',
    tags: ['Gunung', 'Hiking', 'Segara Anak'],
  },
  {
    id: 6,
    name: 'Danau Toba',
    location: 'Sumatera Utara',
    rating: 4.7,
    estimatedBudget: 2500000,
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    tags: ['Danau', 'Vulkanik', 'Budaya Batak'],
  },
  {
    id: 7,
    name: 'Gunung Bromo',
    location: 'Jawa Timur',
    rating: 4.8,
    estimatedBudget: 1800000,
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
    tags: ['Gunung', 'Sunrise', 'Kawah'],
  },
  {
    id: 8,
    name: 'Kepulauan Derawan',
    location: 'Kalimantan Timur',
    rating: 4.8,
    estimatedBudget: 4500000,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    tags: ['Pulau', 'Diving', 'Penyu'],
  },
];

export function DestinationGrid({ onViewAll }) {
  const featured = featuredDestinations.filter((d) => d.featured);
  const regular = featuredDestinations.filter((d) => !d.featured);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-10 lg:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="font-serif text-display-lg font-bold text-text-primary mb-3">
            Destinasi Pilihan
          </h2>
          <p className="text-text-secondary font-light text-lg">
            Kurasi tempat-tempat menakjubkan untuk dicatat di jurnal Anda.
          </p>
        </div>
        {onViewAll && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <Button variant="ghost" size="md" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={onViewAll}>
              Lihat Semua Destinasi
            </Button>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-6">
        {/* Featured Cards - span 3 columns each on lg+ */}
        {featured.map((dest, index) => (
          <motion.div
            key={dest.id}
            variants={staggerItem}
            style={{ gridColumn: 'span 3', gridRow: index === 0 ? 'span 1' : 'span 1' }}
          >
            <DestinationCard dest={dest} variant="featured" />
          </motion.div>
        ))}

        {/* Regular Cards */}
        {regular.map((dest, index) => (
          <motion.div key={dest.id} variants={staggerItem}>
            <DestinationCard dest={dest} variant="default" />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function DestinationCard({ dest, variant = 'default' }) {
  const isFeatured = variant === 'featured';

  return (
    <Link to={`/destination/${dest.id}`} className="group block">
      <Card variant={isFeatured ? 'featured' : 'default'} hover>
        <CardImage
          src={dest.imageUrl}
          alt={dest.name}
          aspect={isFeatured ? 'landscape' : 'portrait'}
          preset={isFeatured ? 'cardLandscape' : 'cardPortrait'}
        >
          {/* Gradient overlay for text readability on featured */}
          {isFeatured && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          )}

          {/* Badges */}
          <CardBadge position="top-left">
            <div className="flex items-center gap-1 bg-surface-elevated/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-text-primary shadow-sm">
              <Star className="w-3 h-3 text-amber-500" />
              {dest.rating}
            </div>
          </CardBadge>

          <CardBadge position="top-right">
            <Badge variant="stamp" className="rotate-3">
              Pilihan
            </Badge>
          </CardBadge>

          {/* Tags on featured */}
          {isFeatured && (
            <CardBadge position="bottom-left">
              <div className="flex flex-wrap gap-1.5 max-w-[80%]">
                {dest.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardBadge>
          )}
        </CardImage>

        <CardContent className={cn(isFeatured ? 'pt-0' : '')}>
          {isFeatured ? (
            <div className="absolute bottom-6 left-6 right-6 text-text-inverse">
              <p className="text-caption text-brand-secondary-light mb-2 uppercase tracking-wider">
                {dest.location}
              </p>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-4">
                {dest.name}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand-secondary-light">
                  <MapPin className="w-4 h-4" />
                  <span>Mulai dari</span>
                </div>
                <p className="font-serif text-2xl font-bold">
                  {formatRupiah(dest.estimatedBudget)}
                </p>
              </div>
            </div>
          ) : (
            <>
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
                  <ArrowRight className="w-5 h-5 -rotate-45" />
                </div>
              </CardFooter>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}