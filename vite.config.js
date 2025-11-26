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
      "/data": {
        target: "https://lalanow-backend-v3.fly.dev/data", // formerly, https://lahelpnow-backend-v2.fly.dev/
        changeOrigin: true,
      },
      "/resources": {
        target: "https://lalanow-backend-v3.fly.dev/resources/all", // formerly, localhost:3001
        changeOrigin: true,
      },
      "/translate": {
        target: "https://api-free.deepl.com/v2/translate",
        changeOrigin: true,
      },
    }, // end proxy key
  }, // end server key
});