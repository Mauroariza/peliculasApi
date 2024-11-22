import { X } from 'lucide-react';

interface MovieDetails {
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

interface MovieDetailsModalProps {
  selectedMovie: MovieDetails;
  darkMode: boolean;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ selectedMovie, darkMode, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}>
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <button 
          onClick={onClose}
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
            {selectedMovie.genres.map((genre: { id: number; name: string }) => (
              <span key={genre.id} className={`${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} px-2 py-1 rounded-full text-sm`}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MovieDetailsModal;