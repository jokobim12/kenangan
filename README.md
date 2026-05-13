# Panduan Instalasi & Teknologi Proyek (React JS)

Dokumen ini berisi panduan teknis untuk membuat aplikasi baru dengan teknologi yang sama dengan sistem ini.

---

## 1. Ringkasan Teknologi
Aplikasi ini menggunakan stack **React JS** yang modern dengan konfigurasi sebagai berikut:
*   **Framework**: React JS (v18)
*   **Bahasa**: TypeScript (File `.tsx`)
*   **Build Tool**: Vite (Sangat cepat untuk development)
*   **Platform Mobile**: Capacitor (Hybrid - mengubah web ke Android/iOS)

---

## 2. Langkah-Langkah Instalasi (Step-by-Step)

### Step 1: Membuat Proyek Base
Buka terminal dan jalankan perintah berikut untuk membuat proyek dengan template React + TypeScript:
```bash
npm create vite@latest nama-aplikasi-baru -- --template react-ts
cd nama-aplikasi-baru
```

### Step 2: Install Library UI & Styling
Untuk tampilan menggunakan Mantine UI (v6) dan Tailwind CSS:
```bash
# Install Mantine UI & Emotion (CSS-in-JS)
npm install @mantine/core@6 @mantine/hooks@6 @mantine/form@6 @mantine/notifications@6 @emotion/react

# Install & Init Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3: Install Library Logika & API
Untuk menangani navigasi, pemanggilan API, dan animasi:
```bash
# React Router (Navigasi), React Query (API Management), Axios (HTTP Client)
npm install @tanstack/react-query axios react-router-dom

# Framer Motion (Animasi) & Dayjs (Format Tanggal)
npm install framer-motion dayjs
```

### Step 4: Install Plugin Mobile (Capacitor)
Jika aplikasi ini ingin dijadikan aplikasi Android atau iOS:
```bash
# Install Core Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Inisialisasi Capacitor
npx cap init
```

---

## 3. Struktur Folder Rekomendasi
Agar sama dengan sistem yang sekarang, gunakan struktur folder seperti ini di dalam folder `src/`:
*   `features/` : Tempat menyimpan logika per fitur (Contoh: Login, Absensi, Profile).
*   `components/` : Tempat komponen yang bisa dipakai berulang kali (Button, Navbar).
*   `lib/` : Tempat file konfigurasi (Axios instance, Query Client).
*   `types/` : Tempat definisi tipe data TypeScript.

---

## 4. Cara Menjalankan
Untuk menjalankan aplikasi di browser saat sedang coding:
```bash
npm run dev
```

Untuk membangun aplikasi untuk produksi:
```bash
npm run build
```
---
*Panduan ini dibuat sebagai referensi standar pengembangan aplikasi.*
