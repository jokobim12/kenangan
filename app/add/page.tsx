'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Camera, Calendar, Type, FileText, Send } from 'lucide-react';

export default function AddMemoryPage() {
  const [loading, setLoading] = useState(false);

  return (
    <main>
      <Navbar />
      <section className="section-padding" style={{ paddingTop: '8rem' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Tambah Kenangan</h1>
          
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Pilih Foto</label>
              <div style={{ 
                border: '2px dashed var(--card-border)', 
                borderRadius: '15px', 
                padding: '3rem', 
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}
              >
                <Camera size={40} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Klik untuk ambil foto atau pilih dari galeri</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  <Type size={16} /> Judul Kenangan
                </label>
                <input 
                  type="text" 
                  placeholder="Contoh: Liburan Pertama"
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--card-border)',
                    borderRadius: '10px',
                    color: '#fff',
                    outline: 'none'
                  }} 
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  <Calendar size={16} /> Tanggal
                </label>
                <input 
                  type="date" 
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--card-border)',
                    borderRadius: '10px',
                    color: '#fff',
                    outline: 'none'
                  }} 
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  <FileText size={16} /> Cerita di Balik Foto
                </label>
                <textarea 
                  rows={4}
                  placeholder="Tuliskan ceritamu..."
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--card-border)',
                    borderRadius: '10px',
                    color: '#fff',
                    outline: 'none',
                    resize: 'none'
                  }} 
                ></textarea>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                style={{ 
                  width: '100%', 
                  padding: '1.2rem', 
                  background: 'var(--accent)', 
                  border: 'none', 
                  borderRadius: '12px',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  marginTop: '1rem',
                  cursor: 'pointer'
                }}
              >
                <Send size={20} /> Simpan Kenangan
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
