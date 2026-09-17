# Movie Discover

A small React + Vite app that fetches movies from [The Movie Database (TMDB)](https://www.themoviedb.org/) and displays them in a responsive, filterable grid of cards.

## Setup

```bash
npm i
npm start
```

Then open the URL Vite prints (defaults to `http://localhost:5173`).

No environment variables or config are required — the TMDB API key ships in `src/api/tmdb.js` for this take-home so the app runs with zero setup (see **API key** below for the tradeoff).

## What it does

- Fetches movies from `GET /discover/movie` (first page).
- **Filter:** by genre, via a dropdown populated from `GET /genre/movie/list`. Selecting a genre re-fetches with `with_genres`.
- **Sort:** defaults to alphabetical (`sort_by=title.asc`); a second dropdown lets you switch to rating or release date, which also re-fetches from the API (TMDB does the sorting server-side, not the client). Popularity is intentionally not offered as a sort — the card doesn't display a popularity metric, so sorting by it would give no visible confirmation the order actually changed.
- Every request also sends `vote_count.gte=100` — without it, alphabetical/rating sorts surface obscure titles with only a handful of votes. This keeps results to movies with a meaningful amount of ratings data.
- Each card shows: poster, title, release year, a rating badge, and a hover overlay that reveals the movie's overview (synopsis).
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

- **React + Vite** over plain HTML/JS or CRA: minimal config, fast dev server, and a component structure that's easy to extend (e.g. pagination, a details modal) without much added complexity.
- **Sorting/filtering hits the API, not the client.** Since TMDB's `/discover` endpoint already supports `sort_by` and `with_genres` server-side, re-fetching on change keeps the client simple and avoids maintaining a separate "all movies" cache just to sort in-memory. The tradeoff is a network round-trip per control change instead of an instant client-side re-sort.
- **API key handling:** hardcoded in source rather than an env file, per this project's priority on "clone and run immediately." In a real app this would move server-side (a thin proxy endpoint) or at minimum into a gitignored `.env`, since a client-bundled key is visible to anyone who opens dev tools. TMDB v3 keys are read-only and rate-limited rather than billing-linked, which makes this an acceptable shortcut for a take-home, not something I'd do in production.
- **No client-side caching/pagination** of `/discover/movie` beyond page 1, per the spec ("first page is sufficient"). Would add straightforward next if the scope grew (e.g. infinite scroll or a "Load more" button).
