const BASE_URL = 'https://api.themoviedb.org/3'

// Hardcoded per take-home instructions for zero-setup `npm i && npm start`.
// In a real app this would live server-side or in a gitignored env var —
// TMDB v3 keys are also low-risk to expose since they're rate-limited per key, not billing-linked.
const API_KEY = '62df2cd3a4881de6558bc68cd67cca20'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export async function fetchGenres() {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch genres: ${res.status}`)
  const data = await res.json()
  return data.genres
}

export async function fetchMovies({ genreId, sortBy }) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    page: '1',
    sort_by: sortBy,
    // Alphabetical/rating sorts otherwise surface obscure movies with 1-2 votes;
    // this keeps results to movies with a meaningful amount of ratings data.
    'vote_count.gte': '100',
  })
  if (genreId) params.set('with_genres', genreId)

  const url = `${BASE_URL}/discover/movie?${params.toString()}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch movies: ${res.status}`)
  const data = await res.json()
  return data.results
}
