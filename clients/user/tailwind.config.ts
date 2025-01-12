import tailwindcssAnimate from 'tailwindcss-animate';
import { PluginAPI } from "tailwindcss/types/config";
import resolveConfig from 'tailwindcss/resolveConfig'

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            primary: 'var(--primary)',
            'primary-foreground': 'var(--primary-foreground)',
            secondary: 'rgba(var(--secondary))',
            'secondary-foreground': 'var(--secondary-foreground)',
            success: 'rgb(var(--success))',
            achtung: 'var(--achtung)',
            'achtung-foreground': 'var(--achtung-foreground)',
            'achtung-secondary': 'var(--achtung-secondary)',
            'achtung-secondary-foreground': 'var(--achtung-secondary-foreground)',
            action: 'rgb(var(--action))',
            'action-hover': 'rgb(var(--action-hover))',
            overlay: 'rgba(var(--overlay))',
            popover: 'var(--popover)',
            'popover-foreground': 'var(--popover-foreground)',
        },
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)'
            },
            borderRadius: {
                DEFAULT: 'var(--frame-radius)',
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

export const twConfig = resolveConfig<typeof config>(config);

export default config;
