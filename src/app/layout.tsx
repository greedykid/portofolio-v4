import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rizkiarbiansyah.vercel.app'),
  title: 'Rizki Arbiansyah: Web Developer & IT Support',
  description: 'Portfolio Rizki Arbiansyah, Web Developer dan IT Support dari Jakarta Barat.',
  keywords: ['Rizki Arbiansyah', 'Web Developer', 'IT Support', 'Laravel', 'MySQL', 'Next.js'],
  authors: [{ name: 'Rizki Arbiansyah' }],
  openGraph: {
    title: 'Rizki Arbiansyah: Web Developer & IT Support',
    description: 'Membangun sistem digital yang rapi, berguna, dan siap dipakai.',
    url: 'https://rizkiarbiansyah.vercel.app',
    siteName: 'Rizki Arbiansyah',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
