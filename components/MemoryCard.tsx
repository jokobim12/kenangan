'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Memory } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface MemoryCardProps {
  memory: Memory;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
  return (
    <Link href={`/memories/${memory.id}`} style={{ height: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="card"
        style={{
          overflow: 'hidden',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
          <Image
            src={memory.image_url || '/placeholder.jpg'}
            alt={memory.title}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
          />
          <div style={{
            position: 'absolute',
            top: '0.8rem',
            left: '0.8rem',
            padding: '0.25rem 0.7rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: '20px',
          }}>
            {new Date(memory.date).getFullYear()}
          </div>
        </div>
        <div style={{ padding: '1.2rem 1.4rem' }}>
          <h3 style={{ marginBottom: '0.4rem', fontSize: '1.1rem', fontWeight: 600 }}>{memory.title}</h3>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
          }}>
            {memory.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default MemoryCard;
