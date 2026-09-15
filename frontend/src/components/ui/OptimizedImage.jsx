import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getBlurhashUrl, getCloudinaryUrl, IMAGE_PRESETS } from '@/lib/cloudinary';
import { Skeleton } from './Skeleton';
import { motion } from 'framer-motion';

const OptimizedImage = ({
  src,
  alt = '',
  preset = 'card',
  widths = [400, 800, 1200, 1600],
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className,
  fallback,
  priority = false,
  blurhash,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);
  const imgRef = useRef(null);

  const cloudinaryUrl = src?.includes('cloudinary') ? src : null;
  const isCloudinary = !!cloudinaryUrl;

  // Generate srcSet for Cloudinary images
  const srcSet = isCloudinary
    ? widths.map((w) => `${getCloudinaryUrl(src, { width: w, crop: 'scale', quality: 'auto:good' })} ${w}w`).join(', ')
    : undefined;

  // Generate blurhash placeholder
  const blurhashSrc = blurhash || (isCloudinary ? getBlurhashUrl(src) : undefined);

  // Use preset if not Cloudinary
  const finalSrc = isCloudinary ? src : (src || (preset ? getPresetPlaceholder(preset) : ''));

  useEffect(() => {
    if (!finalSrc) return;

    const img = new Image();
    img.src = finalSrc;
    img.onload = () => {
      setCurrentSrc(finalSrc);
      setIsLoading(false);
      onLoad?.();
    };
    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      onError?.();
    };
  }, [finalSrc, onLoad, onError]);

  const getPresetPlaceholder = () => '/placeholder.svg';

  const aspectRatios = {
    avatar: 'aspect-square',
    avatarLarge: 'aspect-square',
    hero: 'aspect-[16/9]',
    heroMobile: 'aspect-[3/4]',
    card: 'aspect-landscape',
    cardSquare: 'aspect-square',
    cardPortrait: 'aspect-portrait',
    cardLandscape: 'aspect-landscape',
    gallery: 'aspect-[4/3]',
    thumbnail: 'aspect-square',
    mapMarker: 'aspect-square',
    ogImage: 'aspect-[1.91/1]',
  };

  if (hasError) {
    return (
      <div
        className={cn(
          'relative bg-surface-muted flex items-center justify-center',
          aspectRatios[preset] || 'aspect-landscape',
          'rounded-[var(--radius-card)]',
          className
        )}
        {...props}
      >
        {fallback || (
          <div className="flex flex-col items-center gap-2 text-text-muted p-4">
            <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-caption">Gambar tidak tersedia</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-surface-muted',
        aspectRatios[preset] || 'aspect-landscape',
        'rounded-[var(--radius-card)]',
        className
      )}
      {...props}
    >
      {/* Blurhash placeholder */}
      {blurhashSrc && isLoading && (
        <motion.img
          src={blurhashSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-[20px] transition-opacity duration-500"
          style={{ opacity: isLoading ? 1 : 0 }}
        />
      )}

      {/* Skeleton while loading */}
      {isLoading && !blurhashSrc && (
        <Skeleton variant="image" className="absolute inset-0" />
      )}

      {/* Actual image */}
      <motion.img
        ref={imgRef}
        src={currentSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={cn(
          'absolute inset-0 w-full h-full transition-opacity duration-700 ease-brand',
          `object-${objectFit}`,
          `object-${objectPosition}`,
          isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        )}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
          onError?.();
        }}
        {...props}
      />
    </div>
  );
};

export { OptimizedImage };