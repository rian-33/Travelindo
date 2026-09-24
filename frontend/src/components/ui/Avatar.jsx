import { cn, getInitials, getColorFromString } from '@/lib/utils';

const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  className,
  fallback,
  status,
  statusPosition = 'bottom-right',
  ...props
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-caption',
    sm: 'w-8 h-8 text-body-sm',
    md: 'w-10 h-10 text-body',
    lg: 'w-12 h-12 text-body-lg',
    xl: 'w-16 h-16 text-headline-3',
    '2xl': 'w-24 h-24 text-display-lg',
  };

  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-xl',
    rounded: 'rounded-lg',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-text-muted',
    busy: 'bg-red-500',
    away: 'bg-amber-500',
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5',
  };

  const statusPositions = {
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
  };

  const initials = name ? getInitials(name) : '?';
  const bgColor = name ? getColorFromString(name) : 'var(--color-brand-secondary)';

  return (
    <motion.span
      className={cn(
        'relative inline-flex items-center justify-center font-semibold overflow-hidden',
        'bg-brand-secondary text-text-primary',
        sizes[size],
        shapes[shape],
        className
      )}
      {...props}
    >
      {src ? (
        <OptimizedImage
          src={src}
          alt={alt || name || 'Avatar'}
          preset="avatar"
          className="w-full h-full object-cover"
          fallback={
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
              {fallback || <span>{initials}</span>}
            </div>
          }
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          {fallback || <span>{initials}</span>}
        </div>
      )}

      {status && (
        <motion.span
          className={cn(
            'absolute border-2 border-surface-elevated rounded-full',
            statusColors[status],
            statusSizes[size],
            statusPositions[statusPosition]
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        />
      )}
    </motion.span>
  );
};

export { Avatar };

// Avatar Group
export function AvatarGroup({ avatars = [], max = 5, size = 'md', className, ...props }) {
  const sizes = {
    xs: '-space-x-1',
    sm: '-space-x-1.5',
    md: '-space-x-2',
    lg: '-space-x-2.5',
    xl: '-space-x-3',
    '2xl': '-space-x-4',
  };

  const badgeSizes = {
    xs: 'w-4 h-4 text-caption',
    sm: 'w-5 h-5 text-body-sm',
    md: 'w-6 h-6 text-body',
    lg: 'w-7 h-7 text-body-lg',
    xl: 'w-8 h-8 text-headline-3',
    '2xl': 'w-10 h-10 text-display-lg',
  };

  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={cn('flex items-center', sizes[size], className)} {...props}>
      {visibleAvatars.map((avatar, index) => (
        <motion.div
          key={avatar.id || index}
          className="relative z-10"
          style={{ zIndex: max - index }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Avatar {...avatar} size={size} />
        </motion.div>
      ))}
      {remainingCount > 0 && (
        <motion.div
          className={cn(
            'inline-flex items-center justify-center font-medium border-2 border-surface-elevated',
            'bg-brand-secondary text-text-primary',
            badgeSizes[size],
            shapes.circle
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: max * 0.05 }}
        >
          +{remainingCount}
        </motion.div>
      )}
    </div>
  );
}

const shapes = {
  circle: 'rounded-full',
  square: 'rounded-xl',
  rounded: 'rounded-lg',
};