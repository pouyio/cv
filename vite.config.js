import { defineConfig } from "vite";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  server: {
    port: 1234,
  },
  build: {
    rollupOptions: {
      input: {
        es: "./es.html",
        en: "./en.html",
      },
    },
    emptyOutDir: false,
    sourceMap: false,
    outDir: "docs",
  },
});
