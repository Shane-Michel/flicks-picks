import './Header.css'
import { Link } from 'react-router-dom'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import SearchResultItem from '../SearchResultItem/SearchResultItem'
import { ThemeContext } from '../../Context/ThemeContext'

function Header() {

  const {darkMode, setDarkMode} = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(
    () => {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_APP_API_KEY}&query=${query}`)
      .then(res => setSearchResults(res.data.results))
      .catch(err => console.log(err))
    }, [query]
  );

  const toggleMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleClearInput = () => {
    setQuery('');
  }

  return (
    <div className={`header-container ${!darkMode && 'header-light'}`}>
        <Link className='logo' to='/'>FlicksPicks</Link>
        <div className='search-container'>
          <input
            value={query}
            className={`search-input ${query && "input-active"} ${!query && !darkMode && "input-light"}`} 
            type="text" 
            placeholder='Search movies...'
            onChange={e => setQuery(e.target.value)}
          />
          {query.trim() !== '' && <div className='search-results-container' onClick={handleClearInput}>
            {searchResults.map(result => (<SearchResultItem movie={result} key={result?.id}/>))}
          </div>}
        </div>
        <div className='header-buttons-container'>
          <div className='theme-buttons'>
            <MdOutlineLightMode className={`theme-icon ${!darkMode && 'theme-icon-active'}`} onClick={!darkMode ? undefined : toggleMode}/>
            <MdOutlineDarkMode className={`theme-icon ${darkMode && 'theme-icon-active'}`} onClick={darkMode ? undefined : toggleMode}/>
          </div>
        </div>
    </div>
  )
}

export default Header