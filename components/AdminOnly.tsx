'use client';

import React from 'react';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { Lock } from 'lucide-react';

interface AdminOnlyProps {
  children: React.ReactNode;
}

const AdminOnly: React.FC<AdminOnlyProps> = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Memuat...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.2rem',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'var(--accent-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Lock size={30} color="var(--accent)" />
        </div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 600 }}>Akses Terbatas</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '350px', fontSize: '0.9rem' }}>
          Halaman ini hanya bisa diakses oleh admin.
        </p>
        <Link
          href="/login"
          style={{
            padding: '0.7rem 1.8rem',
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: 'var(--radius)',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          Login Admin
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminOnly;
