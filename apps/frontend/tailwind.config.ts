import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/react/**/*.{ts,tsx}",
    "./node_modules/@fastack/**/*.{ts,tsx,mjs,cjs}",
  ],
  theme: {},
  plugins: [],
};
export default config;
