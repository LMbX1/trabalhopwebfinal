'use client';

import { useState, useEffect } from 'react';
import { Film, Calendar, User, Clapperboard, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/generos')
      .then(res => res.json())
      .then(data => setGeneros(data))
      .catch(() => setError('Erro ao carregar gêneros'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!titulo || !ano || !generoId || !diretor) {
      setError('Todos os campos são obrigatórios.');
      setLoading(false);
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
        setSuccess(true);
        setTitulo('');
        setAno('');
        setGeneroId('');
        setDiretor('');
        
        // Remove success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      setError('Erro ao enviar os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-6 py-8 flex flex-col justify-center min-h-screen">
        <div className="max-w-2xl mx-auto w-full">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Film className="w-8 h-8 text-white" />
              </div>
              <Sparkles className="w-8 h-8 text-indigo-500 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              🎬 Cadastro de Filme
            </h1>
            <p className="text-gray-600 text-lg">Adicione um novo filme ao catálogo</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl p-6 mb-8 transform animate-in slide-in-from-top duration-500">
              <div className="flex items-center space-x-3 text-green-700">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Filme cadastrado com sucesso! 🎉</p>
                  <p className="text-sm text-green-600">O filme foi adicionado ao catálogo.</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 mb-8 transform animate-in slide-in-from-top duration-500">
              <div className="flex items-center space-x-3 text-red-700">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Ops! Algo deu errado</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Título Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                  <Film className="w-4 h-4 text-indigo-600" />
                  <span>Título do Filme</span>
                </label>
                <div className="relative">
                  <input 
                    value={titulo} 
                    onChange={e => setTitulo(e.target.value)} 
                    placeholder="Ex: Vingadores: Ultimato" 
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                    <Film className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Ano Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Ano de Lançamento</span>
                </label>
                <div className="relative">
                  <input 
                    value={ano} 
                    onChange={e => setAno(e.target.value)} 
                    placeholder="Ex: 2019" 
                    type="number"
                    min="1900"
                    max="2030"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Gênero Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                  <Clapperboard className="w-4 h-4 text-indigo-600" />
                  <span>Gênero</span>
                </label>
                <div className="relative">
                  <select 
                    value={generoId} 
                    onChange={e => setGeneroId(e.target.value)} 
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300 appearance-none cursor-pointer"
                  >
                    <option value="">Selecione um gênero</option>
                    {generos.map(g => (
                      <option key={g.id} value={g.id}>
                        {g.nome}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                    <Clapperboard className="w-4 h-4" />
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Diretor Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>Diretor</span>
                </label>
                <div className="relative">
                  <input 
                    value={diretor} 
                    onChange={e => setDiretor(e.target.value)} 
                    placeholder="Ex: Christopher Nolan" 
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Salvando filme...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <CheckCircle className="w-5 h-5" />
                      <span>Salvar Filme</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer info */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Preencha todos os campos para cadastrar um novo filme no sistema
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}