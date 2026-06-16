import MovieCardSkeleton from '@/components/MovieCardSkeleton';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header skeleton */}
      <div className="animate-pulse mb-8">
        <div className="h-8 w-48 bg-gray-800 rounded mb-2" />
        <div className="h-4 w-64 bg-gray-800 rounded" />
      </div>
      <MovieCardSkeleton />
    </div>
  );
}
