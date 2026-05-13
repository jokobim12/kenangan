'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export default function MapPage() {
  return (
    <main>
      <Navbar />
      <section className="section-padding" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Peta Kenangan</h1>
            <div className="glass" style={{ padding: '0.8rem', borderRadius: '50%', cursor: 'pointer' }}>
              <Navigation size={24} color="var(--accent)" />
            </div>
          </div>
          
          <div className="glass" style={{ 
            width: '100%', 
            height: '60vh', 
            position: 'relative', 
            overflow: 'hidden',
            background: '#1a1a1c',
            backgroundImage: 'radial-gradient(var(--card-border) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}>
            {/* Mock Map Markers */}
            {[
              { top: '30%', left: '40%', label: 'Desa Kakek' },
              { top: '60%', left: '70%', label: 'Kampus' },
              { top: '45%', left: '20%', label: 'Pantai Indah' },
            ].map((marker, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                style={{
                  position: 'absolute',
                  top: marker.top,
                  left: marker.left,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ 
                  background: 'var(--accent)', 
                  color: '#000', 
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '10px', 
                  fontSize: '0.7rem', 
                  fontWeight: 700,
                  marginBottom: '0.3rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}>
                  {marker.label}
                </div>
                <MapPin size={32} color="var(--accent)" fill="var(--accent)" />
              </motion.div>
            ))}

            <div style={{ 
              position: 'absolute', 
              bottom: '2rem', 
              left: '50%', 
              transform: 'translateX(-50%)',
              padding: '1rem 2rem',
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              border: '1px solid var(--card-border)',
              color: 'var(--text-muted)',
              fontSize: '0.9rem'
            }}>
              Mengeksplorasi 3 Lokasi Kenangan
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
