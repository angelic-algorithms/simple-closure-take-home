const SORT_OPTIONS = [
  { value: 'title.asc', label: 'Title (A–Z)' },
  { value: 'vote_average.desc', label: 'Rating (High to Low)' },
  { value: 'popularity.desc', label: 'Popularity (High to Low)' },
  { value: 'primary_release_date.desc', label: 'Release Date (Newest)' },
]

export default function Controls({ genres, genreId, onGenreChange, sortBy, onSortChange }) {
  return (
    <div className="controls">
      <label className="controls__field">
        <span>Genre</span>
        <select value={genreId} onChange={(e) => onGenreChange(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>

      <label className="controls__field">
        <span>Sort by</span>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
