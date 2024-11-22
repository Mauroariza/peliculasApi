// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`bg-gradient-to-r ${darkMode ? 'from-gray-800 to-gray-700' : 'from-blue-500 to-indigo-600'} text-white shadow-lg`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo o Nombre de la App */}
        <Link to="/" className="text-2xl font-bold">
          MovieApp
        </Link>

        {/* Menú Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/Home"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Inicio
          </Link>
          <Link
            to="/movies"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Películas Populares
          </Link>
          <Link
            to="/news"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Noticias
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Contacto
          </Link>
          <Link
            to="/signin"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Iniciar Sesión
          </Link>
        </div>

        {/* Botón Modo Oscuro/Claro */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Botón Menú Móvil */}
        <div className="md:hidden">
          <button onClick={handleToggleMenu} className="focus:outline-none">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {isMobileMenuOpen && (
        <div className={`md:hidden bg-gradient-to-r ${darkMode ? 'from-gray-800 to-gray-700' : 'from-blue-500 to-indigo-600'} text-white`}>
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/Home"
              className="block hover:text-yellow-300 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/movies"
              className="block hover:text-yellow-300 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Películas Populares
            </Link>
            <Link
              to="/news"
              className="block hover:text-yellow-300 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Noticias
            </Link>
            <Link
              to="/contact"
              className="block hover:text-yellow-300 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </Link>
            <Link
              to="/signin"
              className="block hover:text-yellow-300 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;