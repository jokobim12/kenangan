'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import {
  LayoutDashboard,
  PlusCircle,
  FolderOpen,
  Images,
  LogOut,
  Menu,
  X,
  Camera,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Tambah Kenangan', path: '/admin/add', icon: PlusCircle },
  { name: 'Kelola Kenangan', path: '/admin/memories', icon: Images },
  { name: 'Kelola Kategori', path: '/admin/categories', icon: FolderOpen },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div style={{ padding: '1.5rem 1.2rem', borderBottom: '1px solid var(--card-border)' }}>
        <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            background: 'var(--accent)',
            padding: '0.35rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Camera size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1rem' }} className="accent-text">Admin Panel</span>
        </Link>
      </div>

      {/* Menu */}
      <nav style={{ padding: '0.8rem', flex: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0.7rem 0.9rem',
                borderRadius: 'var(--radius)',
                marginBottom: '0.2rem',
                background: isActive ? 'var(--accent-muted)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--foreground)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.88rem',
                transition: 'var(--transition)',
              }}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '0.8rem', borderTop: '1px solid var(--card-border)' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            padding: '0.7rem 0.9rem',
            borderRadius: 'var(--radius)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#c0392b',
            fontSize: '0.85rem',
            fontWeight: 500,
            width: '100%',
          }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="admin-mobile-toggle"
        style={{
          display: 'none',
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 1200,
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius)',
          padding: '0.5rem',
          cursor: 'pointer',
        }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1099 }}
        />
      )}

      {/* Sidebar */}
      <aside
        className="admin-sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: mobileOpen ? 0 : undefined,
          width: '240px',
          height: '100vh',
          background: 'var(--card-bg)',
          borderRight: '1px solid var(--card-border)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1100,
          transition: 'transform 0.3s ease',
        }}
      >
        {sidebarContent}
      </aside>

      <style jsx>{`
        @media (max-width: 768px) {
          .admin-mobile-toggle {
            display: flex !important;
          }
          .admin-sidebar {
            transform: translateX(${mobileOpen ? '0' : '-100%'});
          }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;
