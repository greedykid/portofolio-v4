'use client';

import Image from 'next/image';
import { useState } from 'react';

const projects = [
  {
    number: '01',
    category: 'E-COMMERCE PLATFORM',
    title: 'GEGARES',
    description: 'Platform e-commerce kuliner tradisional dengan katalog interaktif, cart, checkout, dan manajemen inventaris.',
    image: '/images/gegares-live.png',
    tags: ['Laravel 12', 'MySQL', 'Tailwind CSS'],
    demo: 'https://gegares.shop',
    github: 'https://github.com/greedykid',
  },
  {
    number: '02',
    category: 'DIGITAL CATALOG',
    title: 'BERKAH MULIA',
    description: 'Website katalog digital aktif untuk produk pakaian bayi dan anak dengan struktur kategori yang rapi.',
    image: '/images/berkahmulia-live.png',
    tags: ['Laravel', 'MySQL', 'Responsive UI'],
    demo: 'https://bmberkahmulia.com',
    github: 'https://github.com/greedykid/berkahmulia',
  },
];

const skillGroups = [
  { title: 'WEB DEV', color: 'pink', skills: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'JavaScript', 'Blade'] },
  { title: 'SYSTEM DESIGN', color: 'blue', skills: ['UML', 'ERD', 'Use Case', 'Activity Diagram', 'Figma', 'UI / UX'] },
  { title: 'IT SUPPORT', color: 'green', skills: ['Troubleshooting', 'Windows / Linux', 'PC & Printer', 'LAN & Wi-Fi', 'Helpdesk'] },
  { title: 'TOOLS', color: 'yellow', skills: ['Git & GitHub', 'Postman', 'Docker', 'Microsoft Office', 'Networking'] },
];

const experiences = [
  { date: '2026 — SEKARANG', role: 'Pengembang Web', company: 'Website Katalog Digital “Berkah Mulia”', body: 'Membangun dan mendeploy katalog digital aktif, merancang kategori bertingkat, serta menjaga performa dan responsivitas di berbagai perangkat.' },
  { date: '2025 — 2026', role: 'Pengembang Web & Peneliti', company: 'Platform E-Commerce “GEGARES”', body: 'Mengembangkan aplikasi e-commerce sebagai proyek Penulisan Ilmiah Universitas Gunadarma dengan arsitektur Laravel MVC dan database MySQL.' },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}><span className="brand-mark">R</span><span>RIZKI ARBI.</span></a>
          <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Navigasi utama">
            <a href="#about" onClick={() => setMenuOpen(false)}>Tentang</a>
            <a href="#work" onClick={() => setMenuOpen(false)}>Karya</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Keahlian</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Kontak</a>
          </nav>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>{menuOpen ? 'TUTUP' : 'MENU'}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow"><span className="eyebrow-dot" /> OPEN TO WORK · JAKARTA</div>
              <h1>HALO, SAYA <span>RIZKI.</span></h1>
              <p className="hero-copy">Web Developer &amp; IT Support yang suka mengubah kebutuhan yang rumit menjadi sistem digital yang rapi, berguna, dan siap dipakai.</p>
              <div className="hero-actions">
                <a className="button" href="#work">Lihat karya <Arrow /></a>
                <a className="button secondary" href="/cv-rizki-arbiansyah.pdf" target="_blank" rel="noreferrer">Lihat CV <Arrow /></a>
              </div>
              <p className="hero-note">Saat ini berbasis di <a href="https://maps.google.com/?q=Jakarta+Barat" target="_blank" rel="noreferrer">Jakarta Barat, Indonesia</a>.</p>
            </div>
            <div className="hero-card">
              <div className="photo-frame"><Image src="/images/profile-photo.png" alt="Rizki Arbiansyah" fill priority sizes="(max-width: 900px) 500px, 460px" /></div>
              <div className="hero-card-footer"><div><strong>WEB DEV.</strong><small>IT SUPPORT. SYSTEM THINKER.</small></div><span className="scribble">✳</span></div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-label="Bidang keahlian"><div className="ticker-track">{[1, 2].map((copy) => <div className="ticker-item" key={copy}><b>✦</b> WEB DEVELOPMENT <b>✦</b> SYSTEM DESIGN <b>✦</b> IT SUPPORT <b>✦</b> LET&apos;S BUILD SOMETHING USEFUL</div>)}</div></div>

        <section className="section" id="about">
          <div className="container">
            <div className="section-heading"><div><p className="section-kicker">01 / Sedikit tentang saya</p><h2>Bukan cuma<br />bikin <em>bagus.</em></h2></div><p className="section-intro">Saya percaya software yang baik harus mudah dipahami, mudah dirawat, dan benar-benar membantu orang yang memakainya.</p></div>
            <div className="about-grid">
              <div><span className="about-sticker">CURIOUS<br />BY DEFAULT.</span><div className="quote">“The only way to do great work is to love what you do.”<cite>— Steve Jobs</cite></div></div>
              <div className="about-copy"><p>Saya adalah lulusan S1 Sistem Informasi Universitas Gunadarma dengan IPK 3.58 / 4.00. Fokus saya ada di pengembangan web berbasis Laravel, MySQL, dan Tailwind CSS, sekaligus memastikan sisi teknis di baliknya berjalan baik.</p><p>Saya juga nyaman mengerjakan troubleshooting hardware/software, instalasi Windows/Linux, pemeliharaan PC &amp; printer, serta konektivitas dasar LAN/Wi-Fi. Buat saya, memahami konteks masalah sama pentingnya dengan menulis kodenya.</p></div>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Statistik"><div className="container stats-grid"><div className="card stat"><span className="stat-number">3.58</span><span className="stat-label">IPK S1 Sistem Informasi</span></div><div className="card stat"><span className="stat-number">07</span><span className="stat-label">Sertifikasi kompetensi &amp; jaringan</span></div><div className="card stat"><span className="stat-number">02</span><span className="stat-label">Proyek live yang dibangun</span></div><div className="card stat"><span className="stat-number">2026</span><span className="stat-label">Tahun lulus sarjana</span></div></div></section>

        <section className="section" id="work"><div className="container"><div className="section-heading"><div><p className="section-kicker">02 / Selected work</p><h2>Yang sudah<br /><em>dibangun.</em></h2></div><p className="section-intro">Dua proyek yang menggabungkan analisis kebutuhan, implementasi, dan perhatian pada detail kecil.</p></div><div className="project-grid">{projects.map((project) => <article className="card project-card" key={project.title}><div className="project-image"><Image src={project.image} alt={`Screenshot ${project.title}`} fill sizes="(max-width: 640px) 100vw, 50vw" /><span className="project-index">{project.number}</span></div><div className="project-content"><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><div className="project-links"><a href={project.demo} target="_blank" rel="noreferrer">Live site <Arrow /></a><a href={project.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a></div></div></article>)}</div></div></section>

        <section className="section" id="skills"><div className="container"><div className="section-heading"><div><p className="section-kicker">03 / My toolkit</p><h2>Alat untuk<br /><em>beresin masalah.</em></h2></div></div><div className="skills-grid">{skillGroups.map((group) => <article className={`card skill-card ${group.color}`} key={group.title}><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div></div></section>

        <section className="section" id="experience"><div className="container"><div className="section-heading"><div><p className="section-kicker">04 / Experience</p><h2>Perjalanan<br /><em>sejauh ini.</em></h2></div></div><div className="timeline">{experiences.map((experience) => <div className="timeline-item" key={experience.company}><span className="timeline-dot" /><article className="card timeline-card"><div className="timeline-meta"><span>{experience.date}</span><span>JAKARTA, ID</span></div><h3>{experience.role}</h3><p>{experience.company}</p><ul><li>{experience.body}</li><li>Kolaborasi, dokumentasi sistem, dan pengembangan antarmuka responsif.</li></ul></article></div>)}</div></div></section>

        <section className="section contact" id="contact"><div className="container"><div className="contact-box"><div><p className="section-kicker">05 / Mari ngobrol</p><h2>Punya ide?<br />Saya siap <em>mendengar.</em></h2><p className="contact-copy">Sedang mencari web developer, IT support, atau sekadar ingin bertukar cerita soal sistem? Kirim pesan. Saya akan membalas secepatnya.</p></div><div className="contact-actions"><a className="button" href="mailto:rizkiarbi65@gmail.com">Email saya <Arrow /></a><a className="button" href="https://linkedin.com/in/rizkiarbiansyah" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a className="button" href="https://github.com/greedykid" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-inner"><span>© 2026 Rizki Arbiansyah. Dibuat dengan niat baik.</span><div className="footer-links"><a href="https://github.com/greedykid" target="_blank" rel="noreferrer">GitHub</a><a href="https://instagram.com/rizkiarbi_" target="_blank" rel="noreferrer">Instagram</a><a href="mailto:rizkiarbi65@gmail.com">Email</a></div></div></footer>
    </div>
  );
}
