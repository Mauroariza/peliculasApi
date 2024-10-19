import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Film, X, Moon, Sun } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface MovieDetails extends Movie {
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  const API_KEY = '815ee7b95cdc0901111ec543ca7be325';

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
          api_key: API_KEY,
          language: 'es-ES',
          page,
        },
      });
      setMovies(prevMovies => {
        const newMovies = response.data.results;
        const uniqueNewMovies = newMovies.filter(
          (movie: Movie) => !prevMovies.some(prevMovie => prevMovie.id === movie.id)
        );
        return [...prevMovies, ...uniqueNewMovies];
      });
      setLoading(false);
    } catch (err) {
      setError('Error al cargar las películas');
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const fetchMovieDetails = async (movieId: number) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          language: 'es-ES',
        },
      });
      setSelectedMovie(response.data);
    } catch (err) {
      console.error('Error al cargar los detalles de la película', err);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold flex items-center">
            <Film className="mr-2" />
            Películas Populares
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-800'}`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <div 
              key={`${movie.id}-${index}`}
              ref={index === movies.length - 1 ? lastMovieElementRef : null}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105`}
              onClick={() => fetchMovieDetails(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm line-clamp-3`}>{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
        {loading && <div className="text-center mt-4">Cargando más películas...</div>}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}>
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button 
                onClick={() => setSelectedMovie(null)}
                className={`absolute top-2 right-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} rounded-full p-1 hover:bg-opacity-80`}
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{selectedMovie.overview}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Fecha de lanzamiento:</p>
                  <p>{new Date(selectedMovie.release_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Puntuación:</p>
                  <p>{selectedMovie.vote_average.toFixed(1)} / 10</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold">Géneros:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedMovie.genres.map((genre) => (
                    <span key={genre.id} className={`${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} px-2 py-1 rounded-full text-sm`}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;