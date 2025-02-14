import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
    base: mode === "development" ? "/" : "./", // ✅ Relative paths for production
    plugins: [react()],
    build: {
        outDir: "dist", // ✅ Ensure Electron finds built files
        emptyOutDir: true, // ✅ Clear old files before building
    },
    server: {
        port: 5173, // ✅ Ensure frontend runs on this port in dev
        proxy: {
            "/api": {
                target: "http://localhost:3000", // ✅ Redirect API calls to backend
                changeOrigin: true,
                secure: false, // ⚠️ Allow self-signed SSL if needed
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), // ✅ Alias for src directory
        },
    },
}));
