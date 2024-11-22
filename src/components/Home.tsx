// src/components/Home.tsx
import { Film, Star, Info, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeProps {
  darkMode: boolean;
  featuredMovies: Array<{
    id: number;
    title: string;
    poster_path: string;
    overview: string;
  }>;
}

const Home: React.FC<HomeProps> = ({ darkMode, featuredMovies = [] }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a MovieApp</h1>
        <p className="text-xl mb-8">Tu destino para descubrir el mundo del cine</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <Film className="w-12 h-12 mb-4 text-blue-500" />
          <h2 className="text-2xl font-bold mb-2">Películas Populares</h2>
          <p className="mb-4">Explora las películas más populares del momento.</p>
          <Link 
            to="/movies" 
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Ver más →
          </Link>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <Star className="w-12 h-12 mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-2">Últimas Noticias</h2>
          <p className="mb-4">Mantente al día con las últimas noticias del cine.</p>
          <Link 
            to="/news" 
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Ver más →
          </Link>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <Info className="w-12 h-12 mb-4 text-green-500" />
          <h2 className="text-2xl font-bold mb-2">Contacto</h2>
          <p className="mb-4">¿Tienes preguntas? Contáctanos.</p>
          <Link 
            to="/contact" 
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Ver más →
          </Link>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Películas Destacadas</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {featuredMovies.slice(0, 4).map((movie) => (
            <div
              key={movie.id}
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-md overflow-hidden`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                } text-sm line-clamp-2`}>
                  {movie.overview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/movies"
          className={`inline-flex items-center px-6 py-3 rounded-lg ${
            darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-semibold transition-colors`}
        >
          <Search className="mr-2" />
          Explorar todas las películas
        </Link>
      </div>
    </div>
  );
};

export default Home;