'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Category } from '@/types';
import { Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import CategoryIcon, { availableIcons } from '@/components/CategoryIcon';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('folder');
  const [newColor, setNewColor] = useState('#b8860b');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (!error && data) {
      setCategories(data);
    }
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;

    setAdding(true);
    const { error } = await supabase
      .from('categories')
      .insert([{ name: newName.trim(), icon: newIcon, color: newColor }]);

    if (error) {
      alert('Gagal menambah kategori: ' + error.message);
    } else {
      setNewName('');
      setNewIcon('folder');
      setNewColor('#b8860b');
      fetchCategories();
    }
    setAdding(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Yakin ingin menghapus kategori "${name}"?`)) return;

    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      alert('Gagal menghapus: ' + error.message);
    } else {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.7rem 1rem',
    background: 'rgba(0,0,0,0.02)',
    border: '1px solid var(--card-border)',
    borderRadius: '10px',
    color: 'var(--foreground)',
    outline: 'none',
    fontSize: '0.9rem',
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Kelola Kategori</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Tambah atau hapus kategori kenangan.</p>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="glass" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Tambah Kategori Baru</h3>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Nama</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nama kategori"
              required
              style={{ ...inputStyle, width: '100%' }}
            />
          </div>
          <div style={{ width: '120px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Icon</label>
            <select
              value={newIcon}
              onChange={(e) => setNewIcon(e.target.value)}
              style={{ ...inputStyle, width: '100%' }}
            >
              {availableIcons.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
          <div style={{ width: '80px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Warna</label>
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              style={{ width: '100%', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            />
          </div>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={adding}
            style={{
              padding: '0.7rem 1.2rem',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: adding ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Plus size={16} /> Tambah
          </motion.button>
        </div>
      </form>

      {/* Category List */}
      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Memuat...</p>
      ) : categories.length === 0 ? (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Belum ada kategori.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="glass"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.2rem',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: `${cat.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <CategoryIcon name={cat.icon || 'folder'} size={20} color={cat.color} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600 }}>{cat.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cat.color}</p>
              </div>
              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '8px',
                  background: '#fdeaea',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  color: '#e74c3c',
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
