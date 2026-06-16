import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MovieBox - Discover Your Next Favorite Movie',
  description: 'Explore trending movies, search for films, and build your personal watchlist',
  openGraph: {
    title: 'MovieBox - Discover Your Next Favorite Movie',
    description: 'Explore trending movies, search for films, and build your personal watchlist',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MovieBox - Discover Your Next Favorite Movie',
    description: 'Explore trending movies, search for films, and build your personal watchlist',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </body>
    </html>
  );
}
