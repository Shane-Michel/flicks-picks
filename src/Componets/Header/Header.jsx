import './Header.css';
import { Link } from 'react-router-dom';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SearchResultItem from '../SearchResultItem/SearchResultItem';
import { ThemeContext } from '../../Context/ThemeContext';

function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    const debounce = setTimeout(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_APP_API_KEY}&query=${query}`,
          { signal: controller.signal }
        )
        .then((res) => {
          setSearchResults(res.data.results || []);
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            console.log(err);
          }
        })
        .finally(() => setIsLoading(false));
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(debounce);
    };
  }, [query]);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  const handleClearInput = () => {
    setQuery('');
    setSearchResults([]);
  };

  const showDropdown = query.trim().length > 0;

  return (
    <header className={`app-header ${darkMode ? 'app-header--dark' : 'app-header--light'}`}>
      <div className='app-header__inner'>
        <Link className='app-header__brand' to='/'>
          <span>Flicks</span>Picks
        </Link>
        <div className={`app-header__search ${isFocused ? 'is-focused' : ''} ${showDropdown ? 'has-dropdown' : ''}`}>
          <FiSearch className='app-header__search-icon' aria-hidden='true' />
          <input
            value={query}
            className='app-header__search-input'
            type='text'
            placeholder='Search for a cinematic gem...'
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          />
          {showDropdown && (
            <div className='app-header__search-dropdown'>
              {isLoading ? (
                <p className='app-header__search-status'>Searching...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <SearchResultItem
                    movie={result}
                    key={result?.id}
                    onNavigate={handleClearInput}
                  />
                ))
              ) : (
                <p className='app-header__search-status'>No titles match that search just yet.</p>
              )}
            </div>
          )}
        </div>
        <button
          className='theme-toggle-button'
          type='button'
          onClick={toggleMode}
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          <span className='theme-toggle-button__icon'>
            {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </span>
          <span className='theme-toggle-button__label'>{darkMode ? 'Light' : 'Dark'} mode</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
