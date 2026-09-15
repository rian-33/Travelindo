import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';
import { cn } from '@/lib/utils';
import { markerIcons, injectMapStyles } from '@/lib/leaflet';

export function DestinationMap({ destination, className, readOnly = true, height = '400px' }) {
  injectMapStyles();

  const position = destination.latitude && destination.longitude
    ? [destination.latitude, destination.longitude]
    : [-6.2088, 106.8456];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={!readOnly}
      className={cn('rounded-[var(--radius-card)] overflow-hidden', className)}
      style={{ height }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        subdomains={['a', 'b', 'c']}
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={position} icon={markerIcons.destination}>
        <Popup>
          <div className="p-2 min-w-[240px]">
            <h3 className="font-serif font-bold text-brand-primary text-lg mb-1">{destination.name}</h3>
            <p className="text-sm text-text-secondary mb-2">{destination.location}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-brand-accent font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                {destination.rating || '–'}
              </span>
              <span className="font-semibold text-brand-primary">Rp {(destination.estimatedBudget || 0).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </Popup>
      </Marker>
      <FitBounds positions={[position]} />
    </MapContainer>
  );
}

function FitBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length && map) {
      const group = L.featureGroup(
        positions.map((pos) => L.marker(pos))
      );
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, [map, positions]);
  return null;
}