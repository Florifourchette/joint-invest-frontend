import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      injectRegister: 'auto',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'maskIcon.png',
      ],
      manifest: {
        name: 'Beehive',
        short_name: 'Beehive',
        description: 'Create dummy portfolio together',
        background_color: '#ffffff',
        display: 'standalone',

        theme_color: '#ffffff',
        icons: [
          {
            src: 'bee192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'bee512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'bee384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'bee256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'maskIcon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
