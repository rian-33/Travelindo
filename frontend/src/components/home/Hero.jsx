import { motion } from 'framer-motion';
import { heroTextVariants, heroImageVariants } from '@/lib/motion';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { SearchForm } from './SearchForm';

export function Hero() {
  return (
    <section className="relative pt-28 pb-32 lg:pt-40 lg:pb-48 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] z-0 pointer-events-none" />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-5 w-32 h-32 opacity-20 animate-float-slow">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-brand-primary">
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="25" />
          <circle cx="50" cy="50" r="10" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 right-5 w-24 h-24 opacity-15 animate-float-slow" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-brand-accent">
          <polygon points="50,10 90,90 10,90" />
          <polygon points="50,25 75,75 25,75" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.p
              variants={heroTextVariants}
              className="text-brand-primary font-semibold tracking-[0.2em] text-sm mb-6 uppercase flex items-center gap-3"
              style={{ transitionDelay: '0ms' }}
            >
              <span className="w-8 h-[1px] bg-brand-primary" />
              Kurasi Perjalanan Eksklusif
              <span className="w-8 h-[1px] bg-brand-primary" />
            </motion.p>

            <motion.h1
              variants={heroTextVariants}
              className="font-serif text-display-lg lg:text-display-xl font-bold text-text-primary leading-[1.1] mb-8 max-w-2xl"
              style={{ transitionDelay: '100ms' }}
            >
              Temukan Keindahan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent italic font-normal">
                Tersembunyi Indonesia
              </span>
            </motion.h1>

            <motion.p
              variants={heroTextVariants}
              className="text-lg text-text-secondary max-w-xl mb-10 font-light leading-relaxed"
              style={{ transitionDelay: '200ms' }}
            >
              Lepaskan diri dari rutinitas. Kami merancang pengalaman liburan
              premium yang disesuaikan dengan ritme dan anggaran Anda.
            </motion.p>

            <motion.div
              variants={heroTextVariants}
              className="w-full max-w-xl"
              style={{ transitionDelay: '300ms' }}
            >
              <SearchForm />
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            variants={heroImageVariants}
            className="lg:w-1/2 relative hidden lg:block"
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative aspect-[4/3] rounded-[var(--radius-feature)] overflow-hidden shadow-float">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80"
                alt="Pemandangan indah Indonesia"
                preset="hero"
                className="absolute inset-0 w-full h-full object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent" />
              {/* Corner accent */}
              <div className="absolute bottom-5 left-5 bg-surface-elevated/90 backdrop-blur-sm px-3.5 py-2.5 rounded-lg shadow-card">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary-light flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-caption text-text-muted">12 Destinasi</p>
                    <p className="text-sm font-semibold text-text-primary">Terpilih Bulan Ini</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="absolute bottom-5 right-5 flex gap-3">
              <motion.div
                className="bg-surface-elevated rounded-lg shadow-card p-4 min-w-[130px] border border-border"
                whileHover={{ y: -4, boxShadow: 'var(--shadow-float)' }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-serif text-2xl font-bold text-brand-primary">12</p>
                <p className="text-xs text-text-muted">Pulau Terjelajah</p>
              </motion.div>
              <motion.div
                className="bg-surface-elevated rounded-lg shadow-card p-4 min-w-[130px] border border-border"
                whileHover={{ y: -4, boxShadow: 'var(--shadow-float)' }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-serif text-2xl font-bold text-brand-accent">8.4</p>
                <p className="text-xs text-text-muted">Rating Rata-rata</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-caption tracking-wider">Jelajahi Lebih Lanjut</span>
        <motion.div
          className="w-1 h-6 bg-brand-primary/30 rounded-full overflow-hidden"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-full h-full bg-brand-primary"
            animate={{ scaleY: [0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}