"use client";
import React, { useEffect, useState } from 'react';
import { Film, CheckCircle, AlertCircle, Download, Loader } from 'lucide-react';

const CarregarFilmes = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const carregarFilmes = async () => {
      try {
        const response = await fetch('/api/carregar-200');

        //Verificando a resposta
        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }

        const data = await response.json();
        setMessage(data.message);
        setIsSuccess(true);
      } catch (error) {
        setMessage('Erro ao carregar filmes: ' + (error as Error).message);
        setIsError(true);
      } finally {
        setLoading(false); 
      }
    };

    carregarFilmes();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-6 py-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              🎬 Carregar Filmes
            </h1>
            <p className="text-gray-600 text-lg">Importando dados para o banco</p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            {loading ? (
              // Loading State
              <div className="text-center py-16">
                <div className="relative mx-auto mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <Film className="w-12 h-12 text-indigo-600" />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center space-x-3">
                    <Loader className="w-6 h-6 text-indigo-600 animate-spin" />
                    <span>Carregando filmes...</span>
                  </h2>
                  <p className="text-gray-600">
                    Aguarde enquanto importamos os dados para o banco de dados
                  </p>
                  
                  {/* Loading Animation */}
                  <div className="flex justify-center space-x-2 mt-6">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            ) : (
              // Result State
              <div className="text-center py-16">
                <div className="mx-auto mb-8">
                  {isSuccess ? (
                    <div className="w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  ) : isError ? (
                    <div className="w-24 h-24 bg-gradient-to-br from-red-200 to-rose-300 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <AlertCircle className="w-12 h-12 text-red-600" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Film className="w-12 h-12 text-indigo-600" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center space-x-3">
                    {isSuccess ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span>Sucesso!</span>
                      </>
                    ) : isError ? (
                      <>
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        <span>Erro</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-6 h-6 text-indigo-600" />
                        <span>Processo Concluído</span>
                      </>
                    )}
                  </h2>

                  {/* Message Display */}
                  <div className={`p-6 rounded-2xl border ${
                    isSuccess 
                      ? 'bg-green-50/80 border-green-200 backdrop-blur-sm' 
                      : isError 
                      ? 'bg-red-50/80 border-red-200 backdrop-blur-sm'
                      : 'bg-blue-50/80 border-blue-200 backdrop-blur-sm'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {isSuccess ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      ) : isError ? (
                        <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      ) : (
                        <Film className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className={`font-medium ${
                          isSuccess 
                            ? 'text-green-700' 
                            : isError 
                            ? 'text-red-700'
                            : 'text-blue-700'
                        }`}>
                          Resultado da Operação
                        </p>
                        <p className={`text-sm mt-1 ${
                          isSuccess 
                            ? 'text-green-600' 
                            : isError 
                            ? 'text-red-600'
                            : 'text-blue-600'
                        }`}>
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <button
                      onClick={() => window.location.reload()}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Executar Novamente
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Este processo carrega dados de filmes para o banco de dados
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarregarFilmes;