'use client'; 

import { useState, useEffect, FormEvent } from 'react';


interface Genero {
  id: number;
  nome: string;
}

export default function Genero() {
  const [nome, setNome] = useState<string>(''); 
  const [generos, setGeneros] = useState<Genero[]>([]); 

  useEffect(() => {
  
    fetch('/api/generos')
      .then((res) => res.json())
      .then((data: Genero[]) => setGeneros(data)) 
      .catch((err) => console.error("Erro ao buscar gêneros:", err)); 
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/generos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome }),
      });

      
      setNome('');

      
      fetch('/api/generos')
        .then((res) => res.json())
        .then((data: Genero[]) => setGeneros(data))
        .catch((err) => console.error("Erro ao buscar gêneros atualizados:", err));
    } catch (error) {
      console.error("Erro ao cadastrar o gênero:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar este gênero?')) {
      try {
        const response = await fetch('/api/generos', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
  
        if (response.ok) {
          setGeneros((prevGeneros) => prevGeneros.filter((genero) => genero.id !== id));
          console.log('Gênero deletado com sucesso.');
        } else {
          console.error('Erro ao deletar gênero.');
        }
      } catch (error) {
        console.error('Erro ao deletar gênero:', error);
      }
    }
  };

  return (
    <main className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-center mb-4">Cadastro de Gêneros</h1>
      <form onSubmit={handleSubmit} className="flex justify-center mb-4">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do gênero"
          className="border border-gray-300 rounded-l-md p-2 w-1/3"
        />
        <button 
          type="submit" 
          className="inline-flex items-center rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Adicionar Gênero
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-2">Gêneros Cadastrados</h2>
      <ul className="space-y-4">
        {generos.map((genero) => (
          <li key={genero.id} className="flex justify-between items-center border-b border-gray-300 pb-2">
            <div className="flex items-center space-x-2">
              <strong>Nome:</strong> <span>{genero.nome}</span>
            </div>
            <button 
              onClick={() => handleDelete(genero.id)} 
              className="text-red-600 hover:text-red-800 ml-1"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}