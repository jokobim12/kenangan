'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Heart, Camera, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <section className="section-padding" style={{ paddingTop: '10rem' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div style={{ 
              display: 'inline-flex', 
              padding: '1rem', 
              background: 'var(--accent-muted)', 
              borderRadius: '20px', 
              color: 'var(--accent)',
              marginBottom: '2rem'
            }}>
              <Heart size={32} fill="var(--accent)" />
            </div>
            <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Tentang Kenangan</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
              Website ini adalah album digital pribadi yang saya dedikasikan untuk menyimpan setiap detik berharga dalam hidup. 
              Dari tawa masa kecil hingga langkah-langkah besar menuju masa depan.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'left' }} className="about-grid">
            <div className="glass" style={{ padding: '2rem' }}>
              <Camera color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Visual Abadi</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Setiap foto dipilih untuk menceritakan momen yang tak terlupakan.</p>
            </div>
            <div className="glass" style={{ padding: '2rem' }}>
              <Clock color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Jejak Waktu</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Menelusuri kembali perjalanan hidup melalui lini masa yang rapi.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 640px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
