"use client";

import { useEffect, useState } from 'react';
import { Film, Calendar, User, Star, Trash2, X } from 'lucide-react';

interface Movie {
  id: number;
  titulo: string;
  ano: number;
  generoId: number; 
  diretor: string;
  genero: string;
}

export default function MovieList() {
  const [filmes, setFilmes] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await fetch('/api/filmes');

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const data: Movie[] = await response.json();
        setFilmes(data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmes();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar este filme?')) {
      try {
        const response = await fetch('/api/filmes', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          setFilmes((prevFilmes) => prevFilmes.filter((filme) => filme.id !== id));
          console.log('Filme deletado com sucesso.');
        } else {
          console.error('Erro ao deletar filme.');
        }
      } catch (error) {
        console.error('Erro ao deletar filme:', error);
      }
    }
  };

  const closeDetails = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Carregando filmes...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 justify-center">
        
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              🎬 Filmes Salvos
            </h1>
            <p className="text-gray-600 text-lg">Sua coleção pessoal de filmes</p>
          </div>

          {/* Movies List */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
              <Film className="w-7 h-7 text-indigo-600" />
              <span>Minha Coleção ({filmes.length})</span>
            </h2>

            {filmes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filmes.map((filme) => (
                  <div 
                    key={filme.id}
                    onClick={() => setSelectedMovie(filme)} 
                    className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 hover:border-indigo-300 hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500"
                  >
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-32 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                          <Film className="w-8 h-8 text-indigo-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 truncate text-lg mb-2">
                          {filme.titulo}
                        </h3>
                        
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{filme.ano}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{filme.diretor}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-gray-500 mb-4">
                          <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                          <span className="text-sm">{filme.genero}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-indigo-600 font-medium text-sm group-hover:text-indigo-700">
                            <span>Ver detalhes</span>
                            <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                              <span className="text-white text-xs">→</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(filme.id);
                            }}
                            className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors duration-200 opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Film className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  Nenhum filme encontrado em sua coleção
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
              {/* Movie Poster Placeholder */}
              <div className="text-center mb-6">
                <div className="w-48 h-64 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                  <Film className="w-16 h-16 text-indigo-600" />
                </div>
              </div>

              {/* Movie Title */}
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6 leading-tight">
                {selectedMovie.titulo}
              </h3>

              {/* Movie Details */}
              <div className="space-y-4">
                <DetailItem icon={Calendar} label="Ano" value={selectedMovie.ano.toString()} />
                <DetailItem icon={User} label="Diretor" value={selectedMovie.diretor} />
                <DetailItem icon={Film} label="Gênero" value={selectedMovie.genero} />
                <DetailItem icon={Star} label="ID do Gênero" value={selectedMovie.generoId.toString()} />
                
                {/* Delete Button */}
                <div className="pt-4">
                  <button
                    onClick={() => {
                      handleDelete(selectedMovie.id);
                      closeDetails();
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Deletar Filme</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const DetailItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-start space-x-3 p-3 bg-gray-50/50 rounded-xl">
    <Icon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
    <div className="min-w-0 flex-1">
      <span className="font-semibold text-gray-800 text-sm">{label}:</span>
      <span className="text-gray-600 text-sm ml-2">{value}</span>
    </div>
  </div>
);