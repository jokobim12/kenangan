'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, MapPin, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) return null;

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Kategori', icon: Grid, path: '/categories' },
    { name: 'Map', icon: MapPin, path: '/map' },
    { name: 'Tentang', icon: Info, path: '/about' },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;

        return (
          <Link key={item.name} href={item.path} style={{ textAlign: 'center', flex: 1, color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}
            >
              <Icon size={20} color={isActive ? 'var(--accent)' : 'var(--text-muted)'} />
              <span style={{ fontSize: '0.65rem', fontWeight: isActive ? 600 : 400 }}>{item.name}</span>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
