'use client';
// Navigation component with sticky positioning
// Demonstrates: Client-side navigation with Next.js Link

import Link from 'next/link';
import { Film, Search, Bookmark } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';

export default function Navbar() {
  const { count, isLoaded } = useWatchlist();

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Film className="w-8 h-8 text-red-500 group-hover:text-red-400 transition-colors" />
            <span className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors">
              MovieBox
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {/* Search Link */}
            <Link
              href="/search"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Search</span>
            </Link>

            {/* Watchlist Link with Badge */}
            <Link
              href="/watchlist"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors relative"
            >
              <Bookmark className="w-5 h-5" />
              <span className="hidden sm:inline">Watchlist</span>
              {/* Count badge - shows number of saved movies */}
              {isLoaded && count > 0 && (
                <span className="absolute -top-2 -right-2 sm:relative sm:top-0 sm:right-0 sm:ml-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
