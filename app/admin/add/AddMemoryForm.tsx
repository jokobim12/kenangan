'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Calendar, Type, FileText, Send, MapPin, Tag, Video } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Category, Memory } from '@/types';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { compressVideo } from '@/lib/compressVideo';

const LocationPicker = dynamic(() => import('@/components/LocationPicker'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '300px', borderRadius: '12px', background: 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', border: '1px solid var(--card-border)' }}>
      Memuat peta...
    </div>
  ),
});

interface AddMemoryFormProps {
  editData?: Memory | null;
  onSuccess?: () => void;
}

export default function AddMemoryForm({ editData, onSuccess }: AddMemoryFormProps) {
  const [mediaType, setMediaType] = useState<'foto' | 'video'>(editData?.video_url ? 'video' : 'foto');
  const [title, setTitle] = useState(editData?.title || '');
  const [description, setDescription] = useState(editData?.description || '');
  const [date, setDate] = useState(editData?.date || '');
  const [category, setCategory] = useState(editData?.category || '');
  const [locationName, setLocationName] = useState(editData?.location_name || '');
  const [latitude, setLatitude] = useState(editData?.latitude?.toString() || '');
  const [longitude, setLongitude] = useState(editData?.longitude?.toString() || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(editData?.image_url || null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(editData?.video_url || null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isEditing = !!editData;

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });
      if (!error && data) setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoPreview(URL.createObjectURL(file));

    if (file.size > 10 * 1024 * 1024) {
      setCompressing(true);
      try {
        const compressed = await compressVideo(file, 10);
        setVideoFile(compressed);
      } catch {
        setVideoFile(file);
      } finally {
        setCompressing(false);
      }
    } else {
      setVideoFile(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    setLoading(true);
    setSuccess(false);

    try {
      let imageUrl = editData?.image_url || '';
      let videoUrl = editData?.video_url || '';

      // For foto type: upload image
      if (mediaType === 'foto' && imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('memories')
          .upload(fileName, imageFile);

        if (uploadError) throw new Error(`Upload foto gagal: ${uploadError.message}`);

        const { data: urlData } = supabase.storage.from('memories').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
        videoUrl = ''; // Clear video if switching to foto
      }

      // For video type: upload video + thumbnail
      if (mediaType === 'video') {
        if (videoFile) {
          const fileExt = videoFile.name.split('.').pop();
          const fileName = `videos/${Date.now()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from('memories')
            .upload(fileName, videoFile);

          if (uploadError) throw new Error(`Upload video gagal: ${uploadError.message}`);

          const { data: urlData } = supabase.storage.from('memories').getPublicUrl(fileName);
          videoUrl = urlData.publicUrl;
        }

        // Upload thumbnail as image_url
        if (thumbnailFile) {
          const fileExt = thumbnailFile.name.split('.').pop();
          const fileName = `thumbnails/${Date.now()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from('memories')
            .upload(fileName, thumbnailFile);

          if (uploadError) throw new Error(`Upload thumbnail gagal: ${uploadError.message}`);

          const { data: urlData } = supabase.storage.from('memories').getPublicUrl(fileName);
          imageUrl = urlData.publicUrl;
        }
      }

      const memoryData: Record<string, any> = {
        title,
        description,
        date,
        image_url: imageUrl,
        video_url: videoUrl || null,
        category: category || null,
        location_name: locationName || null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('memories')
          .update(memoryData)
          .eq('id', editData.id);
        if (error) throw new Error(`Gagal update: ${error.message}`);
      } else {
        const { error } = await supabase
          .from('memories')
          .insert([memoryData]);
        if (error) throw new Error(`Gagal simpan: ${error.message}`);
      }

      if (!isEditing) {
        setTitle('');
        setDescription('');
        setDate('');
        setCategory('');
        setLocationName('');
        setLatitude('');
        setLongitude('');
        setImageFile(null);
        setImagePreview(null);
        setVideoFile(null);
        setVideoPreview(null);
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setMediaType('foto');
      }
      setSuccess(true);
      onSuccess?.();
    } catch (error: any) {
      console.error('Error:', error);
      alert(`Gagal menyimpan kenangan:\n${error?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.9rem 1rem',
    background: 'rgba(0,0,0,0.02)',
    border: '1px solid var(--card-border)',
    borderRadius: '10px',
    color: 'var(--foreground)',
    outline: 'none',
    fontSize: '0.9rem',
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card" style={{ padding: '2rem', border: '1px solid var(--card-border)', borderRadius: 'var(--radius)' }}>
        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Media Type Toggle */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                Tipe Media
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setMediaType('foto')}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--card-border)',
                    background: mediaType === 'foto' ? 'var(--accent)' : 'transparent',
                    color: mediaType === 'foto' ? '#fff' : 'var(--foreground)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Camera size={15} /> Foto
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType('video')}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--card-border)',
                    background: mediaType === 'video' ? 'var(--accent)' : 'transparent',
                    color: mediaType === 'video' ? '#fff' : 'var(--foreground)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Video size={15} /> Video
                </button>
              </div>
            </div>

            {/* Foto Upload (shown when mediaType === 'foto') */}
            {mediaType === 'foto' && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                  Upload Foto
                </label>
                <label
                  style={{
                    border: '2px dashed var(--card-border)',
                    borderRadius: 'var(--radius)',
                    padding: imagePreview ? '0' : '2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'block',
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: imagePreview ? '160px' : 'auto',
                  }}
                >
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                  {imagePreview ? (
                    <div style={{ position: 'relative', width: '100%', height: '160px' }}>
                      <Image src={imagePreview} alt="Preview" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
                    </div>
                  ) : (
                    <>
                      <Camera size={32} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Klik untuk pilih foto</p>
                    </>
                  )}
                </label>
              </div>
            )}

            {/* Video Upload (shown when mediaType === 'video') */}
            {mediaType === 'video' && (
              <>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                    Upload Video (otomatis dikompres jika &gt; 10MB)
                  </label>
                  <label
                    style={{
                      border: '2px dashed var(--card-border)',
                      borderRadius: 'var(--radius)',
                      padding: videoPreview ? '0' : '1.5rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      display: 'block',
                      overflow: 'hidden',
                    }}
                  >
                    <input type="file" accept="video/*" onChange={handleVideoChange} style={{ display: 'none' }} />
                    {videoPreview ? (
                      <video src={videoPreview} controls style={{ width: '100%', maxHeight: '140px', borderRadius: '10px' }} />
                    ) : (
                      <>
                        <Video size={28} color="var(--text-muted)" style={{ marginBottom: '0.4rem' }} />
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Klik untuk pilih video</p>
                      </>
                    )}
                  </label>
                  {compressing && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.3rem' }}>⏳ Mengompres video...</p>
                  )}
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                    Thumbnail Video (cover yang ditampilkan di galeri)
                  </label>
                  <label
                    style={{
                      border: '2px dashed var(--card-border)',
                      borderRadius: 'var(--radius)',
                      padding: thumbnailPreview ? '0' : '1.5rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      display: 'block',
                      overflow: 'hidden',
                      position: 'relative',
                      minHeight: thumbnailPreview ? '120px' : 'auto',
                    }}
                  >
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} style={{ display: 'none' }} />
                    {thumbnailPreview ? (
                      <div style={{ position: 'relative', width: '100%', height: '120px' }}>
                        <Image src={thumbnailPreview} alt="Thumbnail" fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
                      </div>
                    ) : (
                      <>
                        <Camera size={24} color="var(--text-muted)" style={{ marginBottom: '0.4rem' }} />
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Klik untuk pilih thumbnail</p>
                      </>
                    )}
                  </label>
                </div>
              </>
            )}

            {/* Title */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                <Type size={14} /> Judul Kenangan
              </label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Liburan Pertama" required style={inputStyle} />
            </div>

            {/* Date & Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                  <Calendar size={14} /> Tanggal
                </label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                  <Tag size={14} /> Kategori
                </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, appearance: 'auto' }}>
                  <option value="">Pilih kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                <FileText size={14} /> Cerita di Balik Foto
              </label>
              <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tuliskan ceritamu..." style={{ ...inputStyle, resize: 'none' }} />
            </div>
          </div>

          {/* Right Column - Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                <MapPin size={14} /> Nama Lokasi (opsional)
              </label>
              <input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} placeholder="Contoh: Pantai Kuta, Bali" style={inputStyle} />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                <MapPin size={14} /> Pilih Lokasi di Peta
              </label>
              <LocationPicker
                latitude={latitude ? parseFloat(latitude) : null}
                longitude={longitude ? parseFloat(longitude) : null}
                onChange={(lat, lng, name) => {
                  setLatitude(lat.toFixed(6));
                  setLongitude(lng.toFixed(6));
                  if (name && !locationName) {
                    setLocationName(name.split(',').slice(0, 2).join(','));
                  }
                }}
              />
              {latitude && longitude && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  📍 {latitude}, {longitude}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading || compressing}
            style={{
              padding: '0.9rem 2rem',
              background: (loading || compressing) ? 'var(--text-muted)' : 'var(--accent)',
              border: 'none',
              borderRadius: 'var(--radius)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: (loading || compressing) ? 'not-allowed' : 'pointer',
            }}
          >
            <Send size={18} /> {loading ? 'Menyimpan...' : isEditing ? 'Update Kenangan' : 'Simpan Kenangan'}
          </motion.button>

          {success && (
            <p style={{ color: '#27ae60', fontSize: '0.85rem', fontWeight: 600 }}>
              ✓ {isEditing ? 'Berhasil diupdate!' : 'Kenangan berhasil disimpan!'}
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          form > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </form>
  );
}
