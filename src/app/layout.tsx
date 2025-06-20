import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import nextLogo from './images/next.png';
import { 
  Clapperboard,
  Home,
  Theater,
  Film,
  Search,
  Menu,
  Calendar,
  Heart,
  Box
} from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sistema de Filmes",
  description: "Gerencie seus filmes de forma eficiente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-4xl">
                  <Clapperboard className="w-20 h-20 text-purple-200" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Sistema de Filmes</h1>
                  <p className="text-indigo-100 text-sm hidden md:block">
                    Gerencie sua coleção cinematográfica
                  </p>
                </div>
              </div>
              
              {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-2"> {/* Removido o 'hidden' e 'lg:' */}
              <a href="/" 
              className="flex items-center space-x-2 px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 text-sm font-medium hover:scale-105"
              >
                <Home className="w-4 h-4" />
              <span>Início</span>
            </a>
            <a href="/genero" 
              className="flex items-center space-x-2 px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 text-sm font-medium hover:scale-105"
              >
                <Theater className="w-4 h-4" />
              <span>Gêneros</span>
            </a>
            <a href="/filme" 
              className="flex items-center space-x-2 px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 text-sm font-medium hover:scale-105"
              >
                <Film className="w-4 h-4" />
              <span>Filmes</span>
            </a>
            <a href="/pesquisa-filmes" 
              className="flex items-center space-x-2 px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 text-sm font-medium hover:scale-105"
              >
                <Search className="w-4 h-4" />
              <span>Pesquisar</span>
            </a>
          </nav>

              {/* Mobile Menu Button */}
              <a href="/" className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300">
                <Home className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Decorative bottom border */}
          <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Film className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Sistema de Filmes</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Sua plataforma completa para gerenciar, descobrir e organizar filmes de forma inteligente e eficiente.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Links Rápidos</h4>
                <div className="space-y-2">
                  <a href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                    <Home className="w-4 h-4" />
                    <span>Página Inicial</span>
                  </a>
                  <a href="/genero" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                    <Theater className="w-4 h-4" />
                    <span>Gerenciar Gêneros</span>
                  </a>
                  <a href="/filme" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                    <Film className="w-4 h-4" />
                    <span>Adicionar Filmes</span>
                  </a>
                  <a href="/pesquisa-filmes" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                    <Search className="w-4 h-4" />
                    <span>Pesquisar Filmes</span>
                  </a>
                </div>
              </div>

              {/* Info Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Informações</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <p className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Desenvolvido em {new Date().getFullYear()}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <img src={nextLogo.src} alt="Logo do Next.js" width="15" height="15" />
                    <span>Powered by Next.js</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Box className="w-4 h-4" />
                    <span>Interface responsiva</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-lg font-semibold text-white">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-white-400 text-sm">
                  &copy; {new Date().getFullYear()} Sistema de Filmes. Todos os direitos reservados.
                </p>
                <div className="flex items-center space-x-4 text-white-400 text-sm">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>Feito com carinho para cinéfilos</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}