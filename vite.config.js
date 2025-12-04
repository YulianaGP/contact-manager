import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from "url";   // 👈 utilidades de Node para formar rutas

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // 1) "@" apunta a la carpeta src/
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    }
  }
})
