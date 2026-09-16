import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { islandPopVariants } from '@/lib/motion';
import { Card, CardImage, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

const islands = [
  {
    id: 'bali',
    name: 'Bali',
    tagline: 'Dewata Island',
    description: 'Pulau dewata dengan pantai indah, budaya kaya, dan sunset legendaris.',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80',
    destinations: 12,
    rating: 4.8,
    budget: 1500000,
    slug: 'bali',
  },
  {
    id: 'raja_ampat',
    name: 'Raja Ampat',
    tagline: 'Surga Di Bumi',
    description: 'Keanekaragaman hayati laut terbaik di dunia dengan karang dan ikan spektakuler.',
    image: 'https://images.unsplash.com/photo-1516690553959-71a414d6b9b6?auto=format&fit=crop&w=800&q=80',
    destinations: 8,
    rating: 5.0,
    budget: 8000000,
    slug: 'raja-ampat',
  },
  {
    id: 'komodo',
    name: 'Komodo',
    tagline: 'Naga Purba',
    description: 'Rumah komodo liar, pantai pink, dan spot diving kelas dunia.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    destinations: 6,
    rating: 4.9,
    budget: 3500000,
    slug: 'komodo',
  },
];

export function IslandShowcase() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-10 lg:mb-12">
        <h2 className="font-serif text-display-lg font-bold text-text-primary mb-3">
          Jelajahi Pulau-Pulau Ikonik
        </h2>
        <p className="text-text-secondary font-light text-lg max-w-2xl">
          Tiga pulau legendaris yang menawarkan pengalaman tak terlupakan bagi setiap penjelajah.
        </p>
      </div>

      <div className="relative">
        {/* Scrollable Cards */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 snap-x" style={{ scrollSnapType: 'x mandatory' }}>
          {islands.map((island, index) => (
            <motion.div
              key={island.id}
              variants={islandPopVariants(index)}
              className="flex-shrink-0 snap-center w-full md:w-[320px] lg:w-[360px]"
            >
              <IslandCard island={island} />
            </motion.div>
          ))}

          {/* Scroll indicator */}
          <motion.div
            className="flex-shrink-0 w-full md:w-[320px] lg:w-[360px] snap-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <ScrollIndicator />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 text-text-muted hidden md:flex"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-caption">Geser untuk melihat lebih banyak</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.section>
  );
}

function IslandCard({ island }) {
  return (
    <Link to={`/destinations?region=${island.slug}`} className="block group">
      <Card variant="default" hover className="flex flex-col">
        <CardImage
          src={island.image}
          alt={island.name}
          aspect="landscape"
          className="group-hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge variant="primary" size="sm">
              {island.tagline}
            </Badge>
          </div>

          <div className="absolute top-4 right-4 bg-surface-elevated/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-text-primary shadow-sm flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-500" />
            {island.rating}
          </div>
        </CardImage>

        <CardContent className="flex-1 flex flex-col p-4 lg:p-5">
          <p className="text-[11px] font-semibold text-brand-primary mb-1.5 uppercase tracking-wider">
            {island.destinations} Destinasi
          </p>
          <h3 className="font-serif text-xl font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
            {island.name}
          </h3>
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
            {island.description}
          </p>

          <CardFooter className="mt-auto">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-text-muted">
                <MapPin className="w-3.5 h-3.5" />
                {island.destinations} tempat
              </span>
              <span className="font-semibold text-brand-primary">
                {formatRupiah(island.budget)}
              </span>
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

function ScrollIndicator() {
  return (
    <div className="bg-surface-muted/50 backdrop-blur-sm rounded-[var(--radius-card)] p-8 text-center border border-border/50">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-primary-light flex items-center justify-center">
        <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 3.63A6.994 6.994 0 0012 3a6.994 6.994 0 00-6.976 6.63M21 20.37A6.994 6.994 0 0112 21a6.994 6.994 0 01-6.976-6.63M3.63 21A6.994 6.994 0 0012 21a6.994 6.994 0 006.976-6.63M3.63 3.63A6.994 6.994 0 0112 3a6.994 6.994 0 016.976 6.63" />
        </svg>
      </div>
      <h3 className="font-serif text-xl font-bold text-text-primary mb-2">
        Cari Destinasi Lainnya
      </h3>
      <p className="text-text-secondary text-sm mb-6">
        Jelajahi lebih dari 50+ destinasi menakjubkan di seluruh Indonesia.
      </p>
      <div className="flex items-center justify-center gap-2">
        <span className="w-24 h-px bg-border" />
        <span className="text-brand-primary font-medium">Atau</span>
        <span className="w-24 h-px bg-border" />
      </div>
    </div>
  );
}