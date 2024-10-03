'use client';

import { useState, useEffect } from 'react';


interface Genero {
  id: number;
  nome: string;
}

export default function FilmeForm() {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [generoId, setGeneroId] = useState('');
  const [diretor, setDiretor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
  
    fetch('/api/generos')
      .then(res => res.json())
      .then(data => setGeneros(data))
      .catch(() => setError('Erro ao carregar gêneros'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !ano || !generoId || !diretor) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await fetch('/api/filmes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          ano: parseInt(ano),
          generoId: parseInt(generoId),
          diretor,
        }),
      });

      if (!response.ok) {
        setError('Erro ao salvar filme.');
      } else {
        setError('');
        setTitulo('');
        setAno('');
        setGeneroId('');
        setDiretor('');
      }
    } catch (error) {
      setError('Erro ao enviar os dados.');
    }
  };

  return (
    <main className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-center mb-4">Cadastro de Filme</h1>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto bg-white p-4 rounded-md shadow-md">
        {error && <p className="text-red-600">{error}</p>}
        <input 
          value={titulo} 
          onChange={e => setTitulo(e.target.value)} 
          placeholder="Título" 
          className="border border-gray-300 rounded-md p-2 mb-4" 
        />
        <input 
          value={ano} 
          onChange={e => setAno(e.target.value)} 
          placeholder="Ano" 
          type="number" 
          className="border border-gray-300 rounded-md p-2 mb-4" 
        />
        <select 
          value={generoId} 
          onChange={e => setGeneroId(e.target.value)} 
          className="border border-gray-300 rounded-md p-2 mb-4"
        >
          <option value="">Selecione um gênero</option>
          {generos.map(g => (
            <option key={g.id} value={g.id}>
              {g.nome}
            </option>
          ))}
        </select>
        <input 
          value={diretor} 
          onChange={e => setDiretor(e.target.value)} 
          placeholder="Diretor" 
          className="border border-gray-300 rounded-md p-2 mb-4" 
        />
        <button 
          type="submit" 
          className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-500"
        >
          Salvar Filme
        </button>
      </form>
    </main>
  );
}