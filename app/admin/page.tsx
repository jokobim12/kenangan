'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Images, FolderOpen, MapPin } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ memories: 0, categories: 0, locations: 0 });

  useEffect(() => {
    async function fetchStats() {
      const { data: memories } = await supabase.from('memories').select('id, latitude');
      const { data: categories } = await supabase.from('categories').select('id');

      const memoriesCount = memories?.length || 0;
      const categoriesCount = categories?.length || 0;
      const locationsCount = memories?.filter((m: any) => m.latitude != null).length || 0;

      setStats({ memories: memoriesCount, categories: categoriesCount, locations: locationsCount });
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Kenangan', value: stats.memories, icon: Images, color: '#b8860b' },
    { label: 'Kategori', value: stats.categories, icon: FolderOpen, color: '#4dadf7' },
    { label: 'Lokasi di Peta', value: stats.locations, icon: MapPin, color: '#51cf66' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Dashboard</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Selamat datang di panel admin Kenangan.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="glass"
              style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: `${card.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon size={24} color={card.color} />
              </div>
              <div>
                <p style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}>{card.value}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
