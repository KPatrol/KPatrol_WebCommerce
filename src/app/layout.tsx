import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/Toaster';
import { LiveChatWidget } from '@/components/features/LiveChatWidget';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'K-Patrol | Smart Security Patrol Robot',
  description: 'Smart patrol robot ecosystem integrated with AIoT. 24/7 security monitoring with advanced AI technology.',
  keywords: ['robot', 'patrol', 'security', 'AIoT', 'surveillance', 'smart'],
  authors: [{ name: 'K-Patrol Team' }],
  openGraph: {
    title: 'K-Patrol | Smart Security Patrol Robot',
    description: 'Smart patrol robot ecosystem integrated with AIoT',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <head>
        <link rel="preconnect" href="https://a.tile.openstreetmap.org" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://b.tile.openstreetmap.org" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://c.tile.openstreetmap.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-slate-950 text-slate-100`}>
        {children}
        <Toaster />
        <LiveChatWidget />
      </body>
    </html>
  );
}
