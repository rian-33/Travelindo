import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { islandPopVariants } from '@/lib/motion';

const islands = [
  { id: 'sumatra', name: 'Sumatera', shape: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', color: 'brand-primary' },
  { id: 'java', name: 'Jawa', shape: 'polygon(50% 0%, 100% 35%, 100% 65%, 50% 100%, 0% 65%, 0% 35%)', color: 'brand-accent' },
  { id: 'kalimantan', name: 'Kalimantan', shape: 'polygon(50% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%)', color: 'brand-secondary' },
  { id: 'sulawesi', name: 'Sulawesi', shape: 'polygon(50% 0%, 100% 15%, 90% 50%, 100% 85%, 50% 100%, 0% 85%, 10% 50%, 0% 15%)', color: 'brand-primary' },
  { id: 'papua', name: 'Papua', shape: 'polygon(50% 0%, 100% 40%, 80% 100%, 0% 100%, 0% 40%)', color: 'brand-accent' },
];

export function IslandLoader({ className, size = 'lg', text = 'Memuat petualangan...' }) {
  const sizes = {
    sm: { container: 'w-32 h-32', island: 'w-6 h-6', text: 'text-caption' },
    md: { container: 'w-48 h-48', island: 'w-10 h-10', text: 'text-body-sm' },
    lg: { container: 'w-64 h-64', island: 'w-14 h-14', text: 'text-body' },
  };

  const s = sizes[size];

  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <motion.div
        className={cn('relative flex items-center justify-center', s.container)}
        role="status"
        aria-label="Memuat"
      >
        {/* Central pulse */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-brand-primary/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Islands */}
        {islands.map((island, index) => (
          <motion.div
            key={island.id}
            className="absolute"
            style={{
              clipPath: island.shape,
              width: s.island,
              height: s.island,
              backgroundColor: `var(--color-${island.color})`,
            }}
            variants={islandPopVariants(index)}
            initial="initial"
            animate="animate"
          />
        ))}

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary" />
      </motion.div>

      <motion.p
        className={cn('font-medium text-text-secondary', s.text)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {text}
      </motion.p>
    </div>
  );
}

export function IslandLoaderInline({ className, text = 'Mencari...' }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex items-center gap-1.5">
        {islands.slice(0, 3).map((island, index) => (
          <motion.div
            key={island.id}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: `var(--color-${island.color})` }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, delay: index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <span className="text-text-secondary text-sm">{text}</span>
    </div>
  );
}

export function LoadingDots({ className, color = 'brand-primary', size = 'md' }) {
  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5',
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)} role="status" aria-label="Memuat">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn('rounded-full', sizes[size])}
          style={{ backgroundColor: `var(--color-${color})` }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export function PageLoader({ className }) {
  return (
    <motion.div
      className={cn('fixed inset-0 z-[100] flex items-center justify-center bg-surface-bg', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-label="Memuat halaman"
    >
      <div className="flex flex-col items-center gap-8">
        <IslandLoader size="lg" text="Menyiapkan perjalanan Anda..." />
      </div>
    </motion.div>
  );
}