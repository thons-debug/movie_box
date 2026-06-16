'use client';
// Movie card component with hover effects
// Demonstrates: Responsive grid layout usage and image optimization

import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import RatingBadge from './RatingBadge';
import type { Movie } from '@/lib/tmdb';
import { placeholderImage } from '@/lib/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : placeholderImage;

  const releaseYear = movie.release_date?.split('-')[0] || 'N/A';

  return (
    <Link href={`/movie/${movie.id}`} className="group block">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
        {/* Movie Poster */}
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge - positioned at top-right */}
        <div className="absolute top-2 right-2 z-10">
          <RatingBadge rating={movie.vote_average} size="sm" />
        </div>

        {/* Movie Info - appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Calendar className="w-3 h-3" />
            <span>{releaseYear}</span>
          </div>
        </div>
      </div>

      {/* Always visible title below card */}
      <h3 className="text-white font-medium text-sm mt-2 line-clamp-1 group-hover:text-red-400 transition-colors">
        {movie.title}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-gray-400 text-xs">{releaseYear}</span>
        <span className="text-gray-600">●</span>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-gray-400 text-xs">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
