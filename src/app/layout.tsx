import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        {}
        <header className="bg-indigo-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold">Sistema de Filmes</h1>
          </div>
        </header>

        {}
        <main className="flex-grow container mx-auto p-6">
          {children}
        </main>

        {}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <div className="container mx-auto">
            <p>&copy; {new Date().getFullYear()} Sistema de Filmes. Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
