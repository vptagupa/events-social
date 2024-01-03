import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.ts",
    ],

    theme: {
        extend: {
            screens: {
                xs: "375px",
            },
        },
    },
    plugins: [scrollbar],
};
