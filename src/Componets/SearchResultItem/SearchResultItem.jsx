import { Link } from 'react-router-dom';
import noImage from '/images/no-image.png';

function SearchResultItem({ movie, onNavigate }) {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <Link
      className='search-result'
      to={`/movie-details/${movie?.id}`}
      onMouseDown={handleClick}
    >
      <img
        className='search-result__poster'
        src={
          movie?.backdrop_path
            ? `${import.meta.env.VITE_API_BASE_IMAGE_URL}${movie.backdrop_path}`
            : noImage
        }
        alt={movie?.title}
      />
      <div className='search-result__meta'>
        <p className='search-result__title'>{movie?.title}</p>
        {movie?.release_date && <span className='search-result__year'>{movie.release_date.slice(0, 4)}</span>}
      </div>
    </Link>
  );
}

export default SearchResultItem;
