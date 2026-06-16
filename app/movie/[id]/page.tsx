// Movie Detail Page - Dynamic Route
// Demonstrates: Dynamic routes with [id] parameter in Next.js App Router
// This is a Server Component that fetches data based on URL params

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Globe, DollarSign } from 'lucide-react';
import { getMovieDetails, placeholderImage } from '@/lib/tmdb';
import RatingBadge from '@/components/RatingBadge';
import WatchlistButton from '@/components/WatchlistButton';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

// Server Component - fetches movie details on the server
// The params contain the dynamic [id] from the URL
export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;

  const movie = await getMovieDetails(id);

  // Movie not found - show 404 page
  if (!movie) {
    notFound();
  }

  const backdropUrl = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : null;

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : placeholderImage;

    const releaseYear = movie.release_date?.split('-')[0] || 'N/A';

    // Format runtime to hours and minutes
    const formatRuntime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    };

    // Format currency values
    const formatCurrency = (value: number) => {
      if (!value) return 'N/A';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    };

    return (
      <div className="min-h-screen">
        {/* Backdrop Image */}
        {backdropUrl && (
          <div className="relative w-full h-[40vh] md:h-[50vh]">
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to movies</span>
          </Link>

          {/* Movie Info Section */}
          <div className="flex flex-col md:flex-row gap-8 -mt-32 relative z-10">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div className="relative w-48 md:w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl mx-auto md:mx-0">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 192px, 256px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Movie Details */}
            <div className="flex-grow md:pt-32">
              {/* Title and Tagline */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-gray-400 italic mb-4">&quot;{movie.tagline}&quot;</p>
              )}

              {/* Rating Badge */}
              <div className="mb-6">
                <RatingBadge rating={movie.vote_average} size="lg" />
              </div>

              {/* Genres */}
              {movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-2">Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Release Date */}
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Release Date</span>
                  </div>
                  <p className="text-white font-medium">{movie.release_date || 'N/A'}</p>
                </div>

                {/* Runtime */}
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Runtime</span>
                  </div>
                  <p className="text-white font-medium">
                    {movie.runtime ? formatRuntime(movie.runtime) : 'N/A'}
                  </p>
                </div>

                {/* Language */}
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Globe className="w-4 h-4" />
                    <span>Language</span>
                  </div>
                  <p className="text-white font-medium uppercase">
                    {movie.original_language || 'N/A'}
                  </p>
                </div>

                {/* Budget */}
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Budget</span>
                  </div>
                  <p className="text-white font-medium">
                    {formatCurrency(movie.budget)}
                  </p>
                </div>
              </div>

              {/* Watchlist Button */}
              <WatchlistButton
                movie={{
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                  vote_average: movie.vote_average,
                  release_date: movie.release_date
                }}
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: MovieDetailPageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return {
      title: 'Movie Not Found - MovieBox',
    };
  }

  return {
    title: `${movie.title} - MovieBox`,
    description: movie.overview,
  };
}
