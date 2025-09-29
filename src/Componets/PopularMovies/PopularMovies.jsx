import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './PopularMovies.css';

function PopularMovies() {
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}popular?api_key=${import.meta.env.VITE_APP_API_KEY}&page=${currentPage}`)
      .then((res) => {
        setPopularMovies(res.data.results || []);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  return (
    <section className='popular'>
      <div className='popular__header'>
        <div>
          <p className='popular__eyebrow'>Now trending</p>
          <h2 className='popular__title'>Popular this week</h2>
          <p className='popular__description'>Swipe through what cinephiles across the globe can’t stop talking about.</p>
        </div>
      </div>
      <div className='popular__grid'>
        {popularMovies.map((movie) => (
          <MovieCard
            key={movie?.id}
            movie={movie}
            height='320px'
            width='220px'
            cardStyle='popular-card'
            radius='24px'
            imgSrc={movie?.poster_path}
            id={movie?.id}
          />
        ))}
      </div>
      <div className='popular__pagination' role='tablist' aria-label='Popular movies pages'>
        {numbers.map((number) => (
          <button
            key={number}
            type='button'
            className={`popular__page ${number === currentPage ? 'is-active' : ''}`}
            onClick={() => setCurrentPage(number)}
            aria-pressed={number === currentPage}
          >
            {number}
          </button>
        ))}
      </div>
    </section>
  );
}

export default PopularMovies;
