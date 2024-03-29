import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@': path.resolve(__dirname, './src'),
		},
	},
});
