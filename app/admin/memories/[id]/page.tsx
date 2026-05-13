'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Memory } from '@/types';
import AddMemoryForm from '../../add/AddMemoryForm';

export default function EditMemoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemory() {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setMemory(data);
      }
      setLoading(false);
    }

    if (id) fetchMemory();
  }, [id]);

  if (loading) {
    return <p style={{ color: 'var(--text-muted)' }}>Memuat data kenangan...</p>;
  }

  if (!memory) {
    return <p style={{ color: 'var(--text-muted)' }}>Kenangan tidak ditemukan.</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            padding: '0.4rem 0.8rem',
            fontSize: '0.8rem',
            cursor: 'pointer',
            color: 'var(--text-muted)',
          }}
        >
          ← Kembali
        </button>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.2rem' }}>Edit Kenangan</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Mengubah: {memory.title}</p>
        </div>
      </div>

      <AddMemoryForm
        editData={memory}
        onSuccess={() => router.push('/admin/memories')}
      />
    </div>
  );
}
