import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'K-Patrol | Robot Tuần Tra Thông Minh',
  description: 'Hệ sinh thái Robot tuần tra thông minh tích hợp AIoT. Giám sát an ninh 24/7 với công nghệ AI tiên tiến.',
  keywords: ['robot', 'tuần tra', 'an ninh', 'AIoT', 'giám sát', 'thông minh'],
  authors: [{ name: 'K-Patrol Team' }],
  openGraph: {
    title: 'K-Patrol | Robot Tuần Tra Thông Minh',
    description: 'Hệ sinh thái Robot tuần tra thông minh tích hợp AIoT',
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
    <html lang="vi">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
