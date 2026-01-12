import axios from 'axios';

const API_KEY = '7ad3151c72dd4ee315cc41a06f635617';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = async (query) => {
  const response = await tmdb.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};

export const searchMoviesAutocomplete = async (query) => {
  if (!query || query.trim().length < 2) return [];
  const response = await tmdb.get('/search/movie', {
    params: { query },
  });
  return response.data.results.slice(0, 6); // Limit to 6 results for autocomplete
};

export const getMovieDetails = async (id) => {

  const response = await tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits,videos,watch/providers',
    },
  });
  return response.data;
};

export const getPersonDetails = async (id) => {
  const response = await tmdb.get(`/person/${id}`, {
    params: {
      append_to_response: 'combined_credits',
    },
  });
  return response.data;
};

export const getTrendingMovies = async () => {
  const response = await tmdb.get('/trending/movie/week');
  return response.data.results;
}

export const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `${IMAGE_BASE_URL}${path}`;
}
