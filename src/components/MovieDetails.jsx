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
      } catch {
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

  return (
    <div className="movie-details">
      <div className="movie-title">
        <h2>{movie.title}</h2>
      </div>
      <div className="movie-body">
        <div className="movie-body-poster">
          <img src={movie.imageUrl} alt={movie.title} />
        </div>
        <div className="movie-body-details">
           <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p><strong>Story Line:</strong> {movie.storyLine}</p>
          <p><strong>Audience Rating:</strong> {movie.audienceRating}</p>
          <p><strong>Audience Count:</strong> {movie.audienceCount}</p>
          <p><strong>Genres:</strong> {movie.genres}</p>
          <p><strong>Runtime:</strong> {movie.runtimeMinutes} min</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Lead Actor:</strong> {movie.leadActor}</p>
          <p><strong>Lead Actress:</strong> {movie.leadActress}</p>
          <p><strong>Supporting Actors:</strong> {movie.supportingActors}</p>
          <p><strong>Period:</strong> {movie.period}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
