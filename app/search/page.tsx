'use client';
// Search Page - Client-side search with debouncing
// Demonstrates: useEffect + useState for client-side data fetching
// Demonstrates: URL query parameter handling with useSearchParams

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon, Film } from 'lucide-react';
import { searchMovies, type Movie } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Fetch movies when query changes (debounced)
  useEffect(() => {
    // Debounce search by 300ms
    const debounceTimer = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const results = await searchMovies(query);
          setMovies(results);
          setSearched(true);
        } catch (error) {
          console.error('Search failed:', error);
          setMovies([]);
        } finally {
          setLoading(false);
        }
      } else {
        setMovies([]);
        setSearched(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <SearchIcon className="w-8 h-8 text-red-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Search Movies
          </h1>
        </div>
        <p className="text-gray-400 text-sm">
          Find your next favorite film
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
          />
        </div>
      </div>

      {/* Results Section */}
      {loading ? (
        <MovieCardSkeleton />
      ) : searched && movies.length === 0 ? (
        // No results state
        <div className="text-center py-16">
          <Film className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            No movies found
          </h2>
          <p className="text-gray-400">
            Try searching for a different title
          </p>
        </div>
      ) : movies.length > 0 ? (
        <>
          <p className="text-gray-400 text-sm mb-4">
            Found {movies.length} result{movies.length !== 1 ? 's' : ''} for "{query}"
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      ) : (
        // Initial state - no search yet
        <div className="text-center py-16">
          <SearchIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Start searching
          </h2>
          <p className="text-gray-400">
            Enter a movie title to find results
          </p>
        </div>
      )}
    </div>
  );
}
