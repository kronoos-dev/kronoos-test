import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@mui/material": "@mui/material", // Certifique-se de que os aliases estão configurados corretamente
    },
  },
});
