import './App.css'
import Header from './Componets/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ThemeContextProvider from './Context/ThemeContext';
import Homepage from './Pages/Homepage/Homepage';
import Footer from './Componets/Footer/Footer';
import MovieDetails from './Pages/MovieDetails/MovieDetails';

function App() {
  

  return (
    <BrowserRouter>
    <ThemeContextProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/movie-details/:movieId' element={<MovieDetails />}/>
        <Route path='*' element={<Homepage />}/>
      </Routes>
      <Footer />
    </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App
