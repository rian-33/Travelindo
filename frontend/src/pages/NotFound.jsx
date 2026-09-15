import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Home, Compass } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function NotFound() {
  return (
    <motion.div
      className="min-h-[70vh] flex items-center justify-center px-4"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="text-center max-w-lg">
        <motion.div
          className="relative inline-block mb-8"
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <div className="w-32 h-32 rounded-full bg-brand-primary-light flex items-center justify-center mx-auto">
            <span className="text-6xl font-serif font-bold text-brand-primary">404</span>
          </div>
          <motion.div
            className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-surface-elevated shadow-card border border-border flex items-center justify-center"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Compass className="w-6 h-6 text-brand-primary" />
          </motion.div>
        </motion.div>

        <h1 className="font-serif text-3xl font-bold text-text-primary mb-3">
          Sepertinya kamu tersesat
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Halaman yang kamu cari mungkin sudah dipindahkan, dihapus, atau belum tersedia. Mari kita kembali menjelajah!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-primary text-text-inverse hover:bg-brand-primary-hover px-6 py-3 text-lg font-semibold rounded-full transition-all duration-fast ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
          <Link
            to="/destinations"
            className="inline-flex items-center justify-center gap-2 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary-light px-6 py-3 text-lg font-semibold rounded-full transition-all duration-fast ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
          >
            <MapPin className="w-5 h-5" />
            Jelajahi Destinasi
          </Link>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-6 inline-flex items-center gap-1 text-sm text-brand-primary hover:underline font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Halaman sebelumnya
        </button>
      </div>
    </motion.div>
  );
}