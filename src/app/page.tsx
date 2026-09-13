'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
  { date: '2026: SEKARANG', role: 'Pengembang Web', company: 'Website Katalog Digital “Berkah Mulia”', body: 'Membangun dan mendeploy katalog digital aktif, merancang kategori bertingkat, serta menjaga performa dan responsivitas di berbagai perangkat.' },
  { date: '2025: 2026', role: 'Pengembang Web & Peneliti', company: 'Platform E-Commerce “GEGARES”', body: 'Mengembangkan aplikasi e-commerce sebagai proyek Penulisan Ilmiah Universitas Gunadarma dengan arsitektur Laravel MVC dan database MySQL.' },
];

const faqItems = [
  { question: 'Apa yang biasanya saya kerjakan?', answer: 'Saya mengembangkan website dan sistem berbasis Laravel, MySQL, dan Tailwind CSS. Saya juga membantu troubleshooting hardware/software, instalasi sistem operasi, serta konektivitas dasar LAN dan Wi-Fi.' },
  { question: 'Bagaimana cara memulai kolaborasi?', answer: 'Kirim email dengan konteks singkat tentang kebutuhan, target, dan tenggat waktu. Dari sana kita bisa menyamakan ruang lingkup dan menentukan langkah teknis yang paling masuk akal.' },
  { question: 'Apakah ada proyek yang bisa langsung dilihat?', answer: 'Ada. GEGARES dan Berkah Mulia tersedia sebagai live site di bagian Karya, lengkap dengan tautan untuk melihat implementasi dan repositori yang terkait.' },
  { question: 'Apa yang dibagikan di GitHub?', answer: 'Bagian GitHub menampilkan aktivitas kontribusi publik akun greedykid dalam rentang satu tahun berjalan. Kotak pada kalender dapat dipilih untuk melihat tanggal dan jumlah kontribusinya.' },
];

const stackTools = [
  'PHP',
  'Laravel',
  'MySQL',
  'Tailwind CSS',
  'JavaScript',
  'Git & GitHub',
  'Postman',
  'Docker',
  'Figma',
  'Windows / Linux',
];

type Contribution = {
  date: string;
  count: number;
  level: number;
};

function formatContributionDate(date: string) {
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(`${date}T00:00:00`));
}

function dateKey(date: Date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

function buildContributionWeeks(contributions: Contribution[]) {
  if (!contributions.length) return [] as (Contribution | null)[][];

  const leadingEmptyDays = new Date(`${contributions[0].date}T00:00:00`).getDay();
  const cells: (Contribution | null)[] = [
    ...Array.from({ length: leadingEmptyDays }, () => null),
    ...contributions,
  ];
  const weeks: (Contribution | null)[][] = [];

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return weeks;
}

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [githubContributions, setGithubContributions] = useState<Contribution[]>([]);
  const [githubChartLoading, setGithubChartLoading] = useState(true);
  const [githubChartError, setGithubChartError] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>('.site-shell');
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    shell?.classList.add('motion-ready');

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://github-contributions-api.jogruber.de/v4/greedykid', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('GitHub contribution request failed');
        const payload = (await response.json()) as { contributions?: Contribution[] };
        if (!payload.contributions?.length) throw new Error('No GitHub contributions found');
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 364);
        const startKey = dateKey(startDate);
        const endKey = dateKey(endDate);
        const rollingContributions = payload.contributions
          .filter((contribution) => contribution.date >= startKey && contribution.date <= endKey)
          .sort((a, b) => a.date.localeCompare(b.date));

        if (!rollingContributions.length) throw new Error('No rolling GitHub contributions found');
        setGithubContributions(rollingContributions);
        setSelectedContribution(rollingContributions[rollingContributions.length - 1]);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setGithubChartError(true);
      })
      .finally(() => setGithubChartLoading(false));

    return () => controller.abort();
  }, []);

  const contributionWeeks = buildContributionWeeks(githubContributions);
  const monthFormatter = new Intl.DateTimeFormat('id-ID', { month: 'short' });
  const monthMarkers = contributionWeeks.map((week, weekIndex) => {
    const firstContribution = week.find((contribution): contribution is Contribution => contribution !== null);
    const previousContribution = contributionWeeks[weekIndex - 1]?.find((contribution): contribution is Contribution => contribution !== null);

    if (!firstContribution || (previousContribution && new Date(`${previousContribution.date}T00:00:00`).getMonth() === new Date(`${firstContribution.date}T00:00:00`).getMonth())) {
      return null;
    }

    return { weekIndex, label: monthFormatter.format(new Date(`${firstContribution.date}T00:00:00`)) };
  });

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}><span className="brand-mark">R</span><span>RIZKI ARBI.</span></a>
          <nav id="mobile-navigation" className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Navigasi utama">
            <a href="#about" onClick={() => setMenuOpen(false)}>Tentang</a>
            <a href="#work" onClick={() => setMenuOpen(false)}>Karya</a>
            <a href="#github" onClick={() => setMenuOpen(false)}>GitHub</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Keahlian</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Kontak</a>
          </nav>
          <button className={`menu-button ${menuOpen ? 'is-open' : ''}`} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation"><span className="menu-icon" aria-hidden="true"><i /><i /><i /></span><span>{menuOpen ? 'TUTUP' : 'MENU'}</span></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div data-reveal="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> OPEN TO WORK · JAKARTA</div>
              <h1>HALO, SAYA <span>RIZKI.</span></h1>
              <p className="hero-copy">Web Developer &amp; IT Support yang suka mengubah kebutuhan yang rumit menjadi sistem digital yang rapi, berguna, dan siap dipakai.</p>
              <div className="hero-actions">
                <Button asChild><a href="#work">Lihat karya</a></Button>
                <Button asChild variant="neutral"><a href="/cv-rizki-arbiansyah.pdf" target="_blank" rel="noreferrer">Lihat CV <Arrow /></a></Button>
              </div>
              <p className="hero-note">Saat ini berbasis di <a href="https://maps.google.com/?q=Jakarta+Barat" target="_blank" rel="noreferrer">Jakarta Barat, Indonesia</a>.</p>
            </div>
            <div className="hero-card" data-reveal="hero-card">
              <div className="photo-frame"><Image src="/images/profile-photo.png" alt="Rizki Arbiansyah" fill priority sizes="(max-width: 900px) 500px, 460px" /></div>
              <div className="hero-card-footer"><div><strong>WEB DEV.</strong><small>IT SUPPORT. SYSTEM THINKER.</small></div></div>
            </div>
          </div>
        </section>

        <div className="ticker" data-reveal="ticker" aria-label="Stack dan tools yang digunakan"><p className="sr-only">Stack dan tools yang digunakan: {stackTools.join(', ')}.</p><div className="ticker-track" aria-hidden="true">{[0, 1].map((copy) => <div className="ticker-group" key={copy}>{stackTools.map((tool) => <span className="ticker-item" key={`${copy}-${tool}`}><b>+</b>{tool}</span>)}</div>)}</div></div>

        <section className="section" id="about" data-reveal="section">
          <div className="container">
            <div className="section-heading"><div><p className="section-kicker">01 / Sedikit tentang saya</p><h2>Bukan cuma<br />bikin <em>bagus.</em></h2></div><p className="section-intro">Saya percaya software yang baik harus mudah dipahami, mudah dirawat, dan benar-benar membantu orang yang memakainya.</p></div>
            <div className="about-grid" data-reveal="content">
              <div><span className="about-sticker">CURIOUS<br />BY DEFAULT.</span><div className="quote">“The only way to do great work is to love what you do.”<cite>Steve Jobs</cite></div></div>
              <div className="about-copy"><p>Saya adalah lulusan S1 Sistem Informasi Universitas Gunadarma dengan IPK 3.58 / 4.00. Fokus saya ada di pengembangan web berbasis Laravel, MySQL, dan Tailwind CSS, sekaligus memastikan sisi teknis di baliknya berjalan baik.</p><p>Saya juga nyaman mengerjakan troubleshooting hardware/software, instalasi Windows/Linux, pemeliharaan PC &amp; printer, serta konektivitas dasar LAN/Wi-Fi. Buat saya, memahami konteks masalah sama pentingnya dengan menulis kodenya.</p></div>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Bukti dan capaian" data-reveal="section"><div className="container stats-grid"><a className="card stat" data-reveal="card" href="/cv-rizki-arbiansyah.pdf" target="_blank" rel="noreferrer" aria-label="Buka CV untuk melihat IPK"><span className="stat-number">3.58</span><span className="stat-label">IPK S1 Sistem Informasi · lihat CV</span></a><a className="card stat" data-reveal="card" href="/cv-rizki-arbiansyah.pdf" target="_blank" rel="noreferrer" aria-label="Buka CV untuk melihat sertifikasi"><span className="stat-number">08</span><span className="stat-label">Sertifikat &amp; pelatihan tercatat · lihat CV</span></a><a className="card stat" data-reveal="card" href="#work" aria-label="Lihat dua proyek live"><span className="stat-number">02</span><span className="stat-label">Proyek live yang ditampilkan di bawah</span></a><a className="card stat" data-reveal="card" href="/cv-rizki-arbiansyah.pdf" target="_blank" rel="noreferrer" aria-label="Buka CV untuk melihat tahun kelulusan"><span className="stat-number">2026</span><span className="stat-label">Tahun lulus sarjana · lihat CV</span></a></div></section>

        <section className="section" id="work" data-reveal="section"><div className="container"><div className="section-heading"><div><p className="section-kicker">02 / Selected work</p><h2>Yang sudah<br /><em>dibangun.</em></h2></div><p className="section-intro">Dua proyek yang menggabungkan analisis kebutuhan, implementasi, dan perhatian pada detail kecil.</p></div><div className="project-grid">{projects.map((project) => <article className="card project-card" data-reveal="card" key={project.title}><div className="project-image"><Image src={project.image} alt={`Screenshot ${project.title}`} fill sizes="(max-width: 640px) 100vw, 50vw" /><span className="project-index">{project.number}</span></div><div className="project-content"><Badge variant="main" className="project-category">{project.category}</Badge><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <Badge variant="neutral" className="tag" key={tag}>{tag}</Badge>)}</div><div className="project-links"><a href={project.demo} target="_blank" rel="noreferrer">Live site <Arrow /></a><a href={project.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a></div></div></article>)}</div></div></section>

        <section className="section github-section" id="github" data-reveal="section"><div className="container"><div className="section-heading"><div><p className="section-kicker">03 / Open source activity</p><h2>Kode yang<br /><em>terus bergerak.</em></h2></div><p className="section-intro">Aktivitas kontribusi publik saya di GitHub, diperbarui mengikuti kalender kontribusi akun.</p></div><div className="github-layout"><div className="github-copy" data-reveal="content"><p>Selain mengerjakan project, saya menggunakan GitHub untuk menyimpan, merawat, dan membagikan proses pengembangan.</p><Button asChild><a href="https://github.com/greedykid" target="_blank" rel="noreferrer">Buka profil GitHub <Arrow /></a></Button></div><div className={`card github-chart-shell ${githubChartLoading ? 'is-loading' : ''} ${githubChartError ? 'is-error' : ''}`} data-reveal="content"><p className="github-chart-label">PUBLIC CONTRIBUTIONS / GREEDYKID</p>{githubChartLoading && <Alert variant="info" className="chart-loading" role="status" aria-live="polite">Memuat aktivitas publik GitHub...</Alert>}{!githubChartLoading && !githubChartError && <><div className="github-calendar-scroll"><div className="github-calendar"><div className="github-months" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${contributionWeeks.length}, 14px)` }}>{monthMarkers.map((marker) => marker && <span key={marker.weekIndex} style={{ gridColumn: marker.weekIndex + 1 }}>{marker.label}</span>)}</div><div className="github-day-labels" aria-hidden="true"><span /><span>Sen</span><span /><span>Rab</span><span /><span>Jum</span><span /></div><div className="github-grid" role="group" aria-label="Kalender kontribusi publik GitHub">{contributionWeeks.map((week, weekIndex) => <div className="github-week" key={`week-${weekIndex}`}>{Array.from({ length: 7 }, (_, dayIndex) => { const contribution = week[dayIndex] ?? null; return contribution ? <button className={`github-cell level-${contribution.level}`} type="button" key={contribution.date} aria-label={`${formatContributionDate(contribution.date)}, ${contribution.count} kontribusi`} aria-pressed={selectedContribution?.date === contribution.date} onClick={() => setSelectedContribution(contribution)} title={`${formatContributionDate(contribution.date)}: ${contribution.count} kontribusi`} /> : <span className="github-cell github-cell-empty" aria-hidden="true" key={`empty-${weekIndex}-${dayIndex}`} />; })}</div>)}</div></div></div><div className="github-detail" aria-live="polite">{selectedContribution ? <><strong>{selectedContribution.count} kontribusi</strong> pada {formatContributionDate(selectedContribution.date)}.</> : 'Ketuk salah satu kotak untuk melihat detail kontribusi.'}</div><p className="github-grid-hint">Rentang 1 tahun sampai hari ini. Ketuk kotak untuk melihat tanggal dan jumlah kontribusi.</p></>}{githubChartError && <Alert variant="error" className="chart-error" role="alert">Data kontribusi sedang tidak tersedia. <a href="https://github.com/greedykid" target="_blank" rel="noreferrer">Lihat aktivitas langsung di GitHub.</a></Alert>}</div></div></div></section>

        <section className="section" id="skills" data-reveal="section"><div className="container"><div className="section-heading"><div><p className="section-kicker">04 / My toolkit</p><h2>Alat untuk<br /><em>beresin masalah.</em></h2></div></div><div className="skills-grid">{skillGroups.map((group) => <article className={`card skill-card ${group.color}`} data-reveal="card" key={group.title}><Badge variant="outline" className="skill-badge">{group.title}</Badge><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div></div></section>

        <section className="section" id="experience" data-reveal="section"><div className="container"><div className="section-heading"><div><p className="section-kicker">05 / Experience</p><h2>Perjalanan<br /><em>sejauh ini.</em></h2></div></div><div className="timeline">{experiences.map((experience) => <div className="timeline-item" data-reveal="card" key={experience.company}><span className="timeline-dot" /><article className="card timeline-card"><div className="timeline-meta"><span>{experience.date}</span><span>JAKARTA, ID</span></div><h3>{experience.role}</h3><p>{experience.company}</p><ul><li>{experience.body}</li><li>Kolaborasi, dokumentasi sistem, dan pengembangan antarmuka responsif.</li></ul></article></div>)}</div></div></section>

        <section className="section faq-section" id="faq" data-reveal="section"><div className="container"><div className="section-heading"><div><p className="section-kicker">06 / Sebelum mulai</p><h2>Yang sering<br /><em>ditanyakan.</em></h2></div><p className="section-intro">Jawaban singkat tentang fokus kerja, cara memulai, dan bukti yang bisa langsung diperiksa.</p></div><div className="faq-layout"><div className="faq-stamp" aria-hidden="true">READ<br />THIS<br />FIRST.</div><Accordion type="single" collapsible className="faq-accordion">{faqItems.map((item, index) => <AccordionItem value={`faq-${index + 1}`} key={item.question}><AccordionTrigger>{item.question}</AccordionTrigger><AccordionContent>{item.answer}</AccordionContent></AccordionItem>)}</Accordion></div></div></section>

        <section className="section contact" id="contact" data-reveal="section"><div className="container"><div className="contact-box" data-reveal="content"><div><p className="section-kicker">07 / Mari ngobrol</p><h2>Punya ide?<br />Saya siap <em>mendengar.</em></h2><p className="contact-copy">Sedang mencari web developer, IT support, atau sekadar ingin bertukar cerita soal sistem? Kirim pesan. Saya akan membalas secepatnya.</p></div><div className="contact-actions"><Button asChild variant="neutral"><a href="mailto:rizkiarbi65@gmail.com">Email saya <Arrow /></a></Button><Button asChild variant="neutral"><a href="https://linkedin.com/in/rizkiarbiansyah" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></Button><Button asChild><a href="https://github.com/greedykid" target="_blank" rel="noreferrer">GitHub <Arrow /></a></Button></div></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-inner"><span>© 2026 Rizki Arbiansyah. Dibuat dengan niat baik.</span><div className="footer-links"><a href="https://github.com/greedykid" target="_blank" rel="noreferrer">GitHub</a><a href="https://instagram.com/rizkiarbi_" target="_blank" rel="noreferrer">Instagram</a><a href="mailto:rizkiarbi65@gmail.com">Email</a></div></div></footer>
    </div>
  );
}
