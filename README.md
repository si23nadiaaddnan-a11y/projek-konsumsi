# Konsumsi - Sistem Pemesanan Konsumsi Karyawan

Aplikasi web untuk mengelola pemesanan konsumsi karyawan PT Pupuk Kujang Cilegon.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ atau 20+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/si23nadiaaddnan-a11y/projek-konsumsi.git
cd projek-konsumsi

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📦 Available Scripts

```bash
# Development
npm run dev          # Jalankan development server

# Production
npm run build        # Build untuk production
npm run start        # Jalankan production server

# Code Quality
npm run lint         # Check linting errors
```

## 🏗️ Tech Stack

- **Framework**: Next.js 15.5.4 (Pages Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.18
- **UI Components**: Radix UI + shadcn/ui
- **Animation**: Framer Motion 12.23.22
- **Icons**: Lucide React
- **Date Handling**: date-fns + react-day-picker

## 📁 Project Structure

```
src/
├── pages/              # Next.js Pages
│   ├── index.tsx       # Halaman Konsumsi (Main)
│   ├── pemesanan/      # Halaman Pemesanan
│   ├── api/            # API Routes
│   ├── _app.tsx        # App Wrapper
│   └── _document.tsx   # Document Configuration
├── components/
│   └── ui/             # Reusable UI Components (40+)
├── hooks/              # Custom React Hooks
├── lib/                # Utilities
└── styles/             # Global CSS
```

## ✨ Features

### Modul Pemesanan Konsumsi
- ✅ Form pemesanan dinamis dengan validasi
- ✅ Cascading selection (Tipe Tamu → Waktu → Menu → Satuan)
- ✅ Multiple items per order
- ✅ Review dialog sebelum submit
- ✅ Success animation

### Manajemen Riwayat
- ✅ Filter by status (All/Pending/Approved/Rejected)
- ✅ Filter by date range
- ✅ View mode: Grid Cards / List View
- ✅ Pagination (6 items/page)
- ✅ Detail dialog dengan timeline
- ✅ Delete & Cancel orders

### UI/UX
- ✅ Responsive design (Mobile-first)
- ✅ Dark mode ready
- ✅ Smooth animations
- ✅ Searchable dropdowns

## 🚀 Deployment

### Deploy ke Vercel

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "ready for deployment"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Login ke [vercel.com](https://vercel.com)
   - Klik "Add New Project"
   - Import repository ini
   - Klik "Deploy"

3. **Deploy via CLI**
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```

### Environment Variables (Optional)
Jika diperlukan, tambahkan di Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=your_api_url
```

## 📊 Build Information

- **Build Status**: ✅ Passing
- **Bundle Size**: ~125 KB (gzip)
- **Performance**: Optimized static pages
- **TypeScript**: Strict mode enabled

## 🔧 Development Notes

### Known Warnings
- `use-toast.ts`: Minor warning tentang `actionTypes` (tidak mempengaruhi functionality)

### Removed Features
- Sidebar navigation (currently simplified for main content focus)
- Layout wrapper (simplified in `_app.tsx`)

## 📝 API Routes

- `/api/hello` - Test endpoint

## 🎨 Color Scheme

Primary colors:
- Violet: `#8b5cf6` - `#d946ef`
- Fuchsia: `#d946ef` - `#f472b6`

## 📄 License

This project is proprietary and confidential.

## 👥 Contributors

- Nadia Addnan (si23nadiaaddnan-a11y)

## 📞 Support

Untuk pertanyaan atau issue, silakan buat issue di repository ini.

---

**Note**: Project ini sudah production-ready dan siap di-deploy ke Vercel! ✅
