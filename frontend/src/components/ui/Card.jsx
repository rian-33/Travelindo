import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

const Card = forwardRef(
  ({ className, variant = 'default', children, hover = true, ...props }, ref) => {
    const variants = {
      default: 'bg-surface-elevated rounded-[var(--radius-card)] shadow-card border border-border overflow-hidden',
      featured: 'bg-surface-elevated rounded-[var(--radius-feature)] shadow-float border border-border overflow-hidden',
      immersive: 'bg-surface-elevated rounded-[var(--radius-feature)] shadow-float border border-border overflow-hidden relative',
      editorial: 'bg-surface-elevated rounded-[var(--radius-card)] shadow-card border border-border overflow-hidden',
    };

    return (
      <motion.div
        ref={ref}
        className={cn('relative', variants[variant], hover && 'transition-all duration-base ease-brand', className)}
        whileHover={hover ? { y: -8, boxShadow: 'var(--shadow-float)' } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

const CardImage = forwardRef(
  ({ className, src, alt, fallback, aspect = 'landscape', children, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const aspects = {
      portrait: 'aspect-portrait',
      landscape: 'aspect-landscape',
      square: 'aspect-square',
      panorama: 'aspect-panorama',
      editorial: 'aspect-editorial',
    };

    return (
      <div className={cn('relative overflow-hidden', aspects[aspect])}>
        {!hasError ? (
          <img
            ref={ref}
            src={src}
            alt={alt}
            className={cn('w-full h-full object-cover transition-transform duration-1000', className)}
            loading="lazy"
            onError={() => setHasError(true)}
            {...props}
          />
        ) : (
          <div className={cn(
            'absolute inset-0 bg-surface-muted flex items-center justify-center',
            className
          )}>
            {fallback || <span className="text-text-muted">Gambar tidak tersedia</span>}
          </div>
        )}
        {children}
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';

const CardContent = forwardRef(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-5 lg:p-6', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-5 pb-5 lg:px-6 lg:pb-6 pt-0 flex items-center justify-between', className)} {...props} />
  )
);

CardFooter.displayName = 'CardFooter';

const CardBadge = forwardRef(
  ({ className, children, position = 'top-left', ...props }, ref) => {
    const positions = {
      'top-left': 'absolute top-4 left-4',
      'top-right': 'absolute top-4 right-4',
      'bottom-left': 'absolute bottom-4 left-4',
      'bottom-right': 'absolute bottom-4 right-4',
    };

    return (
      <div ref={ref} className={cn(positions[position], 'z-10', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardBadge.displayName = 'CardBadge';

export { Card, CardImage, CardContent, CardFooter, CardBadge };