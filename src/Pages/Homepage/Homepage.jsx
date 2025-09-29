import { useContext } from 'react';
import PopularMovies from '../../Componets/PopularMovies/PopularMovies';
import Slider from '../../Componets/Slider/Slider';
import TopRatedMovies from '../../Componets/TopRatedMovies/TopRatedMovies';
import './Homepage.css';
import { ThemeContext } from '../../Context/ThemeContext';

function Homepage() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`homepage ${darkMode ? 'homepage--dark' : 'homepage--light'}`}>
      <Slider />
      <section className='homepage__content'>
        <div className='homepage__main'>
          <PopularMovies />
        </div>
        <aside className='homepage__sidebar'>
          <TopRatedMovies />
        </aside>
      </section>
    </div>
  );
}

export default Homepage;
