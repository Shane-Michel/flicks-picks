import { useContext } from 'react';
import './Footer.css'
import { ThemeContext } from '../../Context/ThemeContext';

function Footer() {

  const {darkMode} = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer-container ${!darkMode && 'footer-light'}`}>
      <p>&copy; {currentYear} FlicksPicks</p>
    </footer>
  )
}

export default Footer