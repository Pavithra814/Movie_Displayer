import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
import Pagination from "../components/Pagination";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //for pagination
  const [page, setPage] = useState(1);           // current page
  const [totalPages, setTotalPages] = useState(1); // total pages from API


  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await getPopularMovies(page);
        setMovies(popularMovies?.results || []); // ✅ safe check
        setTotalPages(Math.min(popularMovies.total_pages || 1, 500)); 
        console.log("Popular movies data:", popularMovies);
        }
         catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
      

    };

      if (!searchQuery) {
    loadPopularMovies();
  }

}, [page, searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    setPage(1);
    if (loading) return

    setLoading(true)
    try {
        const searchResults = await searchMovies(searchQuery, page)
        setMovies(searchResults?.results || []);         // store the movie list
        setTotalPages(searchResults.total_pages || 1); 
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

        {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
       <>
       <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>

        
        <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

export default Home;
