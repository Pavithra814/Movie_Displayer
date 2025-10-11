const API_KEY = "d6c69859103262645ace59a3d2e42045";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  try{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await response.json();
    return data;
  }catch(error){
    console.error("Error fetching popular movies:", error);
  }
};

export const searchMovies = async (query, page = 1) => {
 try{
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  const data = await response.json();
  return data.results;
}catch(error){
    console.error("Error Searching Movies:", error)
    return {results: [], total_pages: 1};
}
};

export const getMovieDetails = async(id) => {
  try{
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    const data = await res.json();
    return data;
  }catch(error){
    console.error("Error fetching Movie Details",error);
    return null;
  }
}