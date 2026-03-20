import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'AMAUI - Asistente y Salud',
        short_name: 'AMAUI',
        description: 'Te ayuda a tomar tus medicinas y controlar tu salud, mientras te enseña paso a paso a usar tu celular.',
        theme_color: '#6FAF8F',
        background_color: '#F7F4ED',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
