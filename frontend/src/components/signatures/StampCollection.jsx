import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { stampVariants } from '@/lib/motion';
import { X, Check, MapPin, Star, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

const stampData = [
  { id: 'bali', name: 'Bali', icon: '🏝️', location: 'Pulau Dewata', unlocked: true, date: '2024-01-15' },
  { id: 'komodo', name: 'Komodo', icon: '🦎', location: 'Naga Purba', unlocked: true, date: '2024-02-20' },
  { id: 'raja_ampat', name: 'Raja Ampat', icon: '🐠', location: 'Surga Di Bumi', unlocked: true, date: '2024-03-10' },
  { id: 'borobudur', name: 'Borobudur', icon: '🏛️', location: 'Candi Megalitik', unlocked: false, date: null },
  { id: 'rinjani', name: 'Rinjani', icon: '🏔️', location: 'Gunung Api', unlocked: false, date: null },
  { id: 'toba', name: 'Danau Toba', icon: '🌊', location: 'Danau Vulkanik', unlocked: false, date: null },
  { id: 'bromo', name: 'Bromo', icon: '🌅', location: 'Sunrise Legendaris', unlocked: false, date: null },
  { id: 'dera', name: 'Derawan', icon: '🐢', location: 'Penyu & Karang', unlocked: false, date: null },
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function StampCollection({ onClose }) {
  const [selectedStamp, setSelectedStamp] = useState(null);
  const toast = useToast();

  const unlockedCount = useMemo(() => stampData.filter(s => s.unlocked).length, []);
  const totalCount = stampData.length;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Koleksi Stempel"
    >
      <motion.div
        className="bg-surface-elevated rounded-[var(--radius-feature)] shadow-float max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-surface-elevated/95 backdrop-blur-sm z-10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-text-primary">Koleksi Stempel</h2>
            <p className="text-text-secondary text-sm mt-1">
              {unlockedCount} dari {totalCount} pulau terkumpul
            </p>
          </div>
          <motion.div
            className="w-16 h-3 bg-surface-muted rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-muted transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stamp Grid */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {stampData.map((stamp, index) => (
              <motion.div
                key={stamp.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ delay: index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <StampCard stamp={stamp} onClick={() => setSelectedStamp(stamp)} variants={stampVariants} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state message */}
        {unlockedCount === 0 && (
          <div className="px-6 pb-6 text-center">
            <p className="text-text-secondary">
              Mulai jelajahi untuk mengumpulkan stempel pertama Anda!
            </p>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStamp && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStamp(null)}
          >
            <motion.div
              className="bg-surface-elevated rounded-[var(--radius-feature)] shadow-float max-w-md w-full border border-border"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl font-bold text-text-primary">Detail Stempel</h3>
                  <button
                    onClick={() => setSelectedStamp(null)}
                    className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <motion.div
                    className="inline-block"
                    animate={{ rotate: [0, -3, 3, -3, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={cn(
                      'w-32 h-32 rounded-[var(--radius-feature)] flex items-center justify-center text-6xl shadow-card border-4',
                      selectedStamp.unlocked
                        ? 'border-brand-primary bg-brand-primary-light'
                        : 'border-border bg-surface-muted grayscale'
                    )}>
                      {selectedStamp.icon}
                    </div>
                  </motion.div>
                </div>

                <h4 className="font-serif text-xl font-bold text-text-primary text-center mb-2">
                  {selectedStamp.name}
                </h4>
                <p className="text-text-secondary text-center mb-4 flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {selectedStamp.location}
                </p>

                {selectedStamp.unlocked ? (
                  <div className="bg-brand-primary-light/50 border border-brand-primary/30 rounded-xl p-4 text-center">
                    <Check className="w-6 h-6 text-brand-accent mx-auto mb-2" />
                    <p className="font-medium text-brand-primary">Terkumpul!</p>
                    <p className="text-sm text-brand-secondary mt-1">
                      Diunjungi pada {formatDate(selectedStamp.date)}
                    </p>
                  </div>
                ) : (
                  <div className="bg-surface-muted border border-border rounded-xl p-4 text-center">
                    <p className="text-text-secondary mb-3">Belum terkumpul</p>
                    <p className="text-sm text-text-muted">
                      Kunjungi {selectedStamp.name} untuk mendapatkan stempel ini
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StampCard({ stamp, onClick, variants }) {
  return (
    <motion.button
      type="button"
      className={cn(
        'relative aspect-square rounded-[var(--radius-feature)] overflow-hidden shadow-card border',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
        stamp.unlocked ? 'border-brand-primary bg-brand-primary-light' : 'border-border bg-surface-muted grayscale'
      )}
      onClick={onClick}
      variants={variants}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl sm:text-6xl">{stamp.icon}</span>
      </div>

      {/* Unlocked indicator */}
      {stamp.unlocked && (
        <motion.div
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 500, damping: 20 }}
        >
          <Check className="w-4 h-4 text-text-inverse" />
        </motion.div>
      )}

      {/* Lock overlay for locked stamps */}
      {!stamp.unlocked && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      )}

      {/* Name label */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-text-inverse">
        <p className="font-semibold text-sm truncate">{stamp.name}</p>
        <p className="text-xs opacity-80">{stamp.location}</p>
      </div>
    </motion.button>
  );
}