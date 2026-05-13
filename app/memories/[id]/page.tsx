'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Memory } from '@/types';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

export default function MemoryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemory() {
      try {
        const { data, error } = await supabase
          .from('memories')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setMemory(data);
      } catch (error) {
        console.error('Error fetching memory:', error);
        // Fallback dummy data
        const dummyData: Record<string, Memory> = {
          '1': { id: '1', title: 'Masa Kecil di Desa', description: 'Kenangan manis saat bermain layangan di pematang sawah belakang rumah kakek. Udara segar dan tawa yang tak pernah berhenti.', image_url: 'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?auto=format&fit=crop&q=80&w=800', date: '1995-06-15', category: 'Childhood' },
          '2': { id: '2', title: 'Kelulusan SMA', description: 'Hari yang penuh haru dan bangga. Berpisah dengan teman-teman seperjuangan untuk mengejar mimpi masing-masing.', image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800', date: '2010-05-20', category: 'School' },
          '3': { id: '3', title: 'Perjalanan Pertama', description: 'Petualangan pertama yang membuka mata tentang betapa luas dan indahnya dunia ini.', image_url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800', date: '2015-12-10', category: 'Travel' }
        };
        if (typeof id === 'string' && dummyData[id]) {
          setMemory(dummyData[id]);
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchMemory();
  }, [id]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: 40, height: 40, border: '4px solid var(--accent-muted)', borderTop: '4px solid var(--accent)', borderRadius: '50%' }} />
    </div>
  );

  if (!memory) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Memory not found.</div>;

  return (
    <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Mobile Back Button (Floating) */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => router.back()}
        className="mobile-back-btn"
        style={{ 
          position: 'fixed',
          top: '1.5rem',
          left: '1.5rem',
          zIndex: 1100,
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--card-border)',
          color: 'var(--foreground)',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: 'var(--shadow)'
        }}
      >
        <ArrowLeft size={24} />
      </motion.button>

      <section className="detail-section">
        <div className="detail-container">
          {/* Image Part */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="detail-image-wrapper"
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image 
                src={memory.image_url} 
                alt={memory.title} 
                fill 
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="image-overlay"></div>
            </div>
          </motion.div>

          {/* Content Part */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="detail-content"
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="meta-tag">
                <Calendar size={14} />
                <span>{new Date(memory.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              {memory.category && (
                <div className="meta-tag" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                  <Tag size={14} />
                  <span>{memory.category}</span>
                </div>
              )}
            </div>

            <h1 className="detail-title">{memory.title}</h1>
            
            <div className="detail-description-card glass">
              <p>{memory.description}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .detail-section {
          padding-top: 0;
        }

        .detail-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          min-height: 100vh;
        }

        .detail-image-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 20%, transparent 80%, var(--background) 100%);
        }

        .detail-content {
          padding: 8rem 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .detail-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 2rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--foreground);
        }

        .detail-description-card {
          padding: 2.5rem;
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--foreground);
          opacity: 0.9;
          white-space: pre-wrap;
        }

        .meta-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.05);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        @media (min-width: 769px) {
          .mobile-back-btn {
            display: none !important;
          }
        }

        @media (max-width: 1024px) {
          .detail-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .detail-container {
            grid-template-columns: 1fr;
          }
          .detail-image-wrapper {
            position: relative;
            height: 50vh;
          }
          .detail-content {
            padding: 2rem 1.5rem;
            margin-top: -3rem;
            z-index: 10;
            background: var(--background);
            border-radius: 30px 30px 0 0;
          }
          .detail-title {
            font-size: 2.2rem;
            margin-bottom: 1.5rem;
          }
          .detail-description-card {
            padding: 1.5rem;
            background: transparent;
            border: none;
            backdrop-filter: none;
          }
        }
      `}</style>
    </main>
  );
}
