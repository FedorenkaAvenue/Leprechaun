import type { Config } from "tailwindcss";
import tailwindcssAnimate from 'tailwindcss-animate';
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            primary: 'var(--primary)',
            'primary-foreground': 'var(--primary-foreground)',
            secondary: 'var(--secondary)',
            'secondary-foreground': 'var(--secondary-foreground)',
            achtung: 'var(--achtung)',
            'achtung-foreground': 'var(--achtung-foreground)',
            'achtung-secondary': 'var(--achtung-secondary)',
            'achtung-secondary-foreground': 'var(--achtung-secondary-foreground)',
        },
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
        }
    },
    plugins: [
        tailwindcssAnimate,
        function ({ addVariant }: PluginAPI) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
        }
    ],
};

export default config;
