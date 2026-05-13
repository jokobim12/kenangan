'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Layers, Briefcase, Plane, Heart } from 'lucide-react';

const categories = [
  { name: 'Masa Kecil', icon: Heart, count: 12, color: '#ff6b6b' },
  { name: 'Pendidikan', icon: Briefcase, count: 8, color: '#4dadf7' },
  { name: 'Perjalanan', icon: Plane, count: 15, color: '#ffd43b' },
  { name: 'Lain-lain', icon: Layers, count: 5, color: '#51cf66' },
];

export default function CategoriesPage() {
  return (
    <main>
      <Navbar />
      <section className="section-padding" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Kategori</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1.5rem' }}>
            {categories.map((cat) => (
              <motion.div
                key={cat.name}
                whileHover={{ y: -5 }}
                className="glass"
                style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer' }}
              >
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '15px', 
                  background: `${cat.color}20`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: cat.color
                }}>
                  <cat.icon size={30} />
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.count} Momen</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
