import { useEffect, useState } from 'react'
import { fetchGenres, fetchMovies } from './api/tmdb'
import Controls from './components/Controls'
import MovieGrid from './components/MovieGrid'
import './App.css'

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
      <header className="app__header">
        <h1>Movie Discover</h1>
        <p>Browse movies from The Movie Database</p>
      </header>

      <Controls
        genres={genres}
        genreId={genreId}
        onGenreChange={setGenreId}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {error && <p className="error-state">Something went wrong: {error}</p>}
      {loading && !error && <p className="loading-state">Loading movies…</p>}
      {!loading && !error && <MovieGrid movies={movies} />}
    </div>
  )
}
