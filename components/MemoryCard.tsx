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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        className="glass"
        style={{
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'var(--transition)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
          <Image
            src={memory.image_url || '/placeholder.jpg'}
            alt={memory.title}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
            className="card-image"
          />
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.2rem 0.8rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            background: 'var(--accent)',
            color: '#000',
            borderRadius: '20px'
          }}>
            {new Date(memory.date).getFullYear()}
          </div>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{memory.title}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {memory.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default MemoryCard;
