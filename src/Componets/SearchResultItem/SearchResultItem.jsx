import { Link } from "react-router-dom";
import noImage from '/images/no-image.png';

function SearchResultItem({movie}) {

  return (
    <Link className="search-results-item" to={`/movie-details/${movie?.id}` }>
        <img 
            src={movie?.backdrop_path !== null
                ? `${import.meta.env.VITE_API_BASE_IMAGE_URL}${movie.backdrop_path}` 
                : noImage}
            alt={movie?.title}
        />
        <p>{movie?.title}</p>
    </Link>
  )
}

export default SearchResultItem