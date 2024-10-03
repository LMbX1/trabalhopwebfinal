"use client"; 

import { useEffect, useState } from 'react';

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

  if (loading) {
    return <div className="text-center">Carregando filmes...</div>;
  }

  return (
    <main className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-center mb-4">Filmes Salvos no Banco de Dados</h1>
      <ul className="space-y-4">
        {filmes.map((filme) => (
          <li key={filme.id} className="bg-white p-4 rounded-md shadow-md">
            <strong>Título:</strong> {filme.titulo} <br />
            <strong>Ano:</strong> {filme.ano} <br />
            <strong>Diretor:</strong> {filme.diretor} <br />
            <strong>Gênero:</strong> {filme.genero} <br />
            <button 
              onClick={() => handleDelete(filme.id)} 
              className="mt-2 bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-500"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
