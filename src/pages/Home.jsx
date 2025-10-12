import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import Pagination from "../components/Pagination";

function Home({ movies, loading, error, page, totalPages, onPageChange }) {
  return (
    <div className="home">
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.length === 0 ? (
              <p>No movies found</p>
            ) : (
              movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))
            )}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}

export default Home;
