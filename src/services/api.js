const BASE_URL = "https://localhost:7048/api";

// Get paginated movies
export const getPopularMovies = async (page = 1, pageSize = 12) => {
  try {
    const response = await fetch(
      `${BASE_URL}/Movies/paged?pageNumber=${page}&pageSize=${pageSize}`
    );
    const data = await response.json();

    return {
      results: (data.movies || []), // Use backend IDs directly
      total_pages: data.totalPages || 1
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [], total_pages: 1 };
  }
};

// Search movies (pagination optional)
export const searchMovies = async (query, page = 1, pageSize = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/Movies/search?query=${encodeURIComponent(query)}&pageNumber=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) throw new Error("Search failed");
    const data = await response.json();
    return {
      results: data.movies || [],
      total_pages: data.totalPages || 1,
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    return { results: [], total_pages: 1 };
  }
};

// Get Movie Details
export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/Movies/${id}`);
    const movie = await res.json();

    return {
      ...movie,
      genres: movie.genres ? movie.genres.split(",") : []
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

// Favorite toggle (dummy user id = 1)
export const toggleFavorite = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/Favourite/toggle?userId=1&movieId=${movieId}`, {
      method: "POST"
    });
    return await res.json();
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
};
