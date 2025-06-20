'use client'; 

import { useState, useEffect, FormEvent } from 'react';

interface Genero {
  id: number;
  nome: string;
}

export default function Genero() {
  const [nome, setNome] = useState<string>(''); 
  const [generos, setGeneros] = useState<Genero[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    fetchGeneros();
  }, []);

  const fetchGeneros = async () => {
    try {
      const response = await fetch('/api/generos');
      if (!response.ok) throw new Error('Erro ao buscar gêneros');
      const data: Genero[] = await response.json();
      setGeneros(data);
    } catch (err) {
      setError('Erro ao carregar gêneros');
      console.error("Erro ao buscar gêneros:", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      setError('Por favor, digite o nome do gênero');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/generos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim() }),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar gênero');

      setNome('');
      setSuccess('Gênero adicionado com sucesso!');
      await fetchGeneros();
      
      // Remove success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Erro ao cadastrar o gênero');
      console.error("Erro ao cadastrar o gênero:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, nomeGenero: string) => {
    if (confirm(`Tem certeza que deseja deletar o gênero "${nomeGenero}"?`)) {
      try {
        const response = await fetch('/api/generos', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
  
        if (response.ok) {
          setGeneros((prevGeneros) => prevGeneros.filter((genero) => genero.id !== id));
          setSuccess('Gênero deletado com sucesso!');
          setTimeout(() => setSuccess(''), 3000);
        } else {
          setError('Erro ao deletar gênero');
        }
      } catch (error) {
        setError('Erro ao deletar gênero');
        console.error('Erro ao deletar gênero:', error);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🎭 Gerenciar Gêneros
          </h1>
          <p className="text-gray-600 text-lg">Organize e categorize seus filmes por gênero</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Add Genre Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <span>➕</span>
              <span>Adicionar Novo Gênero</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Ação, Comédia, Drama..."
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    disabled={loading}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🎬
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading || !nome.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adicionando...</span>
                    </div>
                  ) : (
                    'Adicionar Gênero'
                  )}
                </button>
              </div>
            </form>

            {/* Success/Error Messages */}
            {success && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-green-700">
                  <span>✅</span>
                  <span>{success}</span>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-red-700">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>

          {/* Genres List */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <span>📚</span>
                <span>Gêneros Cadastrados</span>
              </h2>
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-full">
                <span className="text-purple-700 font-semibold">{generos.length} gêneros</span>
              </div>
            </div>

            {generos.length > 0 ? (
              <div className="grid gap-4">
                {generos.map((genero, index) => (
                  <div 
                    key={genero.id} 
                    className="group bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-4 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">
                            {genero.nome}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            ID: {genero.id}
                          </p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleDelete(genero.id, genero.nome)} 
                        className="group-hover:opacity-100 opacity-70 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>🗑️</span>
                        <span>Deletar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhum gênero cadastrado
                </h3>
                <p className="text-gray-500">
                  Adicione seu primeiro gênero usando o formulário acima
                </p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          {generos.length > 0 && (
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">📊 Estatísticas</h3>
                  <p className="opacity-90">
                    Você tem <strong>{generos.length}</strong> gênero{generos.length !== 1 ? 's' : ''} cadastrado{generos.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-4xl opacity-75">
                  🎬
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}