'use client';

import React from 'react';
import MemoryCard from './MemoryCard';
import { Memory } from '@/types';

interface MemoryGridProps {
  memories: Memory[];
  loading: boolean;
}

const MemoryGrid: React.FC<MemoryGridProps> = ({ memories, loading }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        Memuat kenangan...
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        Tidak ada kenangan yang ditemukan.
      </div>
    );
  }

  return (
    <div className="memory-grid">
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </div>
  );
};

export default MemoryGrid;
