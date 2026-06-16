# MovieBox

MovieBox is a Next.js movie discovery app that fetches data from TMDB and displays trending movies, search results, watchlist features, and movie details.

## Features

- Trending movies home page
- Search page for movie lookup
- Watchlist page to save favorites locally
- Movie detail pages with overview, rating, and release info
- Responsive Tailwind CSS UI
- Server-side data fetching with Next.js

## Environment

The app requires a TMDB API key to fetch movie data.

1. Copy `.env.example` to `.env.local`
2. Set your TMDB API key:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_real_tmdb_api_key
```

## Local development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open the app at `http://localhost:3000`.

## Build for production

```bash
npm run build
npm start
```

## Deployment

This project is configured for Netlify using `@netlify/plugin-nextjs`.

## Notes

- `.env.local` should not be committed to GitHub.
- `.env.example` is tracked and shows the required environment variables.
- If the site fails to load data, verify that the TMDB API key is correctly set.
