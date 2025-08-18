import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/widget.tsx"),
      name: "ConvofyWidget",
      fileName: "widget",
      formats: ["iife"], // Immediately Invoked Function Expression for browser
    },
    rollupOptions: {
      external: [], // Don't externalize any dependencies
      output: {
        // Put everything in one file
        inlineDynamicImports: true,
        assetFileNames: "widget.[ext]",
        globals: {
          // Ensure the library is available globally
        },
      },
    },
    outDir: "dist/widget",
    emptyOutDir: true,
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
