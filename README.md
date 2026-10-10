# Portofolio Ariel Febrian

Website resume dan artikel dalam Bahasa Indonesia dan Inggris, dengan editor lokal untuk menulis tanpa mengedit file secara manual.

[Buka website](https://arielf98.github.io/my-portofolio/) | [Versi Bahasa Indonesia](https://arielf98.github.io/my-portofolio/id/)

## Mulai Dari Sini

Siapkan **Node.js versi 22.12 atau lebih baru**, npm, dan Git. Buka terminal di folder proyek ini.

Saat pertama kali menggunakan proyek, pasang dependensinya:

```sh
npm install
```

Setelah itu, pilih sesuai kebutuhan:

| Saya ingin... | Jalankan |
| --- | --- |
| Menulis atau mengedit artikel | `npm run editor` |
| Melihat website dan resume di komputer | `npm run dev` |
| Membuat hasil build website | `npm run build` |
| Melihat hasil build terakhir | `npm run preview` |

Buka alamat yang muncul di terminal. Alamat editor memakai port acak, jadi bisa berubah setiap kali dijalankan. Biarkan terminal tetap terbuka; tekan `Ctrl+C` untuk menghentikan server.

Editor dan website lokal adalah dua halaman berbeda. Jika ingin membuka keduanya, jalankan `npm run editor` di satu terminal dan `npm run dev` di terminal lain.

> **Simpan, commit, dan push itu berbeda.** Simpan menulis artikel ke komputer. Commit mencatat perubahan dalam riwayat Git. Push mengirim commit ke GitHub; website baru diperbarui setelah proses penerbitan berhasil.

## Menulis Artikel Baru

1. Jalankan `npm run editor`, lalu buka alamat editor dari terminal.
2. Klik **Artikel baru** dan pilih bahasa tulisan.
3. Isi judul, subjudul, tanggal publikasi, dan isi tulisan.
4. Periksa **Slug / nama file**. Contohnya `catatan-belajar-odoo`; gunakan huruf kecil, angka, dan tanda hubung.
5. Isi tag jika diperlukan. Pisahkan dengan koma, misalnya `Engineering, Odoo`.
6. Lihat hasilnya di panel **Pratinjau** sebelah kanan.
7. Klik **Simpan artikel** dan tunggu notifikasi berhasil.

Pratinjau mengikuti tulisan secara otomatis, dengan jeda singkat setelah mengetik. Tidak perlu menyimpan untuk melihat hasilnya. Scroll area tulisan juga menggerakkan preview secara proporsional, bukan persis per paragraf. Pilih **Markdown** untuk melihat sumber yang akan disimpan.

Tulisan memakai Markdown. Tombol di atas area tulisan dapat digunakan untuk heading, teks tebal, miring, dan tautan. Contoh sederhana:

```md
## Hal yang saya pelajari

Ini paragraf biasa, dengan **teks tebal** dan *teks miring*.

- Catatan pertama
- Catatan kedua

[Buka sebuah tautan](https://example.com)
```

### Menyimpan Draft

Centang **Simpan sebagai draft** jika tulisan belum siap tampil di website. Draft tetap tersimpan dan dapat diedit di editor, tetapi tidak ditampilkan di website.

Untuk menerbitkannya, muat kembali tulisan, hilangkan centang draft, simpan, lalu commit dan push.

Draft bukan tempat menyimpan rahasia. Jika repository publik, file draft yang ikut di-commit dan dipush tetap dapat dibaca melalui GitHub.

### Menambahkan Foto

| Kebutuhan | Langkah |
| --- | --- |
| Foto utama artikel | Pilih file pada **Foto cover**, lalu klik **Unggah cover**. Isi deskripsi foto sebelum menyimpan artikel. |
| Foto di tengah tulisan | Letakkan kursor pada posisi yang diinginkan, pilih foto, lalu klik **Unggah & sisipkan**. |

Gunakan PNG, JPG, atau WebP berukuran maksimal **20 MB**. Editor mengompres foto menjadi WebP, atau JPEG jika browser tidak mendukung WebP.

**Foto dipotong dari tengah ke rasio 3:2, ukuran 1536 x 1024.** Pilih foto yang bagian pentingnya berada di tengah. File hasil unggahan disimpan di `src/content/blog/images/`.

Mengunggah foto belum menyimpan isi artikel. Klik **Simpan artikel** setelah selesai menambahkan foto.

### Artikel Dalam Dua Bahasa

Artikel Indonesia dan Inggris disimpan secara terpisah; editor tidak menerjemahkan isi secara otomatis.

Buat kedua versi dengan **Kunci terjemahan** yang sama, misalnya `catatan-belajar-odoo`. Pemilih bahasa di website kemudian dapat menghubungkan kedua tulisan tersebut.

## Mengedit Atau Menghapus Artikel

Untuk mengedit:

1. Pilih bahasa artikel.
2. Pilih judul dari **Tulisan yang sudah ada**.
3. Klik **Muat artikel**, lalu ubah isinya.
4. Klik **Simpan perubahan**.

Untuk menghapus, muat artikel terlebih dahulu, klik **Hapus artikel**, lalu periksa dan konfirmasi dialognya. Foto yang terkait ikut dihapus hanya jika tidak digunakan artikel lain.

Penghapusan langsung mengubah file lokal. Editor tidak menyediakan tombol undo untuk penghapusan; simpan riwayat penting melalui commit sebelum menghapus. Agar penghapusan juga berlaku di website, commit dan push perubahan tersebut.

> Jangan menutup atau memuat ulang tab ketika tulisan belum disimpan. Editor belum memiliki autosave.

## Commit Dan Push Dari Editor

Untuk penggunaan sehari-hari:

1. Simpan artikel terlebih dahulu.
2. Pada panel **Git**, periksa branch aktif dan buka daftar perubahan file.
3. Isi **Pesan commit**, misalnya `Tambah artikel tentang Odoo`.
4. Klik **Commit & Push**, lalu konfirmasi.
5. Setelah berhasil, buka tab **Actions** di GitHub dan tunggu workflow **Deploy to GitHub Pages** selesai.

| Tombol | Fungsinya |
| --- | --- |
| **Commit** | Mencatat perubahan di komputer tanpa mengirimnya ke GitHub. |
| **Commit & Push** | Membuat commit, kemudian mengirim commit pada branch aktif ke GitHub. |
| **Push** | Mengirim commit yang sudah dibuat, tanpa membuat commit baru. |
| **Perbarui status Git** | Membaca ulang branch dan perubahan file di komputer. |

**Commit mencakup seluruh perubahan repository**, bukan hanya artikel: termasuk kode, file baru, dan file yang dihapus. File yang diabaikan Git tidak ikut dimasukkan. Periksa daftar file, terutama sebelum mengirim data pribadi atau perubahan yang tidak berkaitan dengan artikel.

Push mengirim seluruh commit yang belum terkirim pada branch aktif ke branch bernama sama di remote `origin`, tanpa force-push. Jika commit berhasil tetapi push gagal, commit tetap tersimpan. Selesaikan penyebab gagalnya, lalu gunakan **Push** untuk mencoba lagi.

### Persiapan Git

Identitas Git dan akses GitHub harus sudah dikonfigurasi di komputer. Jika Git belum mengenali nama dan emailmu, jalankan di folder proyek:

```sh
git config user.name "Nama Anda"
git config user.email "email-anda@example.com"
```

Pastikan remote `origin` mengarah ke repository yang benar. Gunakan autentikasi SSH atau credential helper sesuai pengaturan Git di komputer; editor tidak menyediakan formulir login GitHub. Push membutuhkan internet dan akses tulis ke repository.

### Pindah Branch

Pilih branch yang sudah ada pada **Branch lokal**, lalu klik **Pindah branch**.

Sebelum berpindah, semua perubahan file harus sudah di-commit atau dirapikan, dan tidak boleh ada merge, rebase, atau konflik aktif. Jika ada tulisan yang belum disimpan, dialog akan memperingatkan bahwa tulisan itu dibuang saat berpindah.

Editor tidak membuat branch baru, melakukan stash, pull, atau fetch otomatis. Hitungan commit di depan/belakang memakai referensi remote yang tersimpan di komputer, sehingga belum tentu mencerminkan kondisi terbaru di GitHub.

Sebelum berpindah branch lewat terminal, simpan tulisan terlebih dahulu. Jika branch telanjur berubah, editor menolak penyimpanan ke branch yang berbeda: salin tulisan yang belum disimpan ke tempat aman sebelum memuat ulang editor. Jika branch baru mengubah kode editor, hentikan server editor dan jalankan kembali `npm run editor`.

## Memperbarui Resume Dan Kontak

| Yang ingin diubah | File atau tempatnya |
| --- | --- |
| Nama, ringkasan, pengalaman, pendidikan, proyek, sertifikasi, keahlian, dan tautan sosial | `src/data/profile.ts`, pada bagian `id` dan `en` |
| Email dan WhatsApp di atas navbar | `src/components/SiteHeader.astro` |
| Email tambahan pada bagian bawah resume | Properti `email` di `src/data/profile.ts` |
| CV yang dapat diunduh | Tambahkan PDF ke `public/`, lalu isi properti `cvPdf` di profil bahasa terkait |

Contoh: untuk `public/cv-id.pdf`, isi `cvPdf: 'cv-id.pdf'` pada profil Indonesia. Setelah mengubah data profil, buka website lokal untuk melihat hasilnya. Commit dan push ketika siap menerbitkan perubahan.

## Menerbitkan Website

Editor hanya berjalan di komputer lokal; editor bukan bagian dari website publik di GitHub Pages.

Pengaturan awal GitHub Pages cukup dilakukan sekali:

1. Buka repository di GitHub.
2. Masuk ke **Settings > Pages**.
3. Pada **Build and deployment > Source**, pilih **GitHub Actions**.

Pengaturan ini mengikuti [panduan GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow).

Repository ini sudah memiliki workflow `.github/workflows/deploy.yml`. **Push ke branch default repository** akan membangun dan menerbitkan website. Push ke branch lain tidak otomatis menerbitkannya; perubahan perlu masuk ke branch default terlebih dahulu. Workflow juga dapat dijalankan manual dari tab **Actions**.

Untuk membuat dan melihat hasil build di komputer:

```sh
npm run build
npm run preview
```

Hasil build berada di `dist/`. Perintah di atas tidak mengirim perubahan ke GitHub.

## Jika Ada Kendala

| Masalah | Yang perlu dilakukan |
| --- | --- |
| Editor tidak terbuka | Pastikan `npm run editor` masih berjalan dan gunakan alamat terbaru dari terminal, bukan port lama. |
| Preview atau font belum mengikuti perubahan | Simpan tulisan dulu, lalu muat ulang tab editor untuk memuat CSS terbaru. |
| Artikel tidak muncul di website | Periksa status draft, keberhasilan simpan dan push, serta hasil workflow di GitHub Actions. |
| Commit menyebut tulisan belum disimpan | Klik **Simpan artikel** atau **Simpan perubahan**, lalu ulangi commit. |
| Push gagal | Periksa internet, autentikasi GitHub, akses tulis, dan remote `origin`. Jika branch tertinggal atau konflik, selesaikan lewat terminal; editor tidak melakukan pull otomatis. |
| Pindah branch ditolak | Periksa seluruh perubahan file dan selesaikan operasi Git yang masih berlangsung. |
| Deploy gagal dengan status 404 | Periksa **Settings > Pages > Source** sudah memakai **GitHub Actions**, lalu jalankan ulang workflow. |
| Server web melaporkan error cache konten | Hindari beberapa instance `npm run dev` untuk proyek yang sama. Hentikan server web dan jalankan ulang; amankan tulisan sebelum memuat ulang editor. |

## Referensi File

| Lokasi | Isi |
| --- | --- |
| `src/content/blog/id/` | Artikel Bahasa Indonesia |
| `src/content/blog/en/` | Artikel Bahasa Inggris |
| `src/content/blog/images/` | Foto artikel |
| `src/styles/global.css` | Style web publik dan preview artikel |
| `tools/writing-editor.html` | Tampilan dan interaksi editor |
| `tools/writing-editor.mjs` | Server lokal editor serta operasi file dan Git |
| `src/pages/404.astro` | Halaman untuk alamat yang tidak ditemukan |
| `AGENTS.md` | Aturan desain dan pengujian proyek |

Web publik mengikuti arah desain Substack. Kontrol editor mengikuti Ant Design v6; preview artikel memakai style web publik. Tag artikel web memakai gaya Ant Design v6 sesuai ketentuan proyek.

### Menulis Langsung Dengan Markdown

Jika tidak memakai editor, buat file seperti `src/content/blog/id/catatan-belajar.md`:

```md
---
title: "Catatan belajar"
description: "Hal yang saya pelajari minggu ini."
pubDate: 2026-10-10
tags: ["Engineering", "Odoo"]
lang: id
draft: false
---

## Catatan pertama

Isi artikel di sini.
```

Gunakan `lang: id` untuk folder `id/` dan `lang: en` untuk folder `en/`. Tambahkan `translationKey` yang sama pada dua versi bahasa jika ingin menghubungkannya. `updatedDate`, `cover`, dan `coverAlt` bersifat opsional; jika menggunakan cover, isi deskripsi fotonya juga.

### Domain Khusus

Jika menggunakan domain sendiri, atur domain dan DNS melalui pengaturan GitHub Pages. Di repository variables, isi `ASTRO_SITE` dengan URL lengkap domain dan `ASTRO_BASE` dengan `/`. Petunjuk resmi tersedia di [panduan domain khusus GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

Untuk alamat GitHub Pages biasa, URL dan base path ditentukan dari `GITHUB_REPOSITORY` oleh `astro.config.mjs`; tidak perlu mengubah konfigurasi itu hanya untuk menulis artikel.
