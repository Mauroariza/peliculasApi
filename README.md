# Documentación del Proyecto de Películas y Noticias

## Descripción General
Este es un proyecto de React con TypeScript que utiliza Vite como bundler. La aplicación permite a los usuarios explorar películas populares y noticias relacionadas con tecnología, con soporte para modo oscuro.

## Características Principales
- Exploración de películas populares
- Visualización de detalles de películas
- Sección de noticias
- Modo oscuro/claro
- Diseño responsivo con Tailwind CSS
- Scroll infinito para la carga de películas

## APIs Utilizadas

### 1. The Movie Database (TMDB) API
- **URL Base**: `https://api.themoviedb.org/3`
- **Endpoints utilizados**:
  - `/movie/popular`: Obtiene lista de películas populares
  - `/movie/{movie_id}`: Obtiene detalles específicos de una película
- **Características**:
  - Soporte multilenguaje (configurado en español)
  - Incluye información detallada de películas
  - Proporciona URLs de imágenes de pósters

### 2. News API
- **URL Base**: `https://newsapi.org/v2`
- **Endpoint utilizado**: 
  - `/top-headlines`: Obtiene noticias principales
- **Configuración**:
  - Categoría: Tecnología
  - País: Estados Unidos
  - Filtrado de artículos inválidos o removidos

## Estructura del Proyecto
- 

App.tsx

: Componente principal
- 

News.tsx

: Componente de noticias
- 

styless.scss

: Estilos SASS
- 

index.css

: Estilos globales con Tailwind

## Tecnologías Utilizadas
- React 18
- TypeScript
- Tailwind CSS
- SASS
- Axios para peticiones HTTP
- React Router para navegación
- Vite como bundler

## Configuración del Proyecto
Para ejecutar el proyecto:

```bash
# Instalación de dependencias
npm install

# Desarrollo
npm run dev

# Construcción
npm run build
```
