import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://host.docker.internal:8000/',
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
        watch: {
            usePolling: true,
        },
        host: '0.0.0.0',
        strictPort: true,
        port: 5173,
    },
});
