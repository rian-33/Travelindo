import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const defaultMapOptions = {
  zoomControl: false,
  attributionControl: false,
  scrollWheelZoom: true,
  doubleClickZoom: true,
  boxZoom: true,
  keyboard: true,
  dragging: true,
  touchZoom: true,
  tapHold: true,
  inertia: true,
  inertiaDeceleration: 3000,
  inertiaMaxSpeed: 1500,
  easeLinearity: 0.25,
  worldCopyJump: false,
  maxBoundsViscosity: 0,
  maxZoom: 18,
  minZoom: 2,
};

export const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const tileLayerSubdomains = ['a', 'b', 'c'];
export const tileLayerOptions = {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

export const darkTileLayerUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
export const darkTileLayerOptions = {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
};

export function createCustomIcon(options = {}) {
  const {
    html,
    className = 'custom-marker',
    iconSize = [40, 40],
    iconAnchor = [20, 40],
    popupAnchor = [0, -40],
  } = options;

  return L.divIcon({
    html: html || '<div class="marker-inner"></div>',
    className,
    iconSize,
    iconAnchor,
    popupAnchor,
  });
}

export const markerIcons = {
  destination: createCustomIcon({
    html: `
      <div class="marker-destination">
        <div class="marker-ring"></div>
        <div class="marker-dot"></div>
      </div>
    `,
    className: 'marker-destination-wrapper',
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -44],
  }),

  hotel: createCustomIcon({
    html: `
      <div class="marker-hotel">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
    `,
    className: 'marker-hotel-wrapper',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  }),

  culinary: createCustomIcon({
    html: `
      <div class="marker-culinary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
          <path d="M12 6v6l4 2"></path>
        </svg>
      </div>
    `,
    className: 'marker-culinary-wrapper',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  }),

  user: createCustomIcon({
    html: `
      <div class="marker-user">
        <div class="user-avatar">📍</div>
      </div>
    `,
    className: 'marker-user-wrapper',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
};

export const clusterIcons = {
  default: createCustomIcon({
    html: `
      <div class="marker-cluster">
        <span class="cluster-count"></span>
      </div>
    `,
    className: 'marker-cluster-wrapper',
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  }),

  small: createCustomIcon({
    html: `
      <div class="marker-cluster marker-cluster-small">
        <span class="cluster-count"></span>
      </div>
    `,
    className: 'marker-cluster-wrapper',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  }),
};

export function getTileLayerUrl(isDark = false) {
  return isDark ? darkTileLayerUrl : tileLayerUrl;
}

export function getTileLayerOptions(isDark = false) {
  return isDark ? darkTileLayerOptions : tileLayerOptions;
}

export function fitBoundsToMarkers(map, markers, padding = [50, 50]) {
  if (!markers.length || !map) return;
  const group = L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.1), { padding });
}

export function createPopupContent(data, type = 'destination') {
  const templates = {
    destination: `
      <div class="map-popup p-2 min-w-[240px]">
        <h3 class="font-serif font-bold text-brand-primary text-lg mb-1">${data.name}</h3>
        <p class="text-sm text-text-secondary mb-2">${data.location}</p>
        <div class="flex items-center gap-2 text-sm">
          <span class="flex items-center gap-1 text-brand-accent font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            ${data.rating || '–'}
          </span>
          <span class="font-semibold text-brand-primary">Rp ${(data.estimatedBudget || 0).toLocaleString('id-ID')}</span>
        </div>
      </div>
    `,

    hotel: `
      <div class="map-popup p-2 min-w-[240px]">
        <h3 class="font-serif font-bold text-brand-primary text-lg mb-1">${data.name}</h3>
        <p class="text-sm text-text-secondary mb-2">${data.location}</p>
        <div class="flex items-center gap-2 text-sm">
          <span class="flex items-center gap-1 text-amber-500 font-medium">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            ${data.rating || '–'}
          </span>
          <span class="font-semibold text-brand-primary">Rp ${(data.price || 0).toLocaleString('id-ID')}/malam</span>
        </div>
      </div>
    `,

    culinary: `
      <div class="map-popup p-2 min-w-[240px]">
        <h3 class="font-serif font-bold text-brand-primary text-lg mb-1">${data.name}</h3>
        <p class="text-sm text-text-secondary mb-2">${data.region}</p>
        <p class="text-sm text-text-secondary line-clamp-2">${data.description || ''}</p>
      </div>
    `,
  };

  return templates[type] || templates.destination;
}

export const mapStyles = `
  .marker-destination-wrapper {
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
  }
  .marker-destination {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: transform 0.2s ease;
  }
  .marker-destination:hover {
    transform: scale(1.1);
  }
  .marker-ring {
    width: 28px;
    height: 28px;
    border: 3px solid #C85C3E;
    border-radius: 50%;
    animation: pulse-ring 2s ease-out infinite;
  }
  .marker-dot {
    width: 10px;
    height: 10px;
    background: #C85C3E;
    border-radius: 50%;
    position: absolute;
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(1.4); opacity: 0; }
  }
  .marker-hotel-wrapper, .marker-culinary-wrapper {
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
  }
  .marker-hotel, .marker-culinary {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    color: #C85C3E;
    transition: transform 0.2s ease;
  }
  .marker-hotel:hover, .marker-culinary:hover {
    transform: scale(1.1);
  }
  .marker-cluster-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .marker-cluster {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #C85C3E, #B04E36);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(200, 92, 62, 0.4);
    color: white;
    font-weight: 700;
    font-size: 14px;
    border: 3px solid white;
  }
  .marker-cluster-small {
    width: 36px;
    height: 36px;
    font-size: 12px;
  }
  .cluster-count {
    line-height: 1;
  }
  .map-popup {
    font-family: var(--font-sans);
  }
  .leaflet-popup-content-wrapper {
    border-radius: 12px !important;
    box-shadow: 0 12px 32px rgba(0,0,0,0.15) !important;
    padding: 0 !important;
  }
  .leaflet-popup-content {
    margin: 0 !important;
    width: auto !important;
  }
  .leaflet-popup-tip {
    background: white !important;
  }
`;

export function injectMapStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('travelindo-map-styles')) return;

  const style = document.createElement('style');
  style.id = 'travelindo-map-styles';
  style.textContent = mapStyles;
  document.head.appendChild(style);
}

export function createMapContainer(center, zoom = 13, options = {}) {
  return L.map('map', {
    ...defaultMapOptions,
    center,
    zoom,
    ...options,
  });
}