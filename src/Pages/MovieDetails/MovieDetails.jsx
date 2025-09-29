import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import StarRatings from 'react-star-ratings';
import Genres from '../../Componets/Genres/Genres';
import ReviewItem from '../../Componets/ReviewItem/ReviewItem';
import { ThemeContext } from '../../Context/ThemeContext';

function MovieDetails() {
  const { darkMode } = useContext(ThemeContext);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState('');
  const [reviews, setReviews] = useState([]);
  const [totalNumReviews, setTotalNumReviews] = useState(0);
  const [numReviewsToDisplay, setNumReviewsToDisplay] = useState(3);

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_BASE_URL}${movieId}?api_key=${import.meta.env.VITE_APP_API_KEY}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));

    axios(`${import.meta.env.VITE_API_BASE_URL}${movieId}/videos?api_key=${import.meta.env.VITE_APP_API_KEY}`)
      .then((res) => {
        const trailers = res.data.results.filter((video) => video.site === 'YouTube' && video.type.includes('Trailer'));
        setTrailerKey(trailers[0]?.key || '');
      })
      .catch((err) => console.log(err));

    axios(`${import.meta.env.VITE_API_BASE_URL}${movieId}/reviews?api_key=${import.meta.env.VITE_APP_API_KEY}`)
      .then((res) => {
        setReviews(res.data.results || []);
        setTotalNumReviews(res.data.results.length || 0);
      })
      .catch((err) => console.log(err));
  }, [movieId]);

  const rating = movie?.vote_average ? movie.vote_average / 2 : 0;

  return (
    <section className={`details ${darkMode ? 'details--dark' : 'details--light'}`}>
      <div className='details__trailer'>
        {trailerKey ? (
          <ReactPlayer
            className='details__player'
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            width='100%'
            height='100%'
            controls
          />
        ) : (
          <div className='details__trailer-fallback'>
            <p>Trailer unavailable for this title, but the story is worth exploring.</p>
          </div>
        )}
      </div>
      <div className='details__content'>
        <div className='details__header'>
          <div>
            <p className='details__eyebrow'>Film dossier</p>
            <h1 className='details__title'>{movie?.title}</h1>
            {movie?.tagline && <p className='details__tagline'>{movie.tagline}</p>}
          </div>
          {movie && (
            <div className='details__rating'>
              <StarRatings
                rating={rating}
                starRatedColor='#ffc371'
                starEmptyColor='rgba(255,255,255,0.3)'
                starDimension='18px'
                starSpacing='2px'
                numberOfStars={5}
                name='rating'
              />
              <span className='details__rating-score'>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className='details__info'>
          {movie && (
            <img
              src={`${import.meta.env.VITE_API_BASE_IMAGE_URL}${movie?.poster_path}`}
              className='details__poster'
              alt={movie?.title}
            />
          )}
          <div className='details__meta'>
            <p>{movie?.overview}</p>
            <div className='details__facts'>
              {movie?.status && <span>Status: {movie.status}</span>}
              {movie?.runtime && <span>Runtime: {movie.runtime} min</span>}
              {movie?.budget ? <span>Budget: ${movie.budget.toLocaleString()}</span> : null}
              {movie?.release_date && <span>Released: {movie.release_date}</span>}
            </div>
            <Genres genreIds={movie?.genres ? movie?.genres : []} component='details' />
          </div>
        </div>
        <div className='details__reviews'>
          <div className='details__reviews-header'>
            <h2>Reviews</h2>
            <span>{totalNumReviews} voices</span>
          </div>
          <div className='details__reviews-list'>
            {reviews.slice(0, numReviewsToDisplay).map((review, index) => (
              <ReviewItem review={review} key={index} />
            ))}
          </div>
          {totalNumReviews > 0 && (
            <button
              className='details__reviews-toggle'
              type='button'
              onClick={() =>
                setNumReviewsToDisplay((prev) => (prev >= totalNumReviews ? 3 : prev + 2))
              }
            >
              {numReviewsToDisplay >= totalNumReviews ? 'Show fewer impressions' : 'Load more impressions'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
