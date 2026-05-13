'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Heart, Camera, Clock, MapPin } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Visual Abadi',
    description: 'Setiap foto dipilih untuk menceritakan momen yang tak terlupakan.',
  },
  {
    icon: Clock,
    title: 'Jejak Waktu',
    description: 'Menelusuri kembali perjalanan hidup melalui lini masa yang rapi.',
  },
  {
    icon: MapPin,
    title: 'Peta Kenangan',
    description: 'Melihat lokasi setiap momen berharga di peta interaktif.',
  },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <section className="section-padding" style={{ paddingTop: '9rem' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div style={{
              display: 'inline-flex',
              padding: '0.8rem',
              background: 'var(--accent-muted)',
              borderRadius: 'var(--radius)',
              color: 'var(--accent)',
              marginBottom: '1.5rem',
            }}>
              <Heart size={28} />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--foreground)' }}>
              Tentang <span className="accent-text">Kenangan</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
              Website ini adalah album digital pribadi yang didedikasikan untuk menyimpan setiap detik berharga dalam hidup.
              Dari tawa masa kecil hingga langkah-langkah besar menuju masa depan.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', textAlign: 'left' }}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: '1.8rem' }}
              >
                <feature.icon color="var(--accent)" size={24} style={{ marginBottom: '0.8rem' }} />
                <h3 style={{ marginBottom: '0.4rem', fontSize: '1rem', fontWeight: 600 }}>{feature.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
