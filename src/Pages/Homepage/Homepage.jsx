import { useContext } from 'react';
import PopularMovies from '../../Componets/PopularMovies/PopularMovies'
import Slider from '../../Componets/Slider/Slider'
import TopRatedMovies from '../../Componets/TopRatedMovies/TopRatedMovies'
import './Homepage.css'
import { ThemeContext } from '../../Context/ThemeContext';


function Homepage() {

  const {darkMode} = useContext(ThemeContext);

  return (
    <div className={`homepage-container ${!darkMode && 'home-light'}`}>
      <Slider />
      <div className='movies-wrapper'>
        <PopularMovies />
        <TopRatedMovies />
      </div>
    </div>
  )
}

export default Homepage