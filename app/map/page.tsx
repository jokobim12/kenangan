'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Memory } from '@/types';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '65vh',
      borderRadius: 'var(--radius)',
      background: 'var(--card-bg)',
      border: '1px solid var(--card-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
    }}>
      Memuat peta...
    </div>
  ),
});

const DUMMY_MEMORIES: Memory[] = [
  { id: '1', title: 'Desa Kakek', description: 'Bermain di sawah', image_url: '', date: '1995-06-15', location_name: 'Desa Kakek', latitude: -7.25, longitude: 112.75 },
  { id: '2', title: 'Kampus', description: 'Masa kuliah', image_url: '', date: '2010-05-20', location_name: 'Kampus', latitude: -6.9, longitude: 107.6 },
  { id: '3', title: 'Pantai Indah', description: 'Liburan pertama', image_url: '', date: '2015-12-10', location_name: 'Pantai Indah', latitude: -8.4, longitude: 115.2 },
];

export default function MapPage() {
  const [memories, setMemories] = useState<Memory[]>(DUMMY_MEMORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemories() {
      try {
        const { data, error } = await supabase
          .from('memories')
          .select('*')
          .order('date', { ascending: false });

        if (!error && data && data.length > 0) {
          setMemories(data);
        }
      } catch (error) {
        console.error('Error fetching memories for map:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemories();
  }, []);

  const memoriesWithLocation = memories.filter(
    (m) => m.latitude != null && m.longitude != null
  );

  return (
    <main>
      <Navbar />
      <section className="section-padding" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
              Peta <span className="accent-text">Kenangan</span>
            </h1>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              {memoriesWithLocation.length} lokasi
            </span>
          </div>

          <div style={{ width: '100%', height: '65vh', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
            <MapView memories={memories} />
          </div>

          {memoriesWithLocation.length === 0 && !loading && (
            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Belum ada kenangan dengan lokasi.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
