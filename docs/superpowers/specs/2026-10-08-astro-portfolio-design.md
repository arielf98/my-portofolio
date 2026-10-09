# Desain Situs Portofolio dan Blog Astro

## Tujuan

Membangun situs personal untuk memperkenalkan pemilik situs kepada recruiter dan calon pemberi kerja, menampilkan resume, serta menerbitkan tulisan. Situs memakai tampilan editorial yang terinspirasi Substack tanpa menyalin identitas visualnya. Konten tersedia dalam Bahasa Indonesia dan English.

## Batasan dan keputusan

- Repo saat ini adalah starter Nuxt 4 kosong. Implementasi akan menggantinya dengan Astro; belum ada alur atau konten produk yang perlu dipertahankan.
- Situs dirender sepenuhnya sebagai halaman statis dan diterbitkan melalui GitHub Pages.
- Konten tulisan disimpan sebagai Markdown di repo menggunakan Astro Content Collections.
- Bahasa default adalah English. Versi Bahasa Indonesia memakai prefix `/id/`.
- Tidak ada CMS, database, server runtime, komentar, pencarian, formulir newsletter, atau integrasi pihak ketiga pada tahap awal.
- Resume awal boleh memakai data contoh fiktif agar layout terlihat utuh. Data itu harus diberi label jelas sebagai contoh di situs, memakai nama/perusahaan generik, dan mudah diganti sebelum publikasi. Jangan menyamarkan contoh sebagai riwayat nyata.
- Tulisan blog tetap kosong sampai pemilik situs memberi konten asli; jangan mengarang artikel atau detail kontak.

## Struktur halaman

English sebagai bahasa default tidak memakai prefix; Bahasa Indonesia memakai `/id/`:

| Bahasa Indonesia | English |
| --- | --- |
| `/id/` | `/` |
| `/id/resume/` | `/resume/` |
| `/id/blog/` | `/blog/` |
| `/id/blog/<slug>/` | `/blog/<slug>/` |

Beranda menampilkan ringkasan profesional, tautan ke resume dan kontak, serta tulisan terbaru. Resume menyajikan ringkasan, pengalaman, pendidikan, keahlian, dan tautan profesional dalam bagian yang mudah dipindai. Tombol unduh CV hanya ditampilkan jika pemilik menyediakan PDF untuk bahasa terkait.

Arsip blog menampilkan judul, ringkasan, tanggal, dan tag. Halaman tulisan memakai kolom baca yang nyaman, metadata, dan tipografi editorial. Setiap tulisan diterbitkan dalam bahasa aslinya; terjemahan bersifat opsional dan ditautkan dengan kunci pasangan. Pemilih bahasa menuju pasangan terjemahan jika tersedia, atau ke arsip blog bahasa tujuan jika belum ada.

## Visual dan interaksi

Tampilan mengikuti lebih dekat gaya publication website Substack: kanvas putih, feed tulisan yang terbuka dan dipisahkan garis tipis, tipografi yang membawa hierarki, serta aksen oranye. Branding tetap memakai nama pemilik, bukan wordmark atau logo Substack. Substack menyediakan pilihan layout, warna, dan font per publikasi, jadi desain ini mengikuti pola publication-style yang mudah dikenali, bukan menganggap Substack hanya punya satu tema tetap ([panduan tema Substack](https://support.substack.com/hc/en-us/articles/360055169471-How-do-I-set-a-custom-theme-for-my-Substack), [panduan font Substack](https://support.substack.com/hc/en-us/articles/360037833231-Can-I-use-custom-fonts-on-Substack)).

- Palet: putih `#ffffff`, abu-abu sangat muda `#fafafa` untuk permukaan sekunder, charcoal `#363737` untuk teks, abu-abu sedang untuk metadata, dan oranye `#ff6719` sebagai aksen. Teks tautan dan aksi memakai turunan oranye lebih gelap agar tetap terbaca dengan kontras yang memadai.
- Tipografi: wordmark serta judul tulisan memakai serif seperti `Georgia, 'Times New Roman', serif`; isi tulisan panjang juga serif agar terasa seperti membaca newsletter. Navigasi, tanggal, tag, dan metadata memakai stack system sans-serif (`system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`). Judul artikel sekitar 40–48px di desktop dan 32–36px di ponsel; isi tulisan 18px dengan line-height sekitar 1.7. Tidak memuat font proprietary dari Substack.
- Layout: header sederhana dengan wordmark teks dan navigasi sekitar 14px; daftar tulisan berupa baris editorial, bukan kartu mengambang; garis tipis abu-abu sebagai pemisah; tanpa bayangan dekoratif atau gradien. Halaman detail menjaga kolom baca sekitar 680px, terpusat, dengan ruang tepi yang cukup.
- Aksi berwarna oranye disesuaikan untuk portofolio—misalnya “Lihat resume” atau “Hubungi saya”—tanpa membuat formulir subscribe yang memerlukan backend.
- Header memuat navigasi Beranda/Resume/Blog dan pemilih ID/EN. Susunan responsif untuk layar kecil dan besar; konten tetap mudah dibaca tanpa JavaScript.
- Navigasi, pemilih bahasa, kontras, fokus keyboard, heading, tanggal, dan metadata harus dapat digunakan oleh pembaca layar serta keyboard.

## Konten dan implementasi Astro

- Gunakan Astro dengan output statis dan tanpa adapter server.
- Gunakan konfigurasi i18n Astro dengan `locales: ['id', 'en']`, `defaultLocale: 'en'`, dan `routing: { prefixDefaultLocale: false }`.
- Gunakan Astro Content Collections untuk tulisan Markdown dengan schema metadata: judul, ringkasan, tanggal terbit, tag, bahasa, kunci pasangan terjemahan opsional, dan penanda draft. Draft tidak masuk ke halaman produksi.
- Gunakan layout dan komponen bersama untuk header, footer, daftar tulisan, metadata, dan halaman baca; teks antarmuka disediakan dalam kedua bahasa.
- Terapkan gaya editorial dengan CSS lokal dan komponen Astro. Tidak menambah framework UI atau JavaScript klien tanpa kebutuhan.
- Terapkan judul halaman, deskripsi, bahasa dokumen, dan URL kanonis yang sesuai untuk setiap locale.

## Deploy GitHub Pages

- Bangun melalui GitHub Actions menggunakan action resmi Astro dan deploy GitHub Pages. Dokumentasi Astro saat ini menyarankan `withastro/action` dan `actions/deploy-pages`.
- Konfigurasi `site` dengan URL Pages yang sebenarnya. Untuk repository site bernama `my-porto`, set `base: '/my-porto'`; repository `<username>.github.io` dan custom domain tidak memakai base path repository.
- Workflow dipicu oleh push dan menjalankan deploy hanya pada branch default GitHub; workflow juga bisa dijalankan manual. Astro membaca `GITHUB_REPOSITORY` untuk menentukan URL `github.io` dan base path standar. Domain khusus dapat diatur lewat `ASTRO_SITE`, `ASTRO_BASE`, dan `public/CNAME`.
- Sumber Pages di pengaturan repository harus diset ke GitHub Actions.

Dokumentasi acuan: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/), [Astro i18n Routing](https://docs.astro.build/en/guides/internationalization/), dan [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/).

## Kriteria penerimaan desain

1. Recruiter dapat menemukan ringkasan profesional dan resume dari beranda dengan cepat.
2. Semua halaman utama tersedia dalam Bahasa Indonesia dan English dengan URL stabil dan pemilih bahasa yang tidak mengarah ke halaman terjemahan yang belum ada.
3. Tulisan dapat ditambahkan sebagai Markdown beserta metadata yang tervalidasi.
4. Halaman indeks dan detail blog dibangun statis dan dapat dibuka langsung pada URL GitHub Pages di bawah `base` repository.
5. Layout tetap nyaman dibaca di ponsel dan desktop, dengan navigasi keyboard dan struktur heading yang wajar.
6. Data contoh yang fiktif selalu diberi label jelas; informasi biografi nyata tidak diada-adakan, dan tidak ada form yang membutuhkan backend.

## Risiko dan hal yang diperlukan

- Konten dalam dua bahasa memerlukan pemeliharaan terjemahan secara manual.
- URL Pages dan branch deploy belum dapat dipastikan sampai repository GitHub ditautkan.
- Resume, informasi kontak, PDF CV, dan tulisan perlu disediakan sebelum situs dapat menampilkan konten personal yang nyata.
