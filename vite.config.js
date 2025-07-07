import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "url";   // 👈 utilidades de Node para formar rutas

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 1) "@" apunta a la carpeta src/
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // 2) (opcional) atajos extra
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url))
    }
  }
})
