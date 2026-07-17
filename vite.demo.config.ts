import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/react-page-signals/",
  plugins: [react()],
  build: {
    outDir: "demo-dist",
  },
});
