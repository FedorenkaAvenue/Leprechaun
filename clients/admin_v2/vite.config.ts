import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 80,
        hmr: {
            host: 'localhost',
            clientPort: 5173,
        }
    }
})