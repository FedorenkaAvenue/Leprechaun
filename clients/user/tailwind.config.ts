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
            secondary: 'var(--secondary)',
            'secondary-foreground': 'var(--secondary-foreground)',
            success: 'var(--success)',
            achtung: 'var(--achtung)',
            'achtung-foreground': 'var(--achtung-foreground)',
            'achtung-secondary': 'var(--achtung-secondary)',
            'achtung-secondary-foreground': 'var(--achtung-secondary-foreground)',
            action: 'var(--action)',
            'action-hover': 'var(--action-hover)',
            'action-active': 'var(--action-active)',
            overlay: 'var(--overlay)',
            popover: 'var(--popover)',
            'popover-foreground': 'var(--popover-foreground)',
            'muted-primary': 'var(--muted-primary)',
            'muted-primary-foreground': 'var(--muted-primary-foreground)',
            'muted-secondary': 'var(--muted-secondary)',
            'muted-secondary-foreground': 'var(--muted-secondary-foreground)',
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
