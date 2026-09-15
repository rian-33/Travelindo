import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Button } from '@/components/ui/Button';
import { Copy, Tag, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function PromoBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('TRAVELINDO20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-brand-primary rounded-[var(--radius-feature)] overflow-hidden flex flex-col md:flex-row shadow-float relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-secondary/30 rounded-full blur-3xl" />

        {/* Content */}
        <div className="p-8 md:p-14 lg:p-16 flex-1 flex flex-col justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary-light text-brand-primary text-caption font-semibold">
              <Sparkles className="w-4 h-4" />
              PENAWARAN TERBATAS
            </div>
            <motion.div
              className="w-16 h-[1px] bg-brand-primary-light"
              initial={{ width: 0 }}
              animate={{ width: '4rem' }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-inverse font-bold mb-6 leading-[1.1] max-w-xl"
          >
            Pengalaman Premium, <br /> Harga Bersahabat.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-brand-primary-light font-light mb-8 max-w-md text-lg leading-relaxed"
          >
            Klaim potongan 20% untuk pemesanan pertama Anda menuju destinasi
            eksotis Indonesia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="bg-brand-primary-light/50 border border-brand-primary-light/30 text-text-inverse font-mono px-5 py-3 rounded-lg tracking-wider flex items-center gap-3 relative group">
              <Tag className="w-5 h-5 text-brand-primary" />
              <span className="select-all">TRAVELINDO20</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                rightIcon={copied ? <svg className="w-4 h-4 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Tersalin!' : 'Salin'}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Image Side */}
        <div className="md:w-2/5 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-l from-brand-primary via-brand-primary/50 to-transparent" />
          <OptimizedImage
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop"
            alt="Pengalaman travel premium"
            preset="hero"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 flex items-end p-8">
            <div className="bg-surface-elevated/90 backdrop-blur-sm rounded-xl p-4 shadow-card max-w-sm">
              <p className="text-caption text-text-muted mb-2">Destinasi Populer</p>
              <div className="space-y-2">
                {['Bali', 'Raja Ampat', 'Yogyakarta', 'Lombok'].map((dest, i) => (
                  <motion.div
                    key={dest}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="font-medium text-text-primary">{dest}</span>
                    <span className="text-brand-primary font-semibold">−20%</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}