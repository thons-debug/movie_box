// TMDB API Configuration
// This file demonstrates how to use fetch() with async/await in Next.js
// API docs: https://developers.themoviedb.org/3

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Check if TMDB API key is configured and not the default placeholder
const isApiKeyConfigured = (): boolean => {
  return !!(API_KEY && API_KEY !== 'your_api_key_here' && API_KEY.trim() !== '');
};

// Image size configurations for different use cases
export const getImageUrl = (path: string | null, size: 'poster' | 'backdrop' | 'profile' = 'poster') => {
  if (!path) return null;
  const sizes = {
    poster: 'w500',
    backdrop: 'w1280',
    profile: 'w185'
  };
  return `${IMAGE_BASE_URL}/${sizes[size]}${path}`;
};

// Placeholder image for missing posters (local SVG data URI to avoid network errors offline)
export const placeholderImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750"><rect width="100%" height="100%" fill="%231f2937"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af">No Image</text></svg>';

/**
 * Generic fetch wrapper with error handling and retry logic
 * Retries up to 3 times on transient network errors (ECONNRESET, etc.)
 */
async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams({
    api_key: API_KEY || '',
    ...params
  });

  const url = `${BASE_URL}${endpoint}?${searchParams}`;
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        // Enable caching for better performance
        next: { revalidate: 3600 } // Revalidate every hour
      });

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      // If it's a non-retryable API error (like 401), throw immediately
      if (error instanceof Error && error.message.startsWith('TMDB API error')) {
        throw error;
      }
      // On transient network errors, retry after a short delay
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 500 * attempt));
        continue;
      }
      throw error;
    }
  }

  throw new Error('fetchTMDB: max retries exceeded');
}

// Movie type definitions
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  original_language: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Shared fallback sample data when TMDB is unavailable or API key is not configured
const sampleMovies: Movie[] = [
  {
    id: 1,
    title: 'Sample Movie: The Beginning',
    poster_path: null,
    backdrop_path: null,
    overview: 'A sample movie used as a fallback when TMDB is unavailable.',
    release_date: '2023-01-01',
    vote_average: 7.5,
    genre_ids: [28, 12],
    popularity: 10,
  },
  {
    id: 2,
    title: 'Sample Movie: Adventure',
    poster_path: null,
    backdrop_path: null,
    overview: 'Another sample fallback movie.',
    release_date: '2022-06-15',
    vote_average: 6.8,
    genre_ids: [12, 35],
    popularity: 8,
  },
  {
    id: 3,
    title: 'Sample Movie: Mystery',
    poster_path: null,
    backdrop_path: null,
    overview: 'A third sample movie to populate the grid.',
    release_date: '2021-11-05',
    vote_average: 8.1,
    genre_ids: [9648, 53],
    popularity: 12,
  },
];

const sampleMovieDetails: Record<string, MovieDetails> = {
  '1': {
    id: 1,
    title: 'Sample Movie: The Beginning',
    poster_path: null,
    backdrop_path: null,
    overview: 'A sample movie used as a fallback when TMDB is unavailable.',
    release_date: '2023-01-01',
    vote_average: 7.5,
    genre_ids: [28, 12],
    popularity: 10,
    runtime: 120,
    genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }],
    tagline: 'Every legend has a beginning.',
    status: 'Released',
    budget: 50000000,
    revenue: 150000000,
    original_language: 'en'
  },
  '2': {
    id: 2,
    title: 'Sample Movie: Adventure',
    poster_path: null,
    backdrop_path: null,
    overview: 'Another sample fallback movie details filled with excitement and thrill.',
    release_date: '2022-06-15',
    vote_average: 6.8,
    genre_ids: [12, 35],
    popularity: 8,
    runtime: 115,
    genres: [{ id: 12, name: 'Adventure' }, { id: 35, name: 'Comedy' }],
    tagline: 'The journey of a lifetime.',
    status: 'Released',
    budget: 35000000,
    revenue: 85000000,
    original_language: 'en'
  },
  '3': {
    id: 3,
    title: 'Sample Movie: Mystery',
    poster_path: null,
    backdrop_path: null,
    overview: 'A third sample movie to populate the grid and keep you on the edge of your seat.',
    release_date: '2021-11-05',
    vote_average: 8.1,
    genre_ids: [9648, 53],
    popularity: 12,
    runtime: 142,
    genres: [{ id: 9648, name: 'Mystery' }, { id: 53, name: 'Thriller' }],
    tagline: 'Trust no one.',
    status: 'Released',
    budget: 20000000,
    revenue: 98000000,
    original_language: 'en'
  }
};

const fallbackGenres: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

/**
 * Fetch trending movies for the week
 * Used on the home page to showcase popular content
 */
export async function getTrendingMovies(): Promise<Movie[]> {
  if (!isApiKeyConfigured()) {
    return sampleMovies;
  }
  try {
    const data = await fetchTMDB<PaginatedResponse<Movie>>('/trending/movie/week');
    if (data && Array.isArray(data.results) && data.results.length > 0) {
      return data.results;
    }
    console.warn('TMDB returned no results — using fallback sample movies.');
    return sampleMovies;
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
    return sampleMovies; // Return sample movies so the UI can render without an API key
  }
}

/**
 * Search movies by query string
 * Used on the search page with user input
 */
export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];
  if (!isApiKeyConfigured()) {
    const lowerQuery = query.toLowerCase();
    return sampleMovies.filter(
      movie =>
        movie.title.toLowerCase().includes(lowerQuery) ||
        movie.overview.toLowerCase().includes(lowerQuery)
    );
  }
  try {
    const data = await fetchTMDB<PaginatedResponse<Movie>>('/search/movie', { query });
    return data.results;
  } catch (error) {
    console.error('Failed to search movies:', error);
    // Return filtered sample movies when API fails
    const lowerQuery = query.toLowerCase();
    return sampleMovies.filter(
      movie =>
        movie.title.toLowerCase().includes(lowerQuery) ||
        movie.overview.toLowerCase().includes(lowerQuery)
    );
  }
}

/**
 * Get detailed information for a specific movie
 * Used on the dynamic movie detail page
 * Demonstrates dynamic route parameter usage
 */
export async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  // If the ID matches a sample movie, return it directly
  if (sampleMovieDetails[id]) {
    return sampleMovieDetails[id];
  }

  if (!isApiKeyConfigured()) {
    return null;
  }

  try {
    return await fetchTMDB<MovieDetails>(`/movie/${id}`);
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
    return null;
  }
}

/**
 * Get genre list for mapping genre_ids to names
 */
export async function getGenres(): Promise<Record<number, string>> {
  if (!isApiKeyConfigured()) {
    return fallbackGenres;
  }
  try {
    const data = await fetchTMDB<{ genres: { id: number; name: string }[] }>('/genre/movie/list');
    return data.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {} as Record<number, string>);
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    return fallbackGenres;
  }
}
