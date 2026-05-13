'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Memory } from '@/types';
import { Trash2, ExternalLink, Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminMemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemories();
  }, []);

  async function fetchMemories() {
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMemories(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Yakin ingin menghapus "${title}"?`)) return;

    const { error } = await supabase.from('memories').delete().eq('id', id);
    if (error) {
      alert('Gagal menghapus: ' + error.message);
    } else {
      setMemories((prev) => prev.filter((m) => m.id !== id));
    }
  }

  if (loading) {
    return <p style={{ color: 'var(--text-muted)' }}>Memuat data...</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.3rem' }}>Kelola Kenangan</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{memories.length} kenangan tersimpan</p>
        </div>
        <Link
          href="/admin/add"
          style={{
            padding: '0.7rem 1.2rem',
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          + Tambah Baru
        </Link>
      </div>

      {memories.length === 0 ? (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Belum ada kenangan. Mulai tambahkan!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="glass"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                overflow: 'hidden',
              }}
            >
              {/* Thumbnail */}
              <div style={{ width: '70px', height: '70px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, position: 'relative', background: 'rgba(0,0,0,0.05)' }}>
                {memory.image_url && (
                  <Image src={memory.image_url} alt={memory.title} fill style={{ objectFit: 'cover' }} />
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {memory.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {new Date(memory.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {memory.category && ` • ${memory.category}`}
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <Link
                  href={`/admin/memories/${memory.id}`}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    background: 'var(--accent-muted)',
                    display: 'flex',
                    color: 'var(--accent)',
                  }}
                >
                  <Pencil size={18} />
                </Link>
                <Link
                  href={`/memories/${memory.id}`}
                  target="_blank"
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.03)',
                    display: 'flex',
                    color: 'var(--text-muted)',
                  }}
                >
                  <ExternalLink size={18} />
                </Link>
                <button
                  onClick={() => handleDelete(memory.id, memory.title)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    background: '#fdeaea',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    color: '#e74c3c',
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
