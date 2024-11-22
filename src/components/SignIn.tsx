// src/components/SignIn.tsx
import React, { useState } from 'react';

interface SignInProps {
  darkMode: boolean;
}

const SignIn: React.FC<SignInProps> = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-bold mb-8">Iniciar Sesión</h2>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 font-semibold">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'
                  } border border-gray-300`}
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 font-semibold">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className={`w-full p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'
                  } border border-gray-300`}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
        
        <div className="w-1/2 pl-8">
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 mix-blend-overlay"></div>
            <img
              src="https://es.web.img2.acsta.net/c_310_420/img/bf/f1/bff188201600766796335bdaa9cda59b.jpg"
              className="w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Bienvenido al Mundo del Cine</h3>
              <p className="text-sm opacity-90">Descubre las mejores películas y series</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;