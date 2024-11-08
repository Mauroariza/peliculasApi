// News.tsx
import React from 'react';

interface NewsArticle {
    urlToImage: string;
    title: string;
    description: string;
    url: string;
  }
  
  interface NewsProps {
    news: NewsArticle[];
    newsLoading: boolean;
    newsError: string;
    darkMode: boolean;
  }
  
  const News: React.FC<NewsProps> = ({ news, newsLoading, newsError, darkMode }) => {
    if (newsLoading) return <div>Cargando noticias...</div>;
    if (newsError) return <div className="text-red-500">{newsError}</div>;
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <div key={article.url} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="mt-2 text-sm">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 inline-block">Leer más</a>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default News;