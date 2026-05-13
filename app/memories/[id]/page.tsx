'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Memory } from '@/types';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, MapPin, Play } from 'lucide-react';
import dynamic from 'next/dynamic';

const MiniMap = dynamic(() => import('@/components/MiniMap'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '180px', borderRadius: 'var(--radius)', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--card-border)' }} />
  ),
});

const DUMMY_DATA: Record<string, Memory> = {
  '1': { id: '1', title: 'Masa Kecil di Desa', description: 'Kenangan manis saat bermain layangan di pematang sawah belakang rumah kakek. Udara segar dan tawa yang tak pernah berhenti. Setiap sore kami berlarian di pematang sawah, mengejar layangan yang terbang tinggi. Suara tawa anak-anak bercampur dengan hembusan angin yang membawa aroma padi. Kakek selalu menunggu di teras rumah dengan segelas teh hangat dan cerita-cerita masa mudanya.', image_url: 'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?auto=format&fit=crop&q=80&w=800', date: '1995-06-15', category: 'Masa Kecil', latitude: -7.25, longitude: 112.75, location_name: 'Desa Kakek, Jawa Timur' },
  '2': { id: '2', title: 'Kelulusan SMA', description: 'Hari yang penuh haru dan bangga. Berpisah dengan teman-teman seperjuangan untuk mengejar mimpi masing-masing. Tiga tahun bersama, berbagi tawa dan air mata. Kami berjanji untuk tetap terhubung meski jarak memisahkan.', image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800', date: '2010-05-20', category: 'Pendidikan' },
  '3': { id: '3', title: 'Perjalanan Pertama', description: 'Petualangan pertama yang membuka mata tentang betapa luas dan indahnya dunia ini. Setiap langkah membawa pelajaran baru, setiap pemandangan mengukir kenangan yang tak terlupakan.', image_url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800', date: '2015-12-10', category: 'Perjalanan', latitude: -8.4, longitude: 115.2, location_name: 'Pantai Kuta, Bali' },
};

export default function MemoryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullImage, setShowFullImage] = useState(false);

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
        if (typeof id === 'string' && DUMMY_DATA[id]) {
          setMemory(DUMMY_DATA[id]);
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchMemory();
  }, [id]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Memuat...</p>
      </div>
    );
  }

  if (!memory) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Kenangan tidak ditemukan.</p>
      </div>
    );
  }

  const formattedDate = new Date(memory.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const hasLocation = memory.latitude != null && memory.longitude != null;

  // Shared content sections
  const renderTags = (light = false) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
        padding: '0.28rem 0.65rem', borderRadius: '16px', fontSize: '0.72rem', fontWeight: 500,
        background: light ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.03)',
        color: light ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)',
      }}>
        <Calendar size={11} /> {formattedDate}
      </span>
      {memory.category && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
          padding: '0.28rem 0.65rem', borderRadius: '16px', fontSize: '0.72rem', fontWeight: 500,
          background: light ? 'rgba(184,134,11,0.35)' : 'var(--accent-muted)',
          color: light ? '#ffd700' : 'var(--accent)',
        }}>
          <Tag size={11} /> {memory.category}
        </span>
      )}
      {memory.location_name && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
          padding: '0.28rem 0.65rem', borderRadius: '16px', fontSize: '0.72rem', fontWeight: 500,
          background: light ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.03)',
          color: light ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)',
        }}>
          <MapPin size={11} /> {memory.location_name}
        </span>
      )}
    </div>
  );

  const renderVideo = () => {
    if (!memory.video_url) return null;
    return (
      <div style={{ marginTop: '1.5rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--foreground)' }}>
          <Play size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.3rem' }} />
          Video Kenangan
        </p>
        <video
          controls
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--card-border)',
            background: '#000',
          }}
        >
          <source src={memory.video_url} />
        </video>
      </div>
    );
  };

  const renderMap = () => {
    if (!hasLocation) return null;
    return (
      <div style={{ marginTop: '1.5rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--foreground)' }}>
          <MapPin size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.3rem' }} />
          Lokasi Kenangan
        </p>
        <MiniMap
          latitude={memory.latitude!}
          longitude={memory.longitude!}
          locationName={memory.location_name}
        />
      </div>
    );
  };

  return (
    <>
      {/* ===== DESKTOP VERSION ===== */}
      <main className="desktop-detail">
        <Navbar />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
          <div
            onClick={() => setShowFullImage(true)}
            style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', cursor: 'pointer' }}
          >
            <Image src={memory.image_url} alt={memory.title} fill style={{ objectFit: 'cover' }} priority />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
            <div style={{ maxWidth: '480px', width: '100%' }}>
              <button
                onClick={() => router.back()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: 'none', border: '1px solid var(--card-border)', borderRadius: 'var(--radius)',
                  padding: '0.45rem 0.9rem', fontSize: '0.78rem', color: 'var(--text-muted)',
                  cursor: 'pointer', marginBottom: '2rem',
                }}
              >
                <ArrowLeft size={15} /> Kembali
              </button>

              {renderTags()}

              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--foreground)' }}>
                {memory.title}
              </h1>

              <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-muted)', whiteSpace: 'pre-wrap', textAlign: 'justify' }}>
                {memory.description}
              </p>

              {renderVideo()}
              {renderMap()}
            </div>
          </div>
        </div>
      </main>

      {/* ===== MOBILE VERSION ===== */}
      <main className="mobile-detail">
        <button
          onClick={() => router.back()}
          style={{
            position: 'fixed', top: '0.8rem', left: '0.8rem', zIndex: 100,
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.35)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} color="#fff" />
        </button>

        {/* Photo - clean, no overlay text, tappable for fullscreen */}
        <div
          onClick={() => setShowFullImage(true)}
          style={{ position: 'relative', width: '100%', height: '280px', cursor: 'pointer' }}
        >
          <Image src={memory.image_url} alt={memory.title} fill style={{ objectFit: 'cover' }} priority />
          {/* Small hint icon */}
          <div style={{
            position: 'absolute', bottom: '0.8rem', right: '0.8rem',
            background: 'rgba(0,0,0,0.4)', borderRadius: '8px',
            padding: '0.3rem 0.6rem', fontSize: '0.65rem', color: '#fff', fontWeight: 500,
          }}>
            Ketuk untuk perbesar
          </div>
        </div>

        {/* Content below image */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ padding: '1.5rem 1.5rem 5rem' }}
        >
          {/* Tags */}
          {renderTags()}

          {/* Title */}
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.25, marginBottom: '1rem', color: 'var(--foreground)' }}>
            {memory.title}
          </h1>

          {/* Divider */}
          <div style={{ width: '40px', height: '2px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '1.2rem' }} />

          {/* Description */}
          <p style={{
            fontSize: '0.9rem', lineHeight: '1.85', color: 'var(--text-muted)',
            whiteSpace: 'pre-wrap', textAlign: 'justify', margin: 0,
          }}>
            {memory.description}
          </p>

          {renderVideo()}
          {renderMap()}
        </motion.div>
      </main>

      <style jsx>{`
        .desktop-detail { display: block; }
        .mobile-detail { display: none; }
        @media (max-width: 768px) {
          .desktop-detail { display: none; }
          .mobile-detail { display: block; }
        }
      `}</style>

      {/* Fullscreen Image Modal */}
      {showFullImage && (
        <div
          onClick={() => setShowFullImage(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <button
            onClick={() => setShowFullImage(false)}
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              background: 'rgba(255,255,255,0.2)', border: 'none',
              borderRadius: '50%', width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', fontSize: '1.2rem',
            }}
          >
            ✕
          </button>
          <Image
            src={memory!.image_url}
            alt={memory!.title}
            fill
            style={{ objectFit: 'contain', padding: '1rem' }}
          />
        </div>
      )}
    </>
  );
}
