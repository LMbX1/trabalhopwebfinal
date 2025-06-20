"use client";

import { useState } from 'react';
import { Search, Film, Calendar, Star, Award, Users, Globe, FileText, Clock, X } from 'lucide-react';

interface OmdbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Genre: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Awards: string;
  Poster: string;
  imdbRating?: string;
  Runtime?: string;
  Director?: string;
}

export default function SearchMovies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<OmdbMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_KEY = '305e8840'; 

  const handleSearch = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://omdbapi.com/?s=${searchTerm}&page=1&apikey=${API_KEY}`);
  
      if (!response.ok) {
        throw new Error('Erro ao buscar filmes');
      }
  
      const data = await response.json();
  
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (error) {
      setError('Erro ao buscar filmes. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMovieClick = async (imdbID: string) => {
    try {
      const response = await fetch(`https://omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        setError(data.Error);
      }
    } catch (error) {
      setError('Erro ao buscar detalhes do filme. Tente novamente.');
      console.error(error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const closeDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none ">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 justify-center">
        
        {/* Search Section */}
        <div className="w-full lg:w-2/3">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              🎬 Pesquisar Filmes
            </h1>
            <p className="text-gray-600 text-lg">Explore o vasto catálogo do OMDb</p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyUp={handleKeyPress}
                  placeholder="Digite o nome do filme..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute left-4 top-1/4 transform text-1xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  🔍     
                </div>
              </div>
              <button 
                onClick={handleSearch}
                disabled={loading || !searchTerm.trim()}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Buscando...</span>
                  </div>
                ) : (
                  'Pesquisar'
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center space-x-3 text-red-700">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4" />
                </div>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Results Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
              <Film className="w-7 h-7 text-indigo-600" />
              <span>Resultados da Pesquisa ({movies.length})</span>
            </h2>

            {movies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movies.map((movie) => (
                  <div 
                    key={movie.imdbID}
                    onClick={() => handleMovieClick(movie.imdbID)} 
                    className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 hover:border-indigo-300 hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500"
                  >
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        {movie.Poster !== "N/A" ? (
                          <img 
                            src={movie.Poster} 
                            alt={movie.Title} 
                            className="w-24 h-32 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                          />
                        ) : (
                          <div className="w-24 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center shadow-lg">
                            <Film className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 truncate text-lg mb-2">
                          {movie.Title}
                        </h3>
                        
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{movie.Year}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-gray-500 mb-4">
                          <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                          <span className="text-sm capitalize">{movie.Type}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-indigo-600 font-medium text-sm group-hover:text-indigo-700">
                          <span>Ver detalhes</span>
                          <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            <span className="text-white text-xs">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !loading && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Film className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  {searchTerm ? 'Digitando...' : 'Digite um termo para começar a pesquisa'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Movie Details Sidebar */}
        {selectedMovie && (
          <div className="w-full lg:w-1/3 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 sticky top-4 max-h-screen overflow-hidden">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-500" />
                <span>Detalhes</span>
              </h2>
              <button 
                onClick={closeDetails}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
              {/* Movie Poster */}
              <div className="text-center mb-6">
                {selectedMovie.Poster !== "N/A" ? (
                  <img 
                    src={selectedMovie.Poster} 
                    alt={selectedMovie.Title}
                    className="w-48 h-64 object-cover rounded-2xl shadow-2xl mx-auto"
                  />
                ) : (
                  <div className="w-48 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                    <Film className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Movie Title */}
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6 leading-tight">
                {selectedMovie.Title}
              </h3>

              {/* Movie Details */}
              <div className="space-y-4">
                <DetailItem icon={Calendar} label="Ano" value={selectedMovie.Year} />
                <DetailItem icon={Award} label="Classificação" value={selectedMovie.Rated} />
                <DetailItem icon={Clock} label="Lançado" value={selectedMovie.Released} />
                <DetailItem icon={Film} label="Gênero" value={selectedMovie.Genre} />
                {selectedMovie.Runtime && (
                  <DetailItem icon={Clock} label="Duração" value={selectedMovie.Runtime} />
                )}
                {selectedMovie.Director && (
                  <DetailItem icon={Users} label="Diretor" value={selectedMovie.Director} />
                )}
                <DetailItem icon={Users} label="Roteirista" value={selectedMovie.Writer} />
                <DetailItem icon={Users} label="Atores" value={selectedMovie.Actors} />
                <DetailItem icon={Globe} label="Idioma" value={selectedMovie.Language} />
                {selectedMovie.imdbRating && (
                  <DetailItem icon={Star} label="Avaliação IMDb" value={selectedMovie.imdbRating + "/10"} />
                )}
                <DetailItem icon={Award} label="Prêmios" value={selectedMovie.Awards} />
                
                {/* Plot */}
                <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Enredo</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{selectedMovie.Plot}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Component for detail items
const DetailItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-start space-x-3 p-3 bg-gray-50/50 rounded-xl">
    <Icon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
    <div className="min-w-0 flex-1">
      <span className="font-semibold text-gray-800 text-sm">{label}:</span>
      <span className="text-gray-600 text-sm ml-2">{value}</span>
    </div>
  </div>
);