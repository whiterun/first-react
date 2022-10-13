import { useState } from 'react'
import { useQuery } from 'react-query'

import MovieCard from './MovieCard'

import './App.css'
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com/?apikey=197f789'

const searchMovies = async (title) => {
  const term = title ? title : 'Any'

  const response = await fetch(`${API_URL}&s=${term}`)
  const data = await response.json()

  return data.Search
}

const App = () => {
  // const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const { data } = useQuery(['movies', searchTerm], () => searchMovies(searchTerm))

  // const searchMovies = async (title) => {
  //   const response = await fetch(`${API_URL}&s=${title}`)
  //   const data = await response.json()

  //   setMovies(data.Search)
  // }
  // useEffect(() => {
  //   searchMovies('Any')
  // }, [])

  return (
    <div className="app">
      <h1>The Movies</h1>

      <div className="search">
        <input
          placeholder="Search movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        data?.length > 0
        ? (
          <div className="container">
            {data.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies</h2>
          </div>
        )
      }
    </div>
  )
}

export default App