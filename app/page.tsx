// Home Page - Trending Movies
// Demonstrates: Server Component data fetching with async/await
// This is rendered on the server for better SEO and performance

import { getTrendingMovies } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import { Suspense } from 'react';
import { TrendingUp, Film, AlertCircle } from 'lucide-react';

// Server Component - fetches data on the server
// The async keyword allows using await directly in the component
async function TrendingMovies() {
  const movies = await getTrendingMovies();

  // Show empty state if no movies returned (API key issue)
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Unable to Load Movies
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Please check that your TMDB API key is configured correctly in .env.local
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="w-8 h-8 text-red-500" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Trending This Week
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Discover the most popular movies right now
          </p>
        </div>
      </div>

      {/* Movie Grid with Loading State */}
      {/* Suspense shows skeleton while data loads */}
      <Suspense fallback={<MovieCardSkeleton />}>
        <TrendingMovies />
      </Suspense>
    </div>
  );
}
