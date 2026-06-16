'use client';
// Watchlist button component
// Demonstrates: Interactive button with state management

import { Bookmark, BookmarkPlus } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import type { WatchlistMovie } from '@/hooks/useWatchlist';

interface WatchlistButtonProps {
  movie: WatchlistMovie;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function WatchlistButton({
  movie,
  size = 'md',
  showLabel = true
}: WatchlistButtonProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, isLoaded } =
    useWatchlist();
  const isSaved = isInWatchlist(movie.id);

  const handleToggle = () => {
    if (isSaved) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  if (!isLoaded) {
    return (
      <div className={`${sizes[size]} rounded-lg bg-gray-700 animate-pulse`}>
        &nbsp;
      </div>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`${sizes[size]} flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ${
        isSaved
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white'
      }`}
    >
      {isSaved ? (
        <>
          <Bookmark className={`${iconSizes[size]} fill-current`} />
          {showLabel && <span>Remove from Watchlist</span>}
        </>
      ) : (
        <>
          <BookmarkPlus className={iconSizes[size]} />
          {showLabel && <span>Add to Watchlist</span>}
        </>
      )}
    </button>
  );
}
