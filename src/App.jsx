import { useEffect, useState } from 'react'
import { fetchGenres, fetchMovies } from './api/tmdb'
import Controls from './components/Controls'
import MovieGrid from './components/MovieGrid'
import './App.css'

function BrandMark() {
  return (
    <svg className="brand__mark" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12v10.5h3.4V12a7.1 7.1 0 0 1 14.2 0v10.5h3.4V12C22.5 6.2 17.8 1.5 12 1.5z"
      />
      <path
        fill="currentColor"
        d="M12 6.4A5.6 5.6 0 0 0 6.4 12v10.5h3.3V12a2.3 2.3 0 0 1 4.6 0v10.5h3.3V12A5.6 5.6 0 0 0 12 6.4z"
      />
    </svg>
  )
}

export default function App() {
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState('')
  const [sortBy, setSortBy] = useState('title.asc')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGenres()
      .then(setGenres)
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchMovies({ genreId, sortBy })
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [genreId, sortBy])

  return (
    <div className="app">
      <header className="nav">
        <p className="nav__meta">TMDB</p>
        <a className="brand" href="/">
          <BrandMark />
          <span>Movie Discover</span>
        </a>
        <div className="nav__actions">
          <a className="btn btn--primary" href="#movies">
            Browse films
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <span className="pill">Now showing</span>
          <h1>
            The film
            <br />
            <em>standard.</em>
          </h1>
          <p>
            Browse titles from The Movie Database. Filter by genre, sort by what
            matters, and find your next watch.
          </p>
        </section>

        <Controls
          genres={genres}
          genreId={genreId}
          onGenreChange={setGenreId}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <section id="movies" className="results" aria-live="polite">
          {error && <p className="error-state">Something went wrong: {error}</p>}
          {loading && !error && (
            <div className="movie-grid" aria-label="Loading movies">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="movie-card movie-card--skeleton" />
              ))}
            </div>
          )}
          {!loading && !error && <MovieGrid movies={movies} />}
        </section>
      </main>

      <footer className="footer">
        <p className="footer__kicker">Ready when you are</p>
        <p className="footer__headline">
          Find your next
          <br />
          <em>watch.</em>
        </p>
        <p className="footer__fine">Movie data provided by The Movie Database.</p>
      </footer>
    </div>
  )
}
