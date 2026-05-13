'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Memory } from '@/types';

// Fix default marker icon issue with webpack/next.js
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

interface MapViewProps {
  memories: Memory[];
  center?: [number, number];
  zoom?: number;
}

const MapView: React.FC<MapViewProps> = ({
  memories,
  center = [-2.5, 118.0], // Center of Indonesia
  zoom = 5,
}) => {
  const memoriesWithLocation = memories.filter(
    (m) => m.latitude != null && m.longitude != null
  );

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '100%', borderRadius: '20px' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {memoriesWithLocation.map((memory) => (
        <Marker
          key={memory.id}
          position={[memory.latitude!, memory.longitude!]}
        >
          <Popup>
            <div style={{ minWidth: '150px' }}>
              <strong>{memory.title}</strong>
              {memory.location_name && (
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.8rem', color: '#666' }}>
                  {memory.location_name}
                </p>
              )}
              <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: '#999' }}>
                {new Date(memory.date).toLocaleDateString('id-ID')}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
