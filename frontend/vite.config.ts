import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or whatever framework you are using

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite's default port
    proxy: {
      // Assuming your backend routes start with /api
      '/api': {
        target: 'http://localhost:5432', // Replace 8080 with your backend port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})