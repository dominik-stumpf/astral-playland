import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  applicationName: 'astral-playland',
  title: {
    default: 'astral-playland',
    template: 'astral-playland',
  },
  description: 'three.js app showcasing the universe',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'astral-playland',
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'astral-playground',
    url: 'https://astral-playland.vercel.app/',
    title: {
      default: 'astral-playland',
      template: 'astral-playland',
    },
    description: 'three.js app showcasing the universe',
  },
  twitter: {
    card: 'summary',
    title: {
      default: 'astral-playland',
      template: 'astral-playland',
    },
    description: 'three.js app showcasing the universe',
  },
  robots: {
    follow: true,
    index: true,
  },
  metadataBase: new URL('https://astral-playland.vercel.app/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
