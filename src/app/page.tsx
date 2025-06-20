import Link from 'next/link';
import { Theater, Film, Database, Search, Zap, Heart } from 'lucide-react';

export default function Home() {
  const menuItems = [
    {
      href: '/genero',
      title: 'Gerenciar Gêneros',
      description: 'Adicione ou remova gêneros de filmes',
      icon: Theater,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100'
    },
    {
      href: '/filme',
      title: 'Adicionar Filmes',
      description: 'Cadastre novos filmes no sistema',
      icon: Film,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      href: '/carregar-filmes',
      title: 'Filmes do Banco',
      description: 'Visualize filmes salvos no banco de dados',
      icon: Database,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100'
    },
    {
      href: '/pesquisa-filmes',
      title: 'Pesquisar OMDb',
      description: 'Busque filmes na base do OMDb',
      icon: Search,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100'
    },
    {
      href: '/carregar-200',
      title: 'Importar 200 Filmes',
      description: 'Carregue uma grande quantidade de filmes do OMDb',
      icon: Zap,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      hoverColor: 'hover:bg-pink-100'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Film className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Sistema de Filmes
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Gerencie sua coleção de filmes de forma inteligente e eficiente
          </p>
          
          <div className="flex items-center justify-center mt-6 space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Sistema online e funcionando</span>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className={`group relative overflow-hidden rounded-3xl bg-white ${item.bgColor} ${item.hoverColor} border border-gray-100 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 ease-out cursor-pointer block`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Animated border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} style={{padding: '2px'}}>
                  <div className="w-full h-full bg-white rounded-3xl"></div>
                </div>
                
                <div className="relative p-8">
                  {/* Icon container */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center text-transparent bg-gradient-to-r ${item.color} bg-clip-text font-semibold group-hover:text-gray-800 transition-all duration-300`}>
                      <span>Acessar</span>
                    </div>
                    
                    <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500`}>
                      <svg 
                        className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-3xl font-bold text-indigo-600 mb-2">5</div>
            <div className="text-gray-600 text-sm">Funcionalidades</div>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-3xl font-bold text-purple-600 mb-2">1000 por dia</div>
            <div className="text-gray-600 text-sm">Filmes Suportados</div>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600 text-sm">Disponibilidade</div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-3 text-gray-500 text-sm bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <span>Desenvolvido com</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>para amantes do cinema</span>
          </div>
        </div>
      </div>
    </main>
  );
}