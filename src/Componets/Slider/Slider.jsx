import { useEffect, useMemo, useState } from 'react';
import './Slider.css';
import axios from 'axios';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Genres from '../Genres/Genres';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

function Slider() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [movieIndex, setMovieIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}upcoming?api_key=${import.meta.env.VITE_APP_API_KEY}`)
      .then((res) => {
        setUpcomingMovies(res.data.results || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const heroMovie = upcomingMovies[movieIndex];
  const heroBackground = useMemo(() => {
    if (!heroMovie?.backdrop_path) {
      return undefined;
    }

    return {
      backgroundImage: `linear-gradient(110deg, rgba(5, 6, 15, 0.85) 15%, rgba(5, 6, 15, 0.1) 65%), url(${import.meta.env.VITE_API_BASE_IMAGE_URL}${heroMovie.backdrop_path})`,
    };
  }, [heroMovie]);

  const handleRightClick = () => {
    setMovieIndex((prev) => (prev === upcomingMovies.length - 1 ? 0 : prev + 1));
  };

  const handleLeftClick = () => {
    setMovieIndex((prev) => (prev === 0 ? upcomingMovies.length - 1 : prev - 1));
  };

  const rating = heroMovie?.vote_average ? heroMovie.vote_average / 2 : 0;
  const description = heroMovie?.overview ? `${heroMovie.overview.slice(0, 200)}${heroMovie.overview.length > 200 ? '…' : ''}` : 'Dive into trailers, ratings, and hidden gems from across the cinematic universe.';

  return (
    <section className='hero'>
      <div className='hero__backdrop' style={heroBackground}>
        <button className='hero__nav hero__nav--left' type='button' onClick={handleLeftClick} aria-label='View previous film'>
          <MdKeyboardArrowLeft />
        </button>
        <button className='hero__nav hero__nav--right' type='button' onClick={handleRightClick} aria-label='View next film'>
          <MdKeyboardArrowRight />
        </button>
        <div className='hero__content'>
          <p className='hero__eyebrow'>Upcoming highlight</p>
          <h1 className='hero__title'>{heroMovie?.title || 'Discover your next favourite story'}</h1>
          <p className='hero__description'>{description}</p>
          {heroMovie && <Genres genreIds={heroMovie?.genre_ids ?? []} />}
          <div className='hero__meta'>
            {heroMovie?.release_date && <span className='hero__chip'>{heroMovie.release_date.slice(0, 4)}</span>}
            {heroMovie && (
              <span className='hero__rating'>
                <StarRatings
                  rating={rating}
                  starRatedColor='#ffc371'
                  starEmptyColor='rgba(255,255,255,0.3)'
                  starDimension='18px'
                  starSpacing='2px'
                  numberOfStars={5}
                  name='rating'
                />
                <span className='hero__rating-score'>{rating.toFixed(1)}</span>
              </span>
            )}
          </div>
          {heroMovie && (
            <Link className='hero__cta' to={`/movie-details/${heroMovie?.id}`}>
              View details
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default Slider;
