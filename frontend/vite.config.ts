import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/NOT-TEMU/",
  server: {
    port: 5173
  }
});