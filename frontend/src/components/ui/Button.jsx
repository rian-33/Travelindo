import { forwardRef } from 'react';
import { Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonPress } from '@/lib/motion';
import { motion } from 'framer-motion';

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      success = false,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: 'bg-brand-primary text-text-inverse hover:bg-brand-primary-hover',
      secondary: 'bg-brand-secondary text-text-primary hover:bg-brand-secondary-dark',
      outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary-light',
      ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-muted',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5',
      xl: 'px-8 py-4 text-xl gap-3',
    };

    const iconSizes = {
      sm: 14,
      md: 18,
      lg: 20,
      xl: 24,
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-full',
          'transition-all duration-fast ease-brand',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        whileTap={{ scale: 0.96 }}
        {...props}
      >
        {loading && (
          <Loader2
            className="animate-spin"
            size={iconSizes[size]}
            strokeWidth={2.5}
            aria-hidden="true"
          />
        )}
        {success && <Check className="animate-scale-in" size={iconSizes[size]} />}
        {!loading && !success && leftIcon && (
          <span aria-hidden="true">{leftIcon}</span>
        )}
        <span className={cn('transition-opacity', loading && 'opacity-0')}>
          {children}
        </span>
        {!loading && !success && rightIcon && (
          <span aria-hidden="true">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };