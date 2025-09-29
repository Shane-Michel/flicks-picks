import { useContext } from 'react';
import './Footer.css';
import { ThemeContext } from '../../Context/ThemeContext';

function Footer() {
  const { darkMode } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`app-footer ${darkMode ? 'app-footer--dark' : 'app-footer--light'}`}>
      <div className='app-footer__inner'>
        <p>&copy; {currentYear} FlicksPicks. Curated for the modern cinephile.</p>
        <p className='app-footer__tagline'>Built with a love of storytelling and a dash of stardust.</p>
      </div>
    </footer>
  );
}

export default Footer;
