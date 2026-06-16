import Link from 'next/link';
import { Film, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <Film className="w-24 h-24 text-gray-700 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Movie Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The movie you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>Search Movies</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
