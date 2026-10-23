import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import CursorGlow from '../components/CursorGlow';

export const metadata: Metadata = {
  title: 'Yasiru Nimsara | Full Stack Software Engineer',
  description: 'Portfolio of T. K. Yasiru Nimsara - Full Stack Software Engineer specializing in React, Next.js, Django, Nest.js, and modern cloud technologies.',
  keywords: ['Yasiru Nimsara', 'Software Engineer', 'Full Stack Developer', 'React', 'Next.js', 'Nest.js', 'Django', 'Sri Lanka'],
  authors: [{ name: 'Yasiru Nimsara' }],
  openGraph: {
    title: 'Yasiru Nimsara | Full Stack Software Engineer',
    description: 'Explore the full-stack web applications, tech expertise, and engineering projects of Yasiru Nimsara.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
