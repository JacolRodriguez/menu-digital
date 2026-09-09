import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/menu-digital/', // <--- ¡Importante! Pon aquí el nombre exacto de tu repo entre barras
})