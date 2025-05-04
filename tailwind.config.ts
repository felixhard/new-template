import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--background) / <alpha-value>)",
                "background-secondary":
                    "rgb(var(--background-secondary) / <alpha-value>)",
                content: "rgb(var(--content) / <alpha-value>)",
                border: "rgb(var(--border) / <alpha-value>)",
                accent: "rgb(var(--accent) / <alpha-value>)",
                primary: "rgb(var(--primary) / <alpha-value>)",
                secondary: "rgb(var(--secondary) / <alpha-value>)",
            },

            backgroundImage: {
                // These are used in the saas template
                "heading-gradient":
                    "linear-gradient(90deg, #FFF 0%, #999 100%)",
                "badge-gradient":
                    "linear-gradient(90deg, #404BE3 0%, #B5B9FC 100%)",
                "bg-gradient":
                    "linear-gradient(118deg, #111 3.48%, rgba(17, 17, 17, 0.00) 100%)",
            },

            boxShadow: {
                primary: "0px 0px 50px 0px rgba(64, 75, 227, 0.20)",
            },
        },
    },
    plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
export default config;
