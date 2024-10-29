import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/student": {
        target: "http://localhost:7007",
        secure: false,
      },
    },
  },

  plugins: [react()],
});
