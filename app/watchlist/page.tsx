'use client';
// Watchlist Page - Displays saved movies
// Demonstrates: localStorage persistence across page refreshes
// Uses the custom useWatchlist hook for state management

import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Trash2, Film } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import RatingBadge from '@/components/RatingBadge';
import { placeholderImage } from '@/lib/tmdb';

export default function WatchlistPage() {
  const { watchlist, isLoaded, removeFromWatchlist, clearWatchlist } = useWatchlist();

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-40 bg-gray-800 rounded mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-red-500 fill-red-500" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              My Watchlist
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>

        {/* Clear All Button */}
        {watchlist.length > 0 && (
          <button
            onClick={clearWatchlist}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        )}
      </div>

      {/* Watchlist Content */}
      {watchlist.length === 0 ? (
        // Empty state
        <div className="text-center py-16">
          <Film className="w-20 h-20 text-gray-700 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-400 mb-6">
            Start adding movies to keep track of what you want to watch
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <span>Discover Trending Movies</span>
          </Link>
        </div>
      ) : (
        // Movie Grid
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {watchlist.map((movie) => {
            const posterUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : placeholderImage;

            const releaseYear = movie.release_date?.split('-')[0] || 'N/A';

            return (
              <div key={movie.id} className="relative group">
                {/* Movie Card */}
                <Link href={`/movie/${movie.id}`} className="block">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                    <Image
                      src={posterUrl}
                      alt={movie.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Rating badge */}
                    <div className="absolute top-2 right-2 z-10">
                      <RatingBadge rating={movie.vote_average} size="sm" />
                    </div>
                  </div>
                  <h3 className="text-white font-medium text-sm mt-2 line-clamp-1 group-hover:text-red-400 transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 text-xs">{releaseYear}</span>
                  </div>
                </Link>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromWatchlist(movie.id);
                  }}
                  className="absolute top-2 left-2 p-1.5 bg-gray-900/80 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 z-20"
                  aria-label="Remove from watchlist"
                >
                  <Trash2 className="w-3 h-3 text-white" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
