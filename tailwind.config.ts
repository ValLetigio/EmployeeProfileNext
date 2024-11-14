/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ], 
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    styled: true,
    themes: ["light", "dark", "synthwave", "dracula", "forest", "snow", "bumblebee", "halloween", "swiss", "lofi", "black", "luxury", "cupcake", "dark", "wireframe", "cyberpunk", "valentine", "aqua"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
export default config;
