import { Routes, Route } from 'react-router-dom';
import { Film } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import MovieDetails from './components/MovieDetails';
import News from './News';
import Contact from './components/Contact';
import Home from './components/Home';
import SignIn from './components/SignIn';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface MovieDetailsType extends Movie {
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

interface NewsArticle {
  urlToImage: string;
  title: string;
  description: string;
  url: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailsType | null>(null);
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

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
    } catch {
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

  const fetchNews = useCallback(async () => {
    setNewsLoading(true);
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          apiKey: '543d3ddb2ed2437ba9bc76ed39caf842',
          category: 'technology',
          country: 'us',
        },
      });
      setNews(response.data.articles);
      setNewsLoading(false);
    } catch (err) {
      setNewsError('Error al cargar las noticias');
      setNewsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        
      <Route 
    path="/Home" 
    element={<Home darkMode={darkMode} featuredMovies={movies.slice(0, 4)} />} 
  />
   <Route 
    path="/movies" 
    element={
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold flex items-center">
            <Film className="mr-2" />
            Películas Populares
          </h1>
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
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm line-clamp-3`}>
                  {movie.overview}
                </p>
              </div>
            </div>
          ))}
        </div>
        {loading && <div className="text-center mt-4">Cargando más películas...</div>}
      </div>
    }
  />

        <Route
          path="/news"
          element={
            <div className="container mx-auto p-8">
              <h2 className="text-3xl font-bold mb-4">Últimas Noticias del Cine</h2>
              <News
                news={news}
                newsLoading={newsLoading}
                newsError={newsError}
                darkMode={darkMode}
              />
            </div>
          }
        />
        <Route
    path="/contact"
    element={<Contact darkMode={darkMode} />}
  />
   <Route
          path="/signin"
          element={<SignIn darkMode={darkMode} />}
        />
      </Routes>

      {selectedMovie && (
        <MovieDetails
          selectedMovie={selectedMovie}
          darkMode={darkMode}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;