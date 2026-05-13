'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import MemoryGrid from '@/components/MemoryGrid';
import { Memory, Category } from '@/types';
import { supabase } from '@/lib/supabase';

const DUMMY_MEMORIES: Memory[] = [
  {
    id: '1',
    title: 'Masa Kecil di Desa',
    description: 'Kenangan manis saat bermain layangan di pematang sawah belakang rumah kakek.',
    image_url: 'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?auto=format&fit=crop&q=80&w=800',
    date: '1995-06-15',
    category: 'Masa Kecil',
  },
  {
    id: '2',
    title: 'Kelulusan SMA',
    description: 'Hari yang penuh haru dan bangga. Berpisah dengan teman-teman seperjuangan.',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    date: '2010-05-20',
    category: 'Pendidikan',
  },
  {
    id: '3',
    title: 'Perjalanan Pertama ke Luar Kota',
    description: 'Petualangan pertama yang membuka mata tentang betapa luas dan indahnya dunia ini.',
    image_url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
    date: '2015-12-10',
    category: 'Perjalanan',
  },
];

export default function Home() {
  const [memories, setMemories] = useState<Memory[]>(DUMMY_MEMORIES);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: memoriesData, error: memoriesError } = await supabase
          .from('memories')
          .select('*')
          .order('date', { ascending: false });

        if (!memoriesError && memoriesData && memoriesData.length > 0) {
          setMemories(memoriesData);
        }

        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });

        if (!categoriesError && categoriesData) {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredMemories = useMemo(() => {
    let result = memories;

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter((m) => m.category === selectedCategory);
    }

    return result;
  }, [memories, search, selectedCategory]);

  return (
    <main>
      <Navbar />
      <HeroSection />

      {/* Collection Section */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '40px', height: '2px', background: 'var(--accent)' }}></div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Koleksi Momen</h2>
          </div>

          {/* Search & Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <SearchBar value={search} onChange={setSearch} />
            {categories.length > 0 && (
              <CategoryFilter
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            )}
          </div>

          <MemoryGrid memories={filteredMemories} loading={loading} />
        </div>
      </section>
    </main>
  );
}
