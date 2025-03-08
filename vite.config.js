import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/data': {
        target: 'https://lahelpbackend-2.azurewebsites.net',
        changeOrigin: true,
      },
    }
  }
})