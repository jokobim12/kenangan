'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section style={{ paddingTop: '9rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: 'var(--foreground)',
          }}>
            Jejak Waktu & <span className="accent-text">Kenangan</span>
          </h1>
          <p style={{
            maxWidth: '550px',
            margin: '0 auto',
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
          }}>
            Menyimpan setiap momen berharga, dari langkah pertama hingga pencapaian hari ini.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          p {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
