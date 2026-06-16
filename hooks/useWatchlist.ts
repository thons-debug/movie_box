'use client';
// Custom hook for watchlist management
// Demonstrates: useEffect + useState for client-side data fetching
// Demonstrates: localStorage persistence across page refreshes

import { useState, useEffect, useCallback } from 'react';

export interface WatchlistMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

const WATCHLIST_KEY = 'movie_watchlist';

export function useWatchlist() {
  // Initialize state from localStorage on mount
  // Using lazy initialization to avoid SSR issues
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load watchlist from localStorage on initial mount
  // useEffect runs only on client-side, ensuring localStorage is available
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_KEY);
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load watchlist:', error);
    }
    setIsLoaded(true);
  }, []);

  // Persist watchlist to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      } catch (error) {
        console.error('Failed to save watchlist:', error);
      }
    }
  }, [watchlist, isLoaded]);

  const addToWatchlist = useCallback((movie: WatchlistMovie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  }, []);

  const isInWatchlist = useCallback(
    (movieId: number) => watchlist.some((m) => m.id === movieId),
    [watchlist]
  );

  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
  }, []);

  return {
    watchlist,
    isLoaded,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist,
    count: watchlist.length
  };
}
