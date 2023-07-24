import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
<<<<<<< HEAD
=======
      injectRegister: 'auto',
>>>>>>> dev
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
<<<<<<< HEAD
      },
      injectRegister: 'auto',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'maskIcon.png',
=======
        runtimeCaching: [
          {
            handler: 'NetworkOnly',
            urlPattern: /\/api\/.*\/*.json/,
            method: 'POST',
            options: {
              backgroundSync: {
                name: 'myQueueName',
                options: {
                  maxRetentionTime: 24 * 60,
                },
              },
            },
          },
        ],
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'maskableIcon.png',
>>>>>>> dev
      ],
      manifest: {
        name: 'Beehive',
        short_name: 'Beehive',
<<<<<<< HEAD
        description: 'Create dummy portfolio together',
        background_color: '#ffffff',
        display: 'standalone',

        theme_color: '#ffffff',
        icons: [
          {
            src: 'bee192.png',
=======
        theme_color: '#000000',
        background_color: '#fff3be',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'maskableIcon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'bee192x192.png',
>>>>>>> dev
            sizes: '192x192',
            type: 'image/png',
          },
          {
<<<<<<< HEAD
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
=======
            src: 'bee256x256.png',
>>>>>>> dev
            sizes: '256x256',
            type: 'image/png',
          },
          {
<<<<<<< HEAD
            src: 'maskIcon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'android-chrome-512x512.png',
=======
            src: 'bee384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'bee512x512.png',
>>>>>>> dev
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
