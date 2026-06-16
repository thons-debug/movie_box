'use client';
// Rating badge component with color-coded display
// Demonstrates: Conditional styling based on data values
// Color coding: green (7+), yellow (5–7), red (<5)

import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export default function RatingBadge({
  rating,
  size = 'md',
  showNumber = true
}: RatingBadgeProps) {
  // Determine color based on rating value
  const getColor = (vote: number) => {
    if (vote >= 7) return 'text-green-400 border-green-400';
    if (vote >= 5) return 'text-yellow-400 border-yellow-400';
    return 'text-red-400 border-red-400';
  };

  // Size configurations
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div
      className={`${sizes[size]} ${getColor(rating)} border-2 rounded-full flex flex-col items-center justify-center bg-gray-900/90`}
    >
      <Star className={`${iconSizes[size]} fill-current`} />
      {showNumber && (
        <span className="font-bold leading-none mt-0.5">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
