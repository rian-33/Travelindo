import { useForm } from '@/hooks/useForm';
import { searchSchema } from '@/schemas';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Calendar, MapPin, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function SearchForm({ onSearch, initialValues }) {
  const [isDateFocused, setIsDateFocused] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

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

  const handleDateSelect = (field, date) => {
    if (date) {
      setFieldValue(field, date.toISOString().split('T')[0]);
    }
  };

  const onSubmit = async (data) => {
    onSearch?.(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-surface-elevated p-3 rounded-[var(--radius-feature)] shadow-float border border-border flex flex-col sm:flex-row items-center w-full max-w-3xl gap-2 transition-all duration-500 ease-brand"
    >
      <div className="flex-1 flex items-center px-6 w-full relative">
        <MapPin className="absolute left-4 text-text-muted w-5 h-5" aria-hidden="true" />
        <Select
          label=""
          placeholder="Cari pulau, kota, atau provinsi..."
          options={destinations}
          value={getFieldValue('destination')}
          onChange={(value) => setFieldValue('destination', value)}
          searchable
          clearable
          className="w-full pl-12"
        />
        {errors.destination && (
          <motion.span className="absolute bottom-full left-4 mb-1 text-red-500 text-caption" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {errors.destination.message}
          </motion.span>
        )}
      </div>

      <div className="hidden sm:block w-[1px] h-10 bg-border" />

      <div className="flex-1 flex items-center px-6 w-full relative">
        <CalendarDays className="absolute left-4 text-text-muted w-5 h-5" aria-hidden="true" />
        <Input
          type="text"
          placeholder="Tanggal check-in & check-out"
          value={`${dateRange.from ? new Date(dateRange.from).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : ''} ${dateRange.to ? '– ' + new Date(dateRange.to).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : ''}`}
          readOnly
          onClick={() => setIsDateFocused(true)}
          className={cn('pl-12', isDateFocused && 'border-border-focus ring-2 ring-focus-ring')}
          onBlur={() => setIsDateFocused(false)}
        />
        {/* Date picker would go here - using a simplified version for now */}
      </div>

      <Button
        type="submit"
        className="w-full sm:w-auto bg-brand-primary text-text-inverse px-8 py-4 rounded-full font-semibold hover:bg-brand-primary-hover transition-colors duration-300 flex items-center justify-center gap-2"
        loading={isSubmitting}
        rightIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>}
      >
        <span>Eksplorasi</span>
      </Button>
    </form>
  );
}