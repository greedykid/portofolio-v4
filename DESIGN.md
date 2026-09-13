# Design direction

## Brief

- Audience: recruiter dan calon client yang ingin melihat kemampuan web development, system design, dan IT support.
- Visual language: Neo-Brutalist editorial, terinspirasi pola komponen dan layout dari neobrutalism.dev tanpa menyalin struktur situsnya.
- Dials: ENERGY 3 / RHYTHM 3 / MOTION 2.

## Decisions

- Background `#e5eeff`, surface `#fff`, dan ink `#000`: mengikuti token dasar neobrutalism-components, memberi canvas biru muda dengan bidang konten putih yang tegas.
- Main blue, yellow, pink, red, dan green: warna dipakai sebagai state atau kelompok konten, bukan gradient atau glow.
- Brakle untuk heading dan Onest untuk body: Brakle memberi karakter display yang khas, sementara Onest menjaga paragraf dan label tetap terbaca.
- Border 2px, radius 5px, dan hard shadow 4px: mengikuti grammar komponen referensi agar tombol, kartu, badge, alert, dan accordion terasa satu sistem.
- Komposisi bervariasi: hero asimetris, about editorial, project grid, GitHub activity proof, skill list, timeline, lalu contact block mengikuti cara recruiter memindai portfolio.
- Tidak ada dark mode: brief visual menetapkan paper-and-ink light direction; satu tema menghindari mode kedua yang tidak dibutuhkan oleh portfolio statis ini.
- Motion 2: reveal-on-scroll dan stagger ringan membantu pembaca mengikuti urutan section, sementara hover komponen memakai transisi 150ms dan perpindahan 4px seperti Button referensi. Banner stack memakai satu carousel infinite untuk membuat tools mudah dipindai tepat di bawah hero. Carousel berhenti saat hover/focus dan menjadi statis untuk reduced motion.
- Native pointer: cursor custom dihapus agar feedback hover tetap langsung seperti komponen referensi dan tidak memiliki trailing latency.
- Arrow hanya pada aksi keluar atau berpindah konteks: arah visual memberi sinyal saat membuka CV atau situs eksternal, bukan menjadi hiasan semua CTA.
- GitHub contribution chart: memakai data publik akun `greedykid` sebagai bukti aktivitas code; loading, error, dan fallback profile disediakan karena grafik berasal dari layanan eksternal.
- Component grammar: mengikuti referensi neobrutalism.dev dengan border tegas, hard shadow yang terlihat, rounded kecil, warna `main` untuk aksi atau trigger, dan `secondary` untuk bidang konten. Hover menggeser komponen sampai bayangannya hilang sebagai umpan balik fisik.
- Accordion: memakai primitive Radix dengan pola API shadcn agar keyboard navigation, state ARIA, dan animasi buka-tutup tetap ditangani dengan benar. Isinya menjawab kebutuhan recruiter atau calon client sebelum menghubungi, bukan filler FAQ.
- Component mapping: Button dan Card menjadi grammar dasar CTA serta project/stat blocks; Badge dipakai untuk kategori project, tag teknologi, dan kelompok toolkit; Alert dipakai untuk loading/error GitHub; Calendar dipakai sebagai referensi visual contribution grid; Carousel/Marquee menjadi ticker stack; Image Card menjadi project preview; navigation, drawer, dialog, form, table, dan chart hanya dipakai bila ada kebutuhan interaksi nyata yang sesuai konten portfolio.

## Content policy

Angka capaian ditautkan ke CV atau section yang menampilkan buktinya. Foto profile dan screenshot project adalah aset yang dibawa dari portfolio v3.
