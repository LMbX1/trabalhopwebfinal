"use client";
import React, { useEffect, useState } from 'react';

const CarregarFilmes = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

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
      } catch (error) {
        setMessage('Erro ao carregar filmes: ' + (error as Error).message);
      } finally {
        setLoading(false); 
      }
    };

    carregarFilmes();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return <div>{message}</div>;
};

export default CarregarFilmes;
