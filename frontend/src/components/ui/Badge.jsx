import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  stamp = false,
  className,
  onClick,
  removable = false,
  onRemove,
  ...props
}) => {
  const variants = {
    primary: 'bg-brand-primary-light text-brand-primary',
    secondary: 'bg-brand-secondary text-text-primary',
    accent: 'bg-brand-accent-light text-brand-accent',
    outline: 'border border-border bg-transparent text-text-secondary',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-caption gap-1',
    md: 'px-3 py-1 text-caption gap-1.5',
    lg: 'px-4 py-1.5 text-body-sm gap-2',
  };

  const dotColors = {
    primary: 'bg-brand-primary',
    secondary: 'bg-brand-secondary-dark',
    accent: 'bg-brand-accent',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500',
    danger: 'bg-red-500',
  };

  if (stamp) {
    const interactiveProps = onClick
      ? {
          role: 'button',
          tabIndex: 0,
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
              e.preventDefault();
              onClick(e);
            }
          },
        }
      : {};

    return (
      <motion.span
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
          'font-semibold text-caption',
          'bg-brand-primary text-text-inverse shadow-card',
          'transform rotate-[-2deg]',
          onClick && 'cursor-pointer hover:opacity-80',
          className
        )}
        whileTap={{ scale: 1.15, rotate: -3 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        onClick={onClick}
        {...interactiveProps}
        {...props}
      >
        {children}
      </motion.span>
    );
  }

  const interactiveProps = onClick
    ? {
        role: 'button',
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            onClick(e);
          }
        },
      }
    : {};

  return (
    <motion.span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        'transition-all duration-fast ease-brand',
        variants[variant],
        sizes[size],
        removable && 'pr-1',
        onClick && 'cursor-pointer hover:opacity-80',
        className
      )}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...interactiveProps}
      {...props}
    >
      {dot && (
        <motion.span
          className={cn('w-2 h-2 rounded-full', dotColors[variant])}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      )}
      {children}
      {removable && (
        <motion.button
          type="button"
          className="p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
          whileTap={{ scale: 0.8 }}
          aria-label="Hapus"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      )}
    </motion.span>
  );
};

export { Badge };