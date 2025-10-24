# 🚀 Panduan Deploy ke Vercel

## Prasyarat
- Akun Vercel (daftar di https://vercel.com)
- Git repository yang sudah push ke GitHub/GitLab/Bitbucket

## Langkah Deployment

### 1. **Persiapan Repository**
Pastikan semua perubahan sudah di-commit dan push:
```bash
git add .
git commit -m "fix: prepare for vercel deployment"
git push origin main
```

### 2. **Deploy via Vercel Dashboard**

#### Opsi A: Import dari Git Repository
1. Login ke https://vercel.com
2. Klik tombol **"Add New..."** → **"Project"**
3. Import repository Anda:
   - Pilih **GitHub** / **GitLab** / **Bitbucket**
   - Authorize Vercel untuk mengakses repository
   - Pilih repository `projek-konsumsi`
4. Configure Project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)
5. Klik **"Deploy"**
6. Tunggu proses build selesai (±2-3 menit)

#### Opsi B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

### 3. **Environment Variables** (Jika Diperlukan)
Jika proyek memerlukan environment variables:
1. Di Vercel Dashboard → Project Settings → Environment Variables
2. Tambahkan variabel yang diperlukan:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.com
   DATABASE_URL=postgresql://...
   ```

### 4. **Custom Domain** (Opsional)
1. Di Project Settings → Domains
2. Add domain Anda
3. Update DNS records sesuai instruksi Vercel

## Build Status
✅ **Production Build**: Successful  
📦 **Bundle Size**: ~125 KB (gzip)  
⚡ **Performance**: Optimized static pages

## Preview Deployment
Setiap push ke branch akan otomatis membuat preview deployment dengan URL unik.

## Troubleshooting

### Build Fails
Jika build gagal, check log di Vercel Dashboard:
1. Pastikan semua dependencies terinstall: `npm install`
2. Test build lokal: `npm run build`
3. Check Node.js version (gunakan v18+)

### 404 Error di Production
- Vercel otomatis handle routing Next.js
- Pastikan file ada di folder `/src/pages`

## Monitoring
- **Analytics**: https://vercel.com/[username]/[project]/analytics
- **Logs**: https://vercel.com/[username]/[project]/logs
- **Performance**: https://vercel.com/[username]/[project]/speed-insights

---
**Note**: Project sudah siap deploy! Tidak ada konfigurasi tambahan yang diperlukan.
