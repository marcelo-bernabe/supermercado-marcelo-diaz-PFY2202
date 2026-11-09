import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' permite que el sitio funcione dentro de GitHub Pages
// (https://usuario.github.io/supermercado-marcelo-diaz-pfy2202/)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
