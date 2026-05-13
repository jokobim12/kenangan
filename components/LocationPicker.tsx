'use client';

import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search } from 'lucide-react';

// Fix default marker icon
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

interface LocationPickerProps {
  latitude: number | null;
  longitude: number | null;
  onChange: (lat: number, lng: number, name?: string) => void;
}

function ClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.flyTo([lat, lng], 15, { duration: 1.5 });
  return null;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ latitude, longitude, onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number } | null>(null);

  const center: [number, number] = latitude && longitude
    ? [latitude, longitude]
    : [-2.5, 118.0];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const results = await response.json();

      if (results && results.length > 0) {
        const { lat, lon, display_name } = results[0];
        const parsedLat = parseFloat(lat);
        const parsedLng = parseFloat(lon);
        onChange(parsedLat, parsedLng, display_name);
        setFlyTarget({ lat: parsedLat, lng: parsedLng });
      } else {
        alert('Lokasi tidak ditemukan. Coba kata kunci lain.');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Gagal mencari lokasi.');
    } finally {
      setSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Cari lokasi... (contoh: Monas Jakarta)"
          style={{
            flex: 1,
            padding: '0.7rem 1rem',
            background: 'rgba(0,0,0,0.02)',
            border: '1px solid var(--card-border)',
            borderRadius: '10px',
            color: 'var(--foreground)',
            fontSize: '0.85rem',
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={searching}
          style={{
            padding: '0.7rem 1rem',
            background: 'var(--accent)',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            cursor: searching ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          <Search size={16} />
          {searching ? '...' : 'Cari'}
        </button>
      </div>

      {/* Map */}
      <div style={{ width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
        <MapContainer
          center={center}
          zoom={latitude ? 13 : 5}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onChange={(lat, lng) => onChange(lat, lng)} />
          {latitude && longitude && (
            <Marker position={[latitude, longitude]} />
          )}
          {flyTarget && <FlyTo lat={flyTarget.lat} lng={flyTarget.lng} />}
        </MapContainer>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
        💡 Ketik nama tempat lalu klik Cari, atau langsung klik di peta
      </p>
    </div>
  );
};

export default LocationPicker;
