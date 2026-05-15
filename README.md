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

# Panduan Arsitektur Backend (Go Fiber)

Dokumen ini menjelaskan struktur folder dan pola desain yang digunakan dalam proyek ini. Arsitektur ini mengadopsi prinsip **Clean Architecture** dan **Domain-Driven Design (DDD)** yang disederhanakan, konsisten dengan standar yang digunakan pada proyek DMI.

## 0. Cara Setup Proyek Baru dari Nol

Jika Anda ingin membuat backend baru dengan standar ini, ikuti langkah berikut:

1.  **Inisialisasi Go:** `go mod init <nama-project>`
2.  **Instal Library Utama:** 
    ```bash
    go get github.com/gofiber/fiber/v2
    go get gorm.io/gorm
    go get gorm.io/driver/postgres # atau mysql
    go get github.com/ilyakaznacheev/cleanenv # untuk config
    ```
3.  **Buat Folder Dasar:** `mkdir -p cmd/api internal/app internal/common internal/config internal/pkg internal/database/migrations pkg`
4.  **Copy-Paste `internal/common/controller.go`:** Ini adalah fondasi untuk semua controller Anda.
5.  **Copy-Paste `internal/config/config.go`:** Dan sesuaikan struct config-nya.

---

## 1. Mengapa Menggunakan Struktur Ini?

Tujuan utama dari struktur ini adalah **Separation of Concerns (SoC)**, yaitu memisahkan tanggung jawab kode berdasarkan fungsinya.
- **Scalable:** Mudah menambah fitur baru tanpa mengganggu fitur lama.
- **Maintainable:** Kode lebih mudah diperbaiki karena setiap fungsi memiliki tempat yang jelas.
- **Testable:** Komponen dipisah sehingga mudah untuk dibuatkan unit testing.

---

## 2. Penjelasan Folder & Kegunaannya

### `cmd/`
- **Kegunaan:** Titik masuk (entry point) aplikasi.
- **Isi:** Biasanya berisi subfolder seperti `api/` yang memiliki file `main.go`. Ini hanya bertugas untuk men-start aplikasi.

### `internal/`
Folder ini berisi kode inti aplikasi yang tidak boleh di-import oleh aplikasi luar. Ini adalah standar keamanan di ekosistem Go.

#### `internal/app/`
- **Kegunaan:** "Otak" inisialisasi aplikasi.
- **Isi:** Setup server (Fiber), setup database (GORM), dan pendaftaran Route utama.

#### `internal/common/`
- **Kegunaan:** Kode yang digunakan bersama oleh semua modul.
- **Isi:** `BaseController` (fondasi untuk semua controller) dan standarisasi format response API (Success & Error).

#### `internal/config/`
- **Kegunaan:** Mengatur konfigurasi aplikasi.
- **Isi:** Membaca file `config.yml` atau Environment Variables. Dipisah menjadi beberapa file (database, server, jwt) agar tidak menumpuk di satu file.

#### `internal/pkg/ (Domain/Feature Folder)`
Ini adalah bagian terpenting. Setiap folder di sini mewakili satu fitur (misal: `ebook`, `event`). Di dalamnya terdapat 4 lapisan:
1. **`model.go`**: Definisi struktur tabel database.
2. **`data.go` (Repository)**: Hanya berhubungan dengan query database.
3. **`service.go`**: Berisi logika bisnis (validasi, perhitungan, dll).
4. **`controller.go` (Handler)**: Menangani HTTP Request dan memberikan Response.

#### `internal/database/migrations/`
- **Kegunaan:** Mengatur skema database.
- **Isi:** `migrate.go` untuk membuat tabel otomatis dan `seed.go` untuk mengisi data awal (dummy).

---

## 3. Alur Perjalanan Data (Data Flow)

Jika seorang pengguna ingin melihat daftar Ebook, alurnya adalah:

1. **Client (Frontend)** mengirim request ke `GET /api/ebooks`.
2. **Fiber Router** mengarahkan request ke `EbookController.GetAll`.
3. **Controller** memanggil fungsi di `EbookService`.
4. **Service** meminta data ke `EbookData` (Repository).
5. **Repository** menjalankan query ke **Database** (MySQL/Postgres).
6. Data dikembalikan secara berantai dari **Database -> Repository -> Service -> Controller**.
7. **Controller** membungkus data ke format `SuccessResponse` dan mengirimkannya kembali ke **Client**.

---

## 4. Keunggulan Dibandingkan Struktur "Flat" (Satu Folder)

Jika Anda ditanya kenapa tidak meletakkan semua file di satu folder saja, jawabannya:
1. **Kerapihan:** Saat proyek memiliki 50+ tabel, folder `internal/pkg` akan menjaga file tetap terorganisir per-fitur.
2. **Kemudahan Kolaborasi:** Developer A bisa fokus di folder `ebook` sementara Developer B fokus di folder `event` tanpa saling bentrok (conflict).
3. **Kemandirian Modul:** Jika Anda ingin mengganti database dari MySQL ke PostgreSQL, Anda cukup mengubah folder `pkg/database` dan `data.go` tanpa perlu mengubah logika di `service.go` atau `controller.go`.

---

## 5. Cara Menambah Fitur Baru

Jika ingin menambah fitur baru, misal "User":
1. Buat folder `internal/pkg/user`.
2. Buat file `model`, `data`, `service`, dan `controller` di dalamnya.
3. Daftarkan fiturnya di `internal/pkg/bookvent_routes.go`.
4. Tambahkan model User di `internal/database/migrations/migrate.go`.

