import { IMAGE_BASE_URL } from '../api/tmdb'

export default function MovieCard({ movie }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null

  return (
    <article className="movie-card" tabIndex={0}>
      <div className="movie-card__poster-wrap">
        {posterUrl ? (
          <img className="movie-card__poster" src={posterUrl} alt={`${movie.title} poster`} loading="lazy" />
        ) : (
          <div className="movie-card__poster movie-card__poster--placeholder">No Image</div>
        )}

        <div className="movie-card__overlay">
          <p>{movie.overview ? movie.overview : 'No description available.'}</p>
        </div>

        <span className="movie-card__rating">{movie.vote_average.toFixed(1)}</span>
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__title">{movie.title}</h3>
        <span className="movie-card__year">{year}</span>
      </div>
    </article>
  )
}
