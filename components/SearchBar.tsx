'use client';
// Search bar component with debouncing
// Demonstrates: useEffect for debouncing user input

import { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  initialValue?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  initialValue = '',
  onSearch,
  placeholder = 'Search for movies...'
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  // Debounce search input (300ms delay)
  // This prevents excessive API calls while typing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (onSearch) {
        onSearch(query);
      } else if (query.trim()) {
        // Navigate to search page with query
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }, 300);

    // Cleanup timer on each keystroke - this is the debounce pattern
    return () => clearTimeout(debounceTimer);
  }, [query, onSearch, router]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
