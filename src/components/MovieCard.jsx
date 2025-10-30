import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../services/api";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  async function onFavoriteClick(e) {
    e.preventDefault();
    await toggleFavorite(movie.id);

    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-poster">
          <img src={movie.imageUrl} alt={movie.title} />
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </Link>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.releaseDate?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
