'use client';

import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminOnly from '@/components/AdminOnly';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminOnly>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <AdminSidebar />
        <main style={{ flex: 1, padding: '2rem', marginLeft: '240px', background: 'var(--background)' }}>
          {children}
        </main>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          main {
            margin-left: 0 !important;
            padding: 1.5rem !important;
            padding-top: 4.5rem !important;
          }
        }
      `}</style>
    </AdminOnly>
  );
}
