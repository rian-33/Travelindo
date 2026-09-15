import { cn } from '@/lib/utils';

export function Container({ children, className, size = 'full', ...props }) {
  const sizes = {
    full: 'max-w-[var(--container-max)]',
    lg: 'max-w-6xl',
    md: 'max-w-4xl',
    sm: 'max-w-2xl',
    xs: 'max-w-xl',
  };

  return (
    <div
      className={cn(
        'mx-auto px-6 lg:px-8',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}