'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MiniMapProps {
  latitude: number;
  longitude: number;
  locationName?: string;
}

const MiniMap: React.FC<MiniMapProps> = ({ latitude, longitude, locationName }) => {
  return (
    <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        style={{ width: '100%', height: '180px' }}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} />
      </MapContainer>
      {locationName && (
        <div style={{
          padding: '0.6rem 0.8rem',
          background: 'var(--card-bg)',
          borderTop: '1px solid var(--card-border)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontWeight: 500,
        }}>
          📍 {locationName}
        </div>
      )}
    </div>
  );
};

export default MiniMap;
