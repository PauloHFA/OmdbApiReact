import axios from 'axios';

const API_KEY = '68093e4f';
const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (query, page = 1, year = '') => {
  try {
    // Se não houver query, usa um termo padrão
    const searchQuery = query || 'movie';
    
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: searchQuery,
        ...(year && { y: year }), // Só inclui o parâmetro year se ele existir
        page: page,
        type: 'movie',
      },
    });

    console.log('API Response Structure:', {
      fullResponse: response.data,
      sampleMovie: response.data.Search?.[0],
    });

    // Se a busca falhar com o termo genérico e tiver ano, tenta com outro termo
    if (response.data.Response === 'False' && year && !query) {
      const retryResponse = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          s: 'the',
          y: year,
          page: page,
          type: 'movie',
        },
      });
      console.log('Retry Response Structure:', {
        fullResponse: retryResponse.data,
        sampleMovie: retryResponse.data.Search?.[0],
      });
      return retryResponse.data;
    }

    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full',
      },
    });
    console.log('Movie Details Structure:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}; 