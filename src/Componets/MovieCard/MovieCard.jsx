import { Link } from 'react-router-dom';
import './MovieCard.css';
import StarRatings from 'react-star-ratings';
import noImage from '/images/no-image.png';

function MovieCard({ movie, height, width, cardStyle, radius, imgSrc, id }) {
  const posterSrc = imgSrc ? `${import.meta.env.VITE_API_BASE_IMAGE_URL}${imgSrc}` : noImage;
  const rating = movie?.vote_average ? movie.vote_average / 2 : 0;
  const hyperRef = `/movie-details/${id}`;

  if (cardStyle === 'top-rated-card') {
    return (
      <Link className='movie-card movie-card--compact' to={hyperRef}>
        <div className='movie-card__thumb'>
          <img src={posterSrc} alt={movie?.title} />
        </div>
        <div className='movie-card__compact-body'>
          <p className='movie-card__title'>{movie?.title}</p>
          <span className='movie-card__badge'>★ {rating.toFixed(1)}</span>
        </div>
      </Link>
    );
  }

  const movieCardStyle = {
    '--card-height': height,
    '--card-width': width,
    '--card-radius': radius,
    backgroundImage: `linear-gradient(160deg, rgba(8, 10, 24, 0.85) 12%, rgba(8, 10, 24, 0.05) 65%), url(${posterSrc})`,
  };

  return (
    <Link className={`movie-card ${cardStyle}`} to={hyperRef}>
      <article className='movie-card__frame' style={movieCardStyle}>
        <div className='movie-card__top'>
          {movie && (
            <StarRatings
              rating={rating}
              starRatedColor='#ffc371'
              starEmptyColor='rgba(255,255,255,0.3)'
              starDimension='14px'
              starSpacing='1px'
              numberOfStars={5}
              name='rating'
            />
          )}
        </div>
        <div className='movie-card__bottom'>
          <p className='movie-card__title'>{movie?.title}</p>
          <p className='movie-card__subtitle'>Rating · {rating.toFixed(1)}</p>
        </div>
      </article>
    </Link>
  );
}

export default MovieCard;
