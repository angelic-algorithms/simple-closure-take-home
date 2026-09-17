# Movie Discover

A small React app that fetches movies from [The Movie Database (TMDB)](https://www.themoviedb.org/) and displays them in a responsive, filterable grid of cards.

## Setup

```bash
npm i
npm start
```

Then open the URL Vite prints (defaults to `http://localhost:5173`).

No environment variables or config are required. The TMDB API key ships in `src/api/tmdb.js` so the app runs with zero setup.

## What it does

- Fetches movies from `GET /discover/movie` (first page).
- **Filter:** by genre, via a dropdown populated from `GET /genre/movie/list`. Selecting a genre re-fetches with `with_genres`.
- **Sort:** defaults to alphabetical (`sort_by=title.asc`); a second dropdown lets you switch to rating or release date, which also re-fetches from the API (TMDB does the sorting server-side, not the client). 
- Every request also sends `vote_count.gte=100`  which prioritizes movies that have at least 100 votes. This keeps results to movies with a meaningful amount of ratings data instead of random ones.
- Each card shows: poster, title, release year, a rating badge, and a hover overlay that reveals the movie's overview.
- The grid is responsive (CSS Grid `auto-fill`/`minmax`), and card hover/overlay transitions are done in pure CSS.

## Project structure

```
src/
  api/tmdb.js           API key, fetchGenres, fetchMovies
  components/
    Controls.jsx         Genre + sort dropdowns
    MovieCard.jsx         Single card: poster, rating, hover overlay
    MovieGrid.jsx         Responsive grid of cards
  App.jsx                State + data fetching (genres, movies, filter/sort state)
  App.css / index.css    Styling
```

## Engineering decisions & tradeoffs

- **React + Vite** most efficient for single page app.
- **Sorting/filtering hits the API, not the client.** Since TMDB's `/discover` endpoint already supports `sort_by` and `with_genres` server-side, re-fetching on change keeps the client simple and avoids maintaining a separate "all movies" cache just to sort in-memory. The tradeoff is a network round-trip per control change instead of an instant client-side re-sort.
- **API key handling:** hardcoded in source rather than an env file, since this is a take home interview. In a real app this would be placed into a gitignored `.env`, since a client-bundled key is visible to anyone who opens dev tools. TMDB v3 keys are read-only and rate-limited rather than billing-linked, which makes this an acceptable shortcut for a take-home, not something I'd do in production.
