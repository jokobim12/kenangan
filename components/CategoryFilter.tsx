'use client';

import React from 'react';
import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelect: (categoryName: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selected, onSelect }) => {
  return (
    <>
      {/* Desktop: pill buttons */}
      <div className="category-pills">
        <button
          onClick={() => onSelect(null)}
          style={{
            padding: '0.45rem 1.1rem',
            borderRadius: '20px',
            border: '1px solid var(--card-border)',
            background: selected === null ? 'var(--accent)' : 'var(--card-bg)',
            color: selected === null ? '#fff' : 'var(--foreground)',
            fontSize: '0.8rem',
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'var(--transition)',
          }}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.name)}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '20px',
              border: '1px solid var(--card-border)',
              background: selected === cat.name ? 'var(--accent)' : 'var(--card-bg)',
              color: selected === cat.name ? '#fff' : 'var(--foreground)',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition)',
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div className="category-dropdown">
        <select
          value={selected || ''}
          onChange={(e) => onSelect(e.target.value || null)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius)',
            color: 'var(--foreground)',
            fontSize: '0.85rem',
            fontWeight: 500,
            outline: 'none',
            appearance: 'auto',
          }}
        >
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <style jsx>{`
        .category-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .category-dropdown {
          display: none;
        }
        @media (max-width: 768px) {
          .category-pills {
            display: none;
          }
          .category-dropdown {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default CategoryFilter;
