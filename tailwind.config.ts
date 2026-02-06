import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#C82AEF',
        'accent-light': '#e3caff',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      borderRadius: {
        'marko': '25px',
      },
    },
  },
  plugins: [],
};

export default config;
