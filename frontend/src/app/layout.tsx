import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import CursorGlow from '../components/CursorGlow';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yasirunimsara.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Yasiru Nimsara | Full Stack Software Engineer',
    template: '%s | Yasiru Nimsara',
  },
  description:
    'Official portfolio of T. K. Yasiru Nimsara - Full Stack Software Engineer from Sri Lanka. Specializing in React, Next.js, Django, Nest.js, TypeScript, and modern cloud technologies.',
  keywords: [
    'Yasiru Nimsara',
    'T. K. Yasiru Nimsara',
    'Yasiru Nimsara Software Engineer',
    'Yasiru Nimsara Portfolio',
    'Yasiru Nimsara Developer',
    'Software Engineer Sri Lanka',
    'Full Stack Developer Sri Lanka',
    'React Developer Sri Lanka',
    'Next.js Developer',
    'Nest.js Developer',
    'Django Developer Sri Lanka',
    'Matara Software Engineer',
  ],
  authors: [{ name: 'Yasiru Nimsara', url: siteUrl }],
  creator: 'Yasiru Nimsara',
  publisher: 'Yasiru Nimsara',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Yasiru Nimsara | Full Stack Software Engineer',
    description:
      'Explore projects, skills, and experience of Yasiru Nimsara, Full Stack Software Engineer specializing in Next.js, React, Nest.js, and Django.',
    siteName: 'Yasiru Nimsara Portfolio',
    images: [
      {
        url: '/avatar.jpg',
        width: 800,
        height: 800,
        alt: 'Yasiru Nimsara - Full Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yasiru Nimsara | Full Stack Software Engineer',
    description:
      'Official portfolio of T. K. Yasiru Nimsara - Full Stack Software Engineer specializing in React, Next.js, Nest.js, and Django.',
    images: ['/avatar.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yasiru Nimsara',
    alternateName: ['T. K. Yasiru Nimsara', 'Yasiru'],
    jobTitle: 'Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer specializing in React, Next.js, Django, Nest.js, and cloud technologies.',
    url: siteUrl,
    image: `${siteUrl}/avatar.jpg`,
    sameAs: [
      'https://github.com/Yazi0',
      'https://github.com/yasirunimsara200m-sys',
      'https://www.linkedin.com/in/yasiru-nimsara/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Matara',
      addressCountry: 'Sri Lanka',
    },
    knowsAbout: [
      'Full Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'Nest.js',
      'Django',
      'Python',
      'PostgreSQL',
      'Software Engineering',
      'Cloudflare',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yasiru Nimsara Portfolio',
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Yasiru Nimsara',
    },
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-indigo-500/30 selection:text-indigo-400">
        <ThemeProvider>
          <CursorGlow />
          <div className="fixed inset-0 bg-grid pointer-events-none z-0"></div>
          {/* Ambient colored glowing blurs */}
          <div className="fixed top-[-10rem] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="fixed bottom-[-10rem] right-[-5rem] w-[500px] h-[400px] bg-cyan-600/10 dark:bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
