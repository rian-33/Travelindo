import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerItem } from '@/lib/motion';
import { Card, CardImage, CardContent, CardFooter, CardBadge } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Star, ArrowRight } from 'lucide-react';
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {featuredDestinations.map((dest) => (
          <motion.div key={dest.id} variants={staggerItem} className="h-full">
            <DestinationCard dest={dest} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function DestinationCard({ dest }) {
  return (
    <Link to={`/destination/${dest.id}`} className="group block h-full">
      <Card variant="default" hover className="flex flex-col h-full">
        <CardImage
          src={dest.imageUrl}
          alt={dest.name}
          aspect="landscape"
          className="group-hover:scale-105"
        >
          <CardBadge position="top-left">
            <div className="flex items-center gap-1 bg-surface-elevated/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-text-primary shadow-sm">
              <Star className="w-3 h-3 text-amber-500" />
              {dest.rating}
            </div>
          </CardBadge>

          {dest.featured && (
            <CardBadge position="top-right">
              <Badge stamp className="rotate-3">
                Pilihan
              </Badge>
            </CardBadge>
          )}
        </CardImage>

        <CardContent className="flex-1 flex flex-col p-4 lg:p-5">
          <div className="text-[11px] font-semibold text-text-muted mb-1.5 uppercase tracking-wider">
            {dest.location}
          </div>
          <h3 className="font-serif text-lg font-bold text-text-primary mb-3 group-hover:text-brand-primary transition-colors">
            {dest.name}
          </h3>

          <CardFooter className="mt-auto">
            <div>
              <p className="text-text-muted text-xs mb-1">Mulai dari</p>
              <p className="font-semibold text-text-primary text-base">
                {formatRupiah(dest.estimatedBudget)}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-text-inverse transition-all duration-300">
              <ArrowRight className="w-4 h-4 -rotate-45" />
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
}