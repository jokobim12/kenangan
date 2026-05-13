# Panduan Instalasi & Teknologi Proyek (React JS + Yarn)

Dokumen ini berisi panduan teknis untuk membuat aplikasi baru menggunakan **Yarn** sebagai package manager, sesuai dengan sistem yang sekarang.

---

## 1. Ringkasan Teknologi
Aplikasi ini menggunakan stack **React JS** yang modern dengan konfigurasi sebagai berikut:
*   **Framework**: React JS (v18)
*   **Bahasa**: TypeScript (File `.tsx`)
*   **Build Tool**: Vite (Sangat cepat untuk development)
*   **Package Manager**: **Yarn**
*   **Platform Mobile**: Capacitor (Hybrid - mengubah web ke Android/iOS)

---

## 2. Langkah-Langkah Instalasi Menggunakan Yarn

### Step 1: Membuat Proyek Base
Buka terminal dan jalankan perintah berikut:
```bash
yarn create vite nama-aplikasi-baru --template react-ts
cd nama-aplikasi-baru
yarn install
```

### Step 2: Install Library UI & Styling
```bash
# Install Mantine UI & Emotion
yarn add @mantine/core@6 @mantine/hooks@6 @mantine/form@6 @mantine/notifications@6 @emotion/react

# Install & Init Tailwind CSS
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

### Step 3: Install Library Logika & API
```bash
# Navigasi, API Management, & HTTP Client
yarn add @tanstack/react-query axios react-router-dom

# Animasi & Utilitas Tanggal
yarn add framer-motion dayjs
```

### Step 4: Install Plugin Mobile (Capacitor)
```bash
# Install & Inisialisasi Capacitor
yarn add @capacitor/core @capacitor/cli @capacitor/android
yarn cap init
```

---

## 3. Struktur Folder Rekomendasi
Gunakan struktur folder ini di dalam folder `src/` agar konsisten:
*   `features/` : Logika per modul (Login, Quiz, dsb).
*   `components/` : Komponen UI global.
*   `lib/` : Konfigurasi library (Axios instance).
*   `types/` : Definisi tipe data.

---

## 4. Cara Menjalankan
Untuk menjalankan aplikasi:
```bash
yarn dev
```

Untuk membangun aplikasi (build):
```bash
yarn build
```
---
*Panduan ini diperbarui menggunakan Yarn sesuai dengan standar proyek saat ini.*
