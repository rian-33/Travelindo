import { cn } from '@/lib/utils';

const Skeleton = ({
  variant = 'text',
  width,
  height,
  className,
  ...props
}) => {
  const variants = {
    text: 'h-4 rounded',
    title: 'h-6 rounded w-3/4',
    card: 'rounded-[var(--radius-card)] h-64',
    avatar: 'rounded-full w-12 h-12',
    avatarSm: 'rounded-full w-8 h-8',
    avatarLg: 'rounded-full w-16 h-16',
    button: 'h-10 rounded-full w-24',
    input: 'h-10 rounded-xl',
    image: 'rounded-[var(--radius-card)] aspect-landscape',
    circle: 'rounded-full aspect-square',
  };

  return (
    <div
      className={cn(
        'skeleton',
        variants[variant],
        width && (typeof width === 'number' ? `w-[${width}px]` : width),
        height && (typeof height === 'number' ? `h-[${height}px]` : height),
        className
      )}
      {...props}
    />
  );
};

const SkeletonCard = ({ className, ...props }) => (
  <div className={cn('space-y-4', className)} {...props}>
    <Skeleton variant="image" />
    <div className="space-y-3 px-1">
      <Skeleton variant="title" width="60%" />
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" width="80%" />
    </div>
  </div>
);

const SkeletonList = ({ count = 4, variant = 'card', className, ...props }) => (
  <div className={cn('grid gap-6', className)} {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} variant={variant} />
    ))}
  </div>
);

const SkeletonText = ({ lines = 3, className, ...props }) => (
  <div className={cn('space-y-2', className)} {...props}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} variant={i === 0 ? 'title' : 'text'} width={i === 0 ? '70%' : '90%'} />
    ))}
  </div>
);

export { Skeleton, SkeletonCard, SkeletonList, SkeletonText };