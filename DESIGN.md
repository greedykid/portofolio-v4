# Design direction

## Brief

- Audience: recruiter dan calon client yang ingin melihat kemampuan web development, system design, dan IT support.
- Visual language: NeoBrutalism / Retro UI mengikuti design system dan component grammar dari neobrutalism.com.
- Dials: ENERGY 3 / RHYTHM 3 / MOTION 2.

## Decisions

- Background `#fff7e8`, surface `#fff`, primary `#ffdc58`, secondary `#000`, dan ink `#000`: mengikuti token light theme dari neobrutalism.com.
- Accent cream, pink, green, dan soft blue dipakai sebagai variasi bidang konten, sementara kuning menjadi primary action dan hitam menjadi bidang kontras.
- Heading memakai display face lokal Brakle dengan fallback Archivo Black; body memakai Onest dengan fallback Space Grotesk agar tetap cepat dan terbaca tanpa dependency font baru.
- Border 2px, radius 4px, dan hard shadow bertingkat `2/3/4/6/10px`: mengikuti grammar komponen base registry agar tombol, kartu, badge, alert, dan accordion terasa satu sistem.
- Komposisi bervariasi: hero asimetris, about editorial, project grid, GitHub activity proof, skill list, timeline, lalu contact block mengikuti cara recruiter memindai portfolio.
- Tidak ada dark mode: brief visual menetapkan paper-and-ink light direction; satu tema menghindari mode kedua yang tidak dibutuhkan oleh portfolio statis ini.
- Motion 2: reveal-on-scroll dan stagger ringan membantu pembaca mengikuti urutan section, sementara hover komponen memakai transition sekitar 200ms dengan easing yang halus dan perpindahan 1–2px. Button mengikuti pola registry: primary hover berubah ke yellow yang lebih pekat dan shadow naik dari md ke lg; active menekan kembali ke shadow kecil. Banner stack memakai satu carousel infinite untuk membuat tools mudah dipindai tepat di bawah hero. Carousel berhenti saat hover/focus dan menjadi statis untuk reduced motion.
- Native pointer: cursor custom dihapus agar feedback hover tetap langsung seperti komponen referensi dan tidak memiliki trailing latency.
- Arrow hanya pada aksi keluar atau berpindah konteks: arah visual memberi sinyal saat membuka CV atau situs eksternal, bukan menjadi hiasan semua CTA.
- GitHub contribution chart: memakai data publik akun `greedykid` sebagai bukti aktivitas code; loading, error, dan fallback profile disediakan karena grafik berasal dari layanan eksternal.
- Component grammar: mengikuti referensi neobrutalism.com dengan border tegas, hard shadow bertingkat, rounded kecil, warna `primary` untuk aksi atau trigger, dan `secondary` untuk bidang kontras. Hover menaikkan komponen sedikit sekaligus memperpanjang shadow sebagai umpan balik fisik yang ringan.
- Accordion: memakai primitive Radix dengan pola API shadcn agar keyboard navigation, state ARIA, dan animasi buka-tutup tetap ditangani dengan benar. Isinya menjawab kebutuhan recruiter atau calon client sebelum menghubungi, bukan filler FAQ.
- Component mapping: Button dan Card menjadi grammar dasar CTA serta project/stat blocks; Badge dipakai untuk kategori project, tag teknologi, dan kelompok toolkit; Alert dipakai untuk loading/error GitHub; Calendar dipakai sebagai referensi visual contribution grid; Carousel/Marquee menjadi ticker stack; Image Card menjadi project preview; navigation, drawer, dialog, form, table, dan chart hanya dipakai bila ada kebutuhan interaksi nyata yang sesuai konten portfolio.

## Content policy

Angka capaian ditautkan ke CV atau section yang menampilkan buktinya. Foto profile dan screenshot project adalah aset yang dibawa dari portfolio v3.
