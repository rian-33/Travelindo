import { useForm } from '@/hooks/useForm';
import { searchSchema } from '@/schemas';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { MapPin, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export function SearchForm({ onSearch, initialValues }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  const { handleSubmit, setFieldValue, getFieldValue, errors, isSubmitting } = useForm(searchSchema, {
    destination: initialValues?.destination || '',
    checkIn: initialValues?.checkIn || '',
    checkOut: initialValues?.checkOut || '',
    guests: initialValues?.guests || { adults: 1, children: 0 },
  });

  const destinations = [
    { value: 'bali', label: 'Bali' },
    { value: 'jogja', label: 'Yogyakarta' },
    { value: 'lombok', label: 'Lombok' },
    { value: 'labuan_bajo', label: 'Labuan Bajo' },
    { value: 'raja_ampat', label: 'Raja Ampat' },
    { value: 'bromo', label: 'Gunung Bromo' },
    { value: 'toba', label: 'Danau Toba' },
    { value: 'dera', label: 'Kepulauan Derawan' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRangeSelect = (selected) => {
    setRange(selected);
    if (selected?.from) {
      setFieldValue('checkIn', selected.from.toISOString().split('T')[0]);
    }
    if (selected?.to) {
      setFieldValue('checkOut', selected.to.toISOString().split('T')[0]);
    }
    if (selected?.from && selected?.to) {
      setOpen(false);
    }
  };

  const formatRange = () => {
    if (!range?.from) return 'Pilih tanggal perjalanan';
    const start = range.from.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    if (!range?.to) return start;
    const end = range.to.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    return `${start} – ${end}`;
  };

  const onSubmit = async (data) => {
    onSearch?.(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-surface-elevated rounded-full shadow-float border border-border p-2 flex flex-col sm:flex-row items-center gap-1 w-full max-w-3xl transition-all duration-500 ease-brand"
    >
      <div className="flex-1 flex items-center w-full relative">
        <MapPin className="absolute left-4 text-text-muted w-5 h-5 pointer-events-none" aria-hidden="true" />
        <Select
          placeholder="Cari pulau, kota, atau provinsi..."
          options={destinations}
          value={getFieldValue('destination')}
          onChange={(value) => setFieldValue('destination', value)}
          searchable
          clearable
          className="bg-transparent border-transparent shadow-none pl-10 rounded-full"
        />
        {errors.destination && (
          <motion.span
            className="absolute bottom-full left-4 mb-1 text-red-500 text-caption whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.destination.message}
          </motion.span>
        )}
      </div>

      <div className="hidden sm:block w-px h-8 bg-border mx-1" />

      <div className="flex-1 w-full relative" ref={popoverRef}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex items-center w-full rounded-full px-4 py-3 text-left cursor-pointer hover:bg-surface-muted/40 transition-colors duration-fast"
        >
          <CalendarDays className="text-text-muted w-5 h-5 mr-2 flex-shrink-0" aria-hidden="true" />
          <span className={cn(range?.from ? 'text-text-primary' : 'text-text-muted')}>{formatRange()}</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute left-0 top-full mt-2 z-50 bg-surface-elevated rounded-2xl shadow-float border border-border p-3"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <DayPicker
                mode="range"
                selected={range}
                onSelect={handleRangeSelect}
                numberOfMonths={1}
                fromYear={2025}
                toYear={2030}
                style={{ '--rdp-accent-color': 'var(--color-brand-primary)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden sm:block w-px h-8 bg-border mx-1" />

      <Button
        type="submit"
        className="w-full sm:w-auto bg-brand-primary text-text-inverse px-8 py-3.5 rounded-full font-semibold hover:bg-brand-primary-hover transition-colors duration-300 flex items-center justify-center gap-2"
        loading={isSubmitting}
        rightIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>}
      >
        <span>Eksplorasi</span>
      </Button>
    </form>
  );
}