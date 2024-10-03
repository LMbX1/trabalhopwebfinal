import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Bem-vindo ao Sistema de Filmes</h1>
      
      <ul className="space-y-4 text-center">
        <li>
          <div className="mt-5 flex justify-center">
            <Link
              href="/genero"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Adicionar ou remover
            </Link>
          </div>
        </li>
        <li>
          <div className="mt-10 flex justify-center">
            <Link
              href="/filme"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Adicionar filmes
            </Link>
          </div>
        </li>
        <li>
          <div className="mt-10 flex justify-center">
            <Link
              href="/carregar-filmes"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Carregar Filmes do banco de dados
            </Link>
          </div>
        </li>
        <li>
          <div className="mt-10 flex justify-center">
            <Link
              href="/pesquisa-filmes"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Pesquisar Filmes do OMDb
            </Link>
          </div>
        </li>
        <li>
          <div className="mt-10 flex justify-center">
            <Link
              href="/carregar-200"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Carregar 200 filmes do OMDb
            </Link>
          </div>
        </li>
      </ul>
    </main>
  );
}
