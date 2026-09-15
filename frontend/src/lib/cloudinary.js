const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

export function getCloudinaryUrl(publicId, options = {}) {
  if (!publicId) return '/placeholder.svg';

  const {
    width,
    height,
    quality = 'auto:good',
    format = 'auto',
    gravity = 'auto',
    crop = 'fill',
    blur = false,
    overlay,
    effect,
    radius,
    background,
    border,
    flags,
  } = options;

  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    width && `w_${width}`,
    height && `h_${height}`,
    `c_${crop}`,
    `g_${gravity}`,
    blur && 'e_blur:1000',
    overlay && `l_${overlay}`,
    effect && `e_${effect}`,
    radius !== undefined && `r_${radius}`,
    background && `b_${background}`,
    border && `bo_${border}`,
    flags && `fl_${flags}`,
  ].filter(Boolean).join(',');

  return `${BASE_URL}/${transformations}/${publicId}`;
}

export function getBlurhashUrl(publicId, width = 20, height = 20) {
  if (!publicId) return '/placeholder-blur.svg';
  return getCloudinaryUrl(publicId, { width, height, format: 'webp', quality: 'auto:low', crop: 'thumb', gravity: 'auto' });
}

export function getThumbnailUrl(publicId, size = 400) {
  if (!publicId) return '/placeholder.svg';
  return getCloudinaryUrl(publicId, { width: size, height: size, crop: 'thumb', gravity: 'auto', quality: 'auto:good' });
}

export function getHeroUrl(publicId, width = 1920, height = 1080) {
  if (!publicId) return '/placeholder-hero.svg';
  return getCloudinaryUrl(publicId, { width, height, crop: 'fill', gravity: 'auto', quality: 'auto:good' });
}

export function getCardUrl(publicId, width = 800, height = 600) {
  if (!publicId) return '/placeholder-card.svg';
  return getCloudinaryUrl(publicId, { width, height, crop: 'fill', gravity: 'auto', quality: 'auto:good' });
}

export function getMapMarkerUrl(publicId, size = 100) {
  if (!publicId) return '/marker-placeholder.svg';
  return getCloudinaryUrl(publicId, { width: size, height: size, crop: 'thumb', gravity: 'face', radius: 'max', background: 'white', quality: 'auto:good' });
}

export function getOptimizedSrcSet(publicId, widths = [400, 800, 1200, 1600]) {
  if (!publicId) return '';
  return widths
    .map((w) => `${getCloudinaryUrl(publicId, { width: w, crop: 'scale', quality: 'auto:good' })} ${w}w`)
    .join(', ');
}

export function getResponsiveSizes(publicId, breakpoints = { mobile: 400, tablet: 800, desktop: 1200, wide: 1600 }) {
  if (!publicId) return {};
  return Object.fromEntries(
    Object.entries(breakpoints).map(([key, width]) => [
      key,
      getCloudinaryUrl(publicId, { width, crop: 'scale', quality: 'auto:good' }),
    ])
  );
}

export function extractPublicId(url) {
  if (!url) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
  return match ? match[1] : null;
}

export function isCloudinaryUrl(url) {
  return url?.includes('res.cloudinary.com');
}

export const IMAGE_PRESETS = {
  avatar: { width: 120, height: 120, crop: 'thumb', gravity: 'face', radius: 'max' },
  avatarLarge: { width: 200, height: 200, crop: 'thumb', gravity: 'face', radius: 'max' },
  hero: { width: 1920, height: 1080, crop: 'fill', gravity: 'auto' },
  heroMobile: { width: 800, height: 1200, crop: 'fill', gravity: 'auto' },
  card: { width: 800, height: 600, crop: 'fill', gravity: 'auto' },
  cardSquare: { width: 600, height: 600, crop: 'fill', gravity: 'auto' },
  cardPortrait: { width: 600, height: 750, crop: 'fill', gravity: 'auto' },
  cardLandscape: { width: 800, height: 450, crop: 'fill', gravity: 'auto' },
  gallery: { width: 1600, height: 1200, crop: 'limit', gravity: 'auto' },
  thumbnail: { width: 200, height: 200, crop: 'thumb', gravity: 'auto' },
  mapMarker: { width: 80, height: 80, crop: 'thumb', gravity: 'auto', radius: 'max', background: 'white' },
  ogImage: { width: 1200, height: 630, crop: 'fill', gravity: 'auto' },
  blurhash: { width: 20, height: 20, format: 'webp', quality: 'auto:low' },
};

export function getPresetUrl(publicId, preset) {
  const options = IMAGE_PRESETS[preset];
  if (!options) return getCloudinaryUrl(publicId);
  return getCloudinaryUrl(publicId, options);
}