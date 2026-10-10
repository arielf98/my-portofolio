# Instruksi Proyek

## Desain Web Publik

Web publik (beranda, resume, tulisan, dan halaman error) mengikuti gaya Substack: layout editorial yang bersih, aksen warna web yang sudah ada, serta sans-serif untuk navigasi, judul, heading, dan isi artikel. Preview artikel di editor harus menggunakan CSS dan tipografi yang sama dengan web publik, bukan serif atau Times New Roman. Kode tetap menggunakan monospace.

Ant Design v6 merupakan acuan editor, bukan desain global web publik. Jangan menerapkan perubahan style editor ke web publik kecuali pengguna meminta komponen web tersebut secara eksplisit. Tag artikel web tetap mengikuti gaya Ant Design v6 sesuai permintaan khusus pengguna.

## Desain Editor

Semua style dan komponen UI di editor wajib mengikuti Ant Design v6. Aturan ini berlaku untuk komponen yang sudah ada maupun komponen baru, termasuk alert, dropdown, dialog, tombol, input, dan komponen lainnya. Ikuti warna, tipografi, spacing, border, radius, serta state interaksi Ant Design v6 secara konsisten.

## Pengujian

Jangan menjalankan E2E test, unit test, integration test, maupun pengujian lainnya tanpa permintaan eksplisit dari pengguna. Aturan ini berlaku untuk pengujian otomatis maupun manual, termasuk pengujian UI melalui browser.
