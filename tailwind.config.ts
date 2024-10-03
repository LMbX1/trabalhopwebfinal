import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/carregar-filmes/page.{js,ts,jsx,tsx,mdx}",
    "./src/app/pesquisa-filmes/page.{js,ts,jsx,tsx,mdx}",
    "./src/app/filme/page.{js,ts,jsx,tsx,mdx}",
    "./src/app/genero/page.{js,ts,jsx,tsx,mdx}",
    "./src/app/page.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
