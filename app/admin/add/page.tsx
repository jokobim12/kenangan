'use client';

import React from 'react';
import AddMemoryForm from './AddMemoryForm';

export default function AdminAddPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Tambah Kenangan</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Upload foto dan ceritakan momen berhargamu.</p>
      <AddMemoryForm />
    </div>
  );
}
