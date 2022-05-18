import { useState, useEffect } from 'react'
import './App.css';
import SearchIcon from './search.svg'
import Movie from './Movie'

const API_URL = 'http://www.omdbapi.com?apikey=d739785f';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies("Harry Potter")
  }, []);

  return (
    <div className='app'>
      <h1>Movie Database</h1>
      <div className="search">
        <input placeholder='Search for movies' value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchWord)}/>
      </div>

      {
        movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <Movie movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }


    </div>
  )
}

export default App;
