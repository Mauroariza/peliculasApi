import React from 'react';

interface ContactProps {
  darkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8">Contacto</h2>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg max-w-2xl mx-auto`}>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className={`w-full p-3 rounded-lg ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'
              } border border-gray-300`}
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-3 rounded-lg ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'
              } border border-gray-300`}
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 font-semibold">
              Mensaje
            </label>
            <textarea
              id="message"
              rows={4}
              className={`w-full p-3 rounded-lg ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'
              } border border-gray-300`}
              placeholder="Tu mensaje..."
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 rounded-lg ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-semibold transition-colors`}
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;