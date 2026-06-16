// Skeleton loader for movie cards
// Demonstrates: Loading state UI pattern

import { Skeleton } from '@/components/ui/skeleton';

interface MovieCardSkeletonProps {
  count?: number;
}

export default function MovieCardSkeleton({ count = 20 }: MovieCardSkeletonProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          {/* Poster skeleton */}
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
            <Skeleton className="absolute inset-0" />
          </div>
          {/* Title skeleton */}
          <Skeleton className="h-4 w-3/4" />
          {/* Subtitle skeleton */}
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}
