'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Category, Memory } from '@/types';
import { supabase } from '@/lib/supabase';
import MemoryCard from '@/components/MemoryCard';
import CategoryList from './CategoryList';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });

        if (!catError && catData) {
          setCategories(catData);
        }

        const { data: memData, error: memError } = await supabase
          .from('memories')
          .select('*')
          .order('date', { ascending: false });

        if (!memError && memData) {
          setMemories(memData);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredMemories = selectedCategory
    ? memories.filter((m) => m.category === selectedCategory)
    : [];

  return (
    <main>
      <Navbar />
      <section className="section-padding" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--foreground)' }}>
            Kategori
          </h1>

          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Memuat kategori...</p>
          ) : (
            <>
              <CategoryList
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />

              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: '2.5rem' }}
                >
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                    {selectedCategory}
                  </h2>
                  {filteredMemories.length > 0 ? (
                    <div className="memory-grid">
                      {filteredMemories.map((memory) => (
                        <MemoryCard key={memory.id} memory={memory} />
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)' }}>
                      Belum ada kenangan di kategori ini.
                    </p>
                  )}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
