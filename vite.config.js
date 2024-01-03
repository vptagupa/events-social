import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/assets/scss/app.scss", "resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
    ],
    server: {
        hmr: {
            host: "localhost",
        },
        watch: {
            usePolling: true,
        },
    },
    resolve: {
        alias: {
            "@": "/resources",
        },
    },
});
