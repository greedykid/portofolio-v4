# Design direction

## Brief

- Audience: recruiter dan calon client yang ingin melihat kemampuan web development, system design, dan IT support.
- Visual language: Neo-Brutalist editorial, terinspirasi pola komponen dan layout dari neobrutalism.dev tanpa menyalin struktur situsnya.
- Dials: ENERGY 3 / RHYTHM 3 / MOTION 2.

## Decisions

- Paper `#fffdf5` dan ink `#151515`: memberi kontras tinggi dan membuat portfolio terasa seperti halaman editorial yang tegas.
- Yellow, blue, pink, dan red: tiga warna inti dan satu aksen untuk membedakan kelompok konten tanpa gradient atau glow.
- Brakle untuk heading dan Onest untuk body: Brakle memberi karakter display yang khas, sementara Onest menjaga paragraf dan label tetap terbaca.
- Grid background: mengikat visual ke referensi Neo-Brutalism dan memberi ritme pada bidang kosong, bukan menjadi dekorasi pada setiap komponen.
- Border tebal dan hard shadow: motif identitas utama sekaligus memberi batas yang jelas pada kartu, CTA, dan blok bukti.
- Komposisi bervariasi: hero asimetris, about editorial, project grid, GitHub activity proof, skill list, timeline, lalu contact block mengikuti cara recruiter memindai portfolio.
- Tidak ada dark mode: brief visual menetapkan paper-and-ink light direction; satu tema menghindari mode kedua yang tidak dibutuhkan oleh portfolio statis ini.
- Motion 2: reveal-on-scroll dan stagger ringan membantu pembaca mengikuti urutan section, hover transition memberi feedback pada elemen yang bisa disentuh, dan banner stack memakai satu carousel infinite untuk membuat tools mudah dipindai tepat di bawah hero. Carousel berhenti saat hover/focus dan menjadi statis untuk reduced motion.
- Arrow hanya pada aksi keluar atau berpindah konteks: arah visual memberi sinyal saat membuka CV atau situs eksternal, bukan menjadi hiasan semua CTA.
- GitHub contribution chart: memakai data publik akun `greedykid` sebagai bukti aktivitas code; loading, error, dan fallback profile disediakan karena grafik berasal dari layanan eksternal.
- Component grammar: mengikuti referensi neobrutalism.dev dengan border tegas, hard shadow yang terlihat, rounded kecil, warna `main` untuk aksi atau trigger, dan `secondary` untuk bidang konten. Hover menggeser komponen sampai bayangannya hilang sebagai umpan balik fisik.
- Accordion: memakai primitive Radix dengan pola API shadcn agar keyboard navigation, state ARIA, dan animasi buka-tutup tetap ditangani dengan benar. Isinya menjawab kebutuhan recruiter atau calon client sebelum menghubungi, bukan filler FAQ.
- Component mapping: Button dan Card menjadi grammar dasar CTA serta project/stat blocks; Badge dipakai untuk kategori project, tag teknologi, dan kelompok toolkit; Alert dipakai untuk loading/error GitHub; Calendar dipakai sebagai referensi visual contribution grid; Carousel/Marquee menjadi ticker stack; Image Card menjadi project preview; navigation, drawer, dialog, form, table, dan chart hanya dipakai bila ada kebutuhan interaksi nyata yang sesuai konten portfolio.

## Content policy

Angka capaian ditautkan ke CV atau section yang menampilkan buktinya. Foto profile dan screenshot project adalah aset yang dibawa dari portfolio v3.
