import { cn } from '@/lib/utils';

export function JournalTexture({ children, className, intensity = 0.03, ...props }) {
  return (
    <div
      className={cn('relative', className)}
      {...props}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
          opacity: intensity,
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />

      {/* Subtle paper grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E\")",
          backgroundSize: '100px 100px',
          opacity: intensity * 0.5,
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function TornPaperEdge({ position = 'bottom', className, ...props }) {
  const positions = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'top-0 bottom-0 left-0',
    right: 'top-0 bottom-0 right-0',
  };

  const clips = {
    top: 'polygon(0 15%, 25% 0, 100% 0, 100% 100%, 0 100%)',
    bottom: 'polygon(0 0, 100% 0, 100% 85%, 75% 100%, 0 100%)',
    left: 'polygon(15% 0, 0 25%, 0 100%, 100% 100%, 100% 0)',
    right: 'polygon(0 0, 85% 0, 100% 25%, 100% 100%, 0 100%)',
  };

  return (
    <div
      className={cn(
        'absolute h-8 w-full',
        positions[position],
        className
      )}
      style={{
        clipPath: clips[position],
        background: 'linear-gradient(135deg, var(--color-bg-muted) 0%, var(--color-surface-elevated) 50%, var(--color-bg-muted) 100%)',
      }}
      {...props}
      aria-hidden="true"
    />
  );
}

export function PaperBackground({ className, ...props }) {
  const noiseSvg = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E";

  return (
    <div
      className={cn('relative bg-surface-elevated', className)}
      style={{
        '--bg-noise': `url("${noiseSvg}")`,
      }}
      {...props}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'var(--bg-noise)',
          backgroundSize: '200px 200px',
          opacity: 0.03,
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function HandwrittenText({ children, className, ...props }) {
  return (
    <span
      className={cn(
        'font-serif italic',
        'text-brand-primary',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}