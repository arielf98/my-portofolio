# Portofolio

Situs portofolio bilingual dan blog statis menggunakan Astro.

English menjadi bahasa default di `/`, sedangkan Bahasa Indonesia tersedia di `/id/`.

## Menjalankan secara lokal

```sh
npm install
npm run dev
```

## Build statis

```sh
npm run build
npm run preview
```

Output statis dibuat di `dist/`. Tulisan blog ditambahkan sebagai file Markdown di `src/content/blog/id/` atau `src/content/blog/en/`.

## Data profil

Edit `src/data/profile.ts` untuk memperbarui profil Bahasa Indonesia dan English, termasuk pengalaman, proyek, pendidikan, sertifikasi, penghargaan, keahlian, serta tautan GitHub dan LinkedIn di navbar. `isSample` saat ini `false` karena halaman resume sudah memakai informasi profil publik Ariel Febrian.

Untuk menambahkan CV, simpan PDF di `public/` lalu isi `cvPdf` dengan nama file, misalnya `cv-id.pdf`. Tautan akan mengikuti base path saat dibangun untuk GitHub Pages. Email tidak tersedia di profil publik yang digunakan dan dibiarkan kosong.

## Menulis artikel

Editor lokal tersedia supaya artikel bisa ditulis tanpa layanan online. Jalankan:

```sh
npm run editor
```

Buka alamat lokal yang muncul di terminal. Editor hanya berjalan di komputer ini dan tidak memuat layanan online. Pilih tulisan yang ada untuk mengeditnya, atau buat tulisan baru; tombol simpan menulis langsung ke `src/content/blog/en/` atau `src/content/blog/id/`. Foto PNG, JPG, atau WebP hingga 20 MB otomatis diperkecil dengan sisi terpanjang maksimal 1600 px dan disimpan sebagai WebP (JPEG fallback bila browser tidak mendukung encoding WebP) di `src/content/blog/images/`. Setelah menyimpan, jalankan `npm run dev` untuk melihat hasilnya, lalu push perubahan ke GitHub untuk menerbitkan situs. Tekan `Ctrl+C` di terminal untuk menghentikan editor.

Tanpa editor, kamu juga bisa membuat file `.md` langsung di `src/content/blog/id/` atau `src/content/blog/en/` dengan metadata berikut:

```md
---
title: "Judul tulisan"
description: "Ringkasan singkat tulisan."
pubDate: 2026-10-08
tags: []
lang: id
translationKey: "opsional-kunci-terjemahan"
cover: ../images/nama-foto.png
coverAlt: "Deskripsi foto"
draft: false
---

Isi tulisan dalam Markdown.
```

Gunakan `lang` yang sama dengan folder. Dua versi artikel yang memakai `translationKey` yang sama akan saling menautkan di pemilih bahasa. Draft tidak akan tampil di situs publik.

## GitHub Pages

Workflow di `.github/workflows/deploy.yml` membangun dan menerbitkan situs dari branch default repo melalui GitHub Actions. Konfigurasi Astro membaca `GITHUB_REPOSITORY` untuk menentukan URL standar `https://<owner>.github.io` dan base path repository. Repo bernama `<owner>.github.io` otomatis memakai root tanpa base path.

Di **Settings → Pages**, pilih **GitHub Actions** sebagai sumber. Untuk domain khusus, buat repository variable `ASTRO_SITE` berisi URL situs, set `ASTRO_BASE` ke `/`, dan tambahkan domain sebagai satu baris di `public/CNAME`.
