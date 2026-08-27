const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const getImage = (path) =>
  path ? `${IMAGE_BASE}${path}` : "https://via.placeholder.com/500x750?text=No+Image";

// Popular Movies
export const getPopularMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();
  return data.results || [];
};

// Trending Movies (day)
export const getTrendingMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results || [];
};

// Language based movies (Tamil, Hindi, English)
export const getMoviesByLanguage = async (lang) => {
  // lang = "ta" | "hi" | "en"
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=${lang}&sort_by=popularity.desc&page=1`
  );
  const data = await res.json();
  return data.results || [];
};

// Trending TV / Web Series
export const getTrendingTV = async () => {
  const res = await fetch(
    `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results || [];
};

// Search Movies
export const searchMovies = async (query) => {
  if (!query.trim()) return [];
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=1`
  );
  const data = await res.json();
  return data.results || [];
};