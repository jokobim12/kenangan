'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, Home, Grid, MapPin, Info, Settings } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const Navbar = () => {
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Kategori', path: '/categories', icon: Grid },
    { name: 'Map', path: '/map', icon: MapPin },
    { name: 'Tentang', path: '/about', icon: Info },
  ];

  return (
    <nav className="nav-bar desktop-nav" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '1.3rem' }}>
          <div style={{
            background: 'var(--accent)',
            padding: '0.4rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Camera size={20} color="#fff" />
          </div>
          <span className="accent-text">Kenangan.</span>
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              style={{
                fontSize: '0.9rem',
                fontWeight: pathname === item.path ? 600 : 400,
                color: pathname === item.path ? 'var(--accent)' : 'var(--foreground)',
                opacity: pathname === item.path ? 1 : 0.6,
                transition: 'var(--transition)',
              }}
            >
              {item.name}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: 'var(--radius)',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              <Settings size={15} /> Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
