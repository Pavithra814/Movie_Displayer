import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";
import "../css/MovieDetails.css";

//fetching details using useParams
function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return null;

  return(
    <div className="movie-details">
        <div className="movie-title">
            <h2>{movie.title}</h2>
        </div>
        <div className="movie-body">
          <div className="movie-body-poster">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="movie-body-details">
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Vote Average:</strong> {movie.vote_average}</p>
            <p><strong>Vote Count:</strong> {movie.vote_count}</p>
            <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
          </div>
        </div>
    </div>
  );
}

export default MovieDetails;
