"use client";

import { useState } from 'react';

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

  return (
    <main className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-2/3">
        <h1 className="text-4xl font-bold text-center mb-4">Pesquisar Filmes</h1>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Digite o nome do filme"
            className="border border-gray-300 rounded-l-md p-2 w-1/3"
          />
          <button 
            onClick={handleSearch}
            className="inline-flex items-center rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Pesquisar
          </button>
        </div>

        {loading && <div>Carregando...</div>}
        {error && <div className="text-red-600">{error}</div>}

        <h2 className="text-2xl font-semibold mt-4">Resultados da Pesquisa:</h2>
        <ul className="space-y-4 mt-2">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <li 
                key={movie.imdbID} 
                onClick={() => handleMovieClick(movie.imdbID)} 
                className="cursor-pointer border-b border-gray-300 pb-2"
              >
                <strong>Título:</strong> {movie.Title} <br />
                <strong>Ano:</strong> {movie.Year} <br />
                {movie.Poster !== "N/A" && (
                  <img src={movie.Poster} alt={movie.Title} width={100} className="mt-2" />
                )}
              </li>
            ))
          ) : (
            <div>Nenhum filme encontrado.</div>
          )}
        </ul>
      </div>

      {selectedMovie && (
        <div className="mt-6 md:mt-0 md:ml-6 w-full md:w-1/3 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold">Detalhes do Filme</h2>
          <div className="flex flex-col items-center">
            <img src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "image_not_found.png"} alt="movie poster" className="w-1/2 mt-2" />
            <h3 className="text-xl font-bold mt-2">{selectedMovie.Title}</h3>
            <ul className="mt-2">
              <li>Ano: {selectedMovie.Year}</li>
              <li>Classificação: {selectedMovie.Rated}</li>
              <li>Lançado: {selectedMovie.Released}</li>
              <li>Gênero: {selectedMovie.Genre}</li>
              <li>Roteirista: {selectedMovie.Writer}</li>
              <li>Atores: {selectedMovie.Actors}</li>
              <li>Enredo: {selectedMovie.Plot}</li>
              <li>Idioma: {selectedMovie.Language}</li>
              <li>Awards: {selectedMovie.Awards}</li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}