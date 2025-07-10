
/// <reference types="node" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
    host: 'parfumduroi.local',
    port: 5173,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../backend/certs/parfumduroi.local+3-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../backend/certs/parfumduroi.local+3.pem'))
    }
  }
})


