'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '@/types';
import { Layers } from 'lucide-react';
import CategoryIcon from '@/components/CategoryIcon';

interface CategoryListProps {
  categories: Category[];
  selected: string | null;
  onSelect: (name: string | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, selected, onSelect }) => {
  if (categories.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
        <Layers size={36} style={{ marginBottom: '0.8rem', opacity: 0.5 }} />
        <p>Belum ada kategori.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop: grid cards */}
      <div className="cat-grid">
        {categories.map((cat) => {
          const isActive = selected === cat.name;
          return (
            <motion.div
              key={cat.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(isActive ? null : cat.name)}
              className="card"
              style={{
                padding: '1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                borderColor: isActive ? 'var(--accent)' : 'var(--card-border)',
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>
                <CategoryIcon name={cat.icon || 'folder'} size={28} color={cat.color} />
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 500 }}>{cat.name}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: dropdown */}
      <div className="cat-dropdown">
        <select
          value={selected || ''}
          onChange={(e) => onSelect(e.target.value || null)}
          style={{
            width: '100%',
            padding: '0.85rem 1rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            color: 'var(--foreground)',
            fontSize: '0.9rem',
            fontWeight: 500,
            outline: 'none',
            appearance: 'auto',
          }}
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>

      <style jsx>{`
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1.2rem;
        }
        .cat-dropdown {
          display: none;
        }
        @media (max-width: 768px) {
          .cat-grid {
            display: none;
          }
          .cat-dropdown {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default CategoryList;
