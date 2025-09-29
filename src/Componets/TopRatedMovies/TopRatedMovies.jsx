import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './TopRatedMovies.css';

function TopRatedMovies() {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}top_rated?api_key=${import.meta.env.VITE_APP_API_KEY}`)
      .then((res) => {
        setTopRated((res.data.results || []).slice(0, 10));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className='top-rated'>
      <div className='top-rated__header'>
        <p className='top-rated__eyebrow'>Critics adore</p>
        <h3 className='top-rated__title'>Top rated gems</h3>
        <p className='top-rated__description'>A curated digest of the best-reviewed stories, ready for your watchlist.</p>
      </div>
      <div className='top-rated__list'>
        {topRated.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            width='100%'
            height='auto'
            radius='18px'
            imgSrc={movie?.poster_path}
            id={movie?.id}
            cardStyle='top-rated-card'
          />
        ))}
      </div>
    </section>
  );
}

export default TopRatedMovies;
