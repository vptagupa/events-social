import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

import path from "node:path";
import { createRequire } from "node:module";

import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

console.log(import.meta);
const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
    path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "cmaps")
);

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/assets/scss/app.scss", "resources/js/app.jsx"],
            refresh: true,
        }),
        viteStaticCopy({
            targets: [
                {
                    src: cMapsDir,
                    dest: "",
                },
            ],
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
