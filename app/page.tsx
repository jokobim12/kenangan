'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import MemoryCard from '@/components/MemoryCard';
import { Memory } from '@/types';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

const DUMMY_MEMORIES: Memory[] = [
  {
    id: '1',
    title: 'Masa Kecil di Desa',
    description: 'Kenangan manis saat bermain layangan di pematang sawah belakang rumah kakek. Udara segar dan tawa yang tak pernah berhenti.',
    image_url: 'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?auto=format&fit=crop&q=80&w=800',
    date: '1995-06-15',
  },
  {
    id: '2',
    title: 'Kelulusan SMA',
    description: 'Hari yang penuh haru dan bangga. Berpisah dengan teman-teman seperjuangan untuk mengejar mimpi masing-masing.',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    date: '2010-05-20',
  },
  {
    id: '3',
    title: 'Perjalanan Pertama ke Luar Kota',
    description: 'Petualangan pertama yang membuka mata tentang betapa luas dan indahnya dunia ini.',
    image_url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
    date: '2015-12-10',
  }
];

export default function Home() {
  const [memories, setMemories] = useState<Memory[]>(DUMMY_MEMORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemories() {
      try {
        const { data, error } = await supabase
          .from('memories')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setMemories(data);
        }
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemories();
  }, []);

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding hero-section" style={{ paddingTop: '10rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title gradient-text">
              Jejak Waktu & Kenangan
            </h1>
            <p className="hero-subtitle">
              Menyimpan setiap momen berharga, dari langkah pertama hingga pencapaian hari ini. 
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline/Grid Section */}
      <section id="timeline" className="section-padding" style={{ background: 'var(--accent-muted)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ width: '50px', height: '2px', background: 'var(--accent)' }}></div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Koleksi Momen</h2>
          </div>
          
          <div className="memory-grid">
            {memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
          
          {memories.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              Belum ada kenangan yang dibagikan. Mulailah mengunggah!
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .hero-title {
          font-size: 4.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }
        .hero-subtitle {
          max-width: 600px;
          margin: 0 auto;
          color: var(--text-muted);
          font-size: 1.2rem;
        }
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 6rem !important;
          }
          .hero-title {
            font-size: 2.8rem;
          }
          .hero-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </main>
  );
}
