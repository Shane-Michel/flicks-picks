import axios from 'axios';
import { useEffect, useState } from 'react';
import './Genres.css';

function Genres({ genreIds = [], component }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_APP_API_KEY}`)
      .then((res) => setGenres(res.data.genres || []))
      .catch((err) => console.log(err));
  }, []);

  const resolvedGenres = component === 'details'
    ? genreIds.map((item) => item?.name).filter(Boolean)
    : genreIds
        .map((id) => genres.find((genre) => genre.id === id)?.name)
        .filter(Boolean);

  if (resolvedGenres.length === 0) {
    return null;
  }

  return (
    <div className={`genre-container ${component === 'details' ? 'genre-container--details' : ''}`}>
      {resolvedGenres.map((name) => (
        <span key={name}>{name}</span>
      ))}
    </div>
  );
}

export default Genres;
