import { Link } from 'react-router-dom';
import './MovieCard.css'
import StarRatings from 'react-star-ratings';

function MovieCard({movie, height, width, cardStyle, radius, imgSrc, id}) {

    const movieCardStyle = {
        backgroundImage: `url(${import.meta.env.VITE_API_BASE_IMAGE_URL}${imgSrc})`,
        backgroudRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPostion: 'center',
        position: 'relative',
        height,
        width,
        borderRadius: radius,
        boxShadow: cardStyle === 'popular-card' ? '0px 0px 10px 0px rgba(118, 118, 118, 0.75)' : null,
    };

    const hyperRef = `/movie-details/${id}`

  return (
    <Link className={cardStyle} to={hyperRef}>
      <div style={movieCardStyle}>
        <div className='movie-info-top'>
          {movie && (<StarRatings
              rating={movie?.vote_average / 2}
              starRatedColor="red"
              starDimension='11px'
              starSpacing='1px'
              numberOfStars={5}
              name='rating'
          />)}
        </div>
        <div className='movie-info-bottom'>
          <p>{movie?.title}</p>
          <p>Rating:&nbsp; {Math.round(movie?.vote_average) / 2}</p>
        </div>
      </div>
      {cardStyle === 'top-rated-card' ? <p>{movie?.title}</p> : null}
    </Link>
  )
}

export default MovieCard