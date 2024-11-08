# peliculasApi
Características Principales
Exploración de Películas Populares: Navega por una amplia selección de películas populares.
Visualización de Detalles de Películas: Accede a información detallada sobre cada película.
Sección de Noticias: Mantente informado con las últimas noticias en tecnología.
Modo Oscuro/Claro: Alterna entre modos de visualización para mayor comodidad.
Diseño Responsivo: Adaptado para funcionar en cualquier dispositivo gracias a Tailwind CSS.
Scroll Infinito: Carga continua de contenido para una navegación fluida.
APIs Utilizadas
1. The Movie Database (TMDB) API
URL Base: https://api.themoviedb.org/3
Endpoints Utilizados:
/movie/popular: Lista de películas populares.
/movie/{movie_id}: Detalles específicos de una película.
Características:
Soporte multilenguaje, configurado en español.
Información detallada de películas y URLs de imágenes de pósters.
2. News API
URL Base: https://newsapi.org/v2
Endpoint Utilizado:
/top-headlines: Noticias principales.
Configuración:
Categoría: Tecnología.
País: Estados Unidos.
Filtrado de artículos inválidos o removidos.
Estructura del Proyecto
App.tsx: Componente principal de la aplicación.
News.tsx: Componente dedicado a la sección de noticias.
styles.scss: Estilos personalizados utilizando SASS.
index.css: Estilos globales aplicados con Tailwind CSS.
Tecnologías Utilizadas
React 18: Framework principal para la construcción de la interfaz.
TypeScript: Asegura un código más robusto y mantenible.
Tailwind CSS: Facilita el diseño responsivo y modular.
SASS: Permite la creación de estilos más complejos y organizados.
Axios: Manejo eficiente de peticiones HTTP.
React Router: Navegación fluida entre componentes.
Vite: Bundler que proporciona un entorno de desarrollo rápido y eficiente.
Configuración del Proyecto
Para ejecutar el proyecto, sigue estos pasos:
bash


# Instalación de dependencias
npm install

# Desarrollo
npm run dev

# Construcción
npm run build
