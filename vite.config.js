import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serve o site em um subpath (/<repo>/). Detectamos o nome do
// repositório automaticamente via GITHUB_REPOSITORY (formato "<owner>/<repo>").
// Em qualquer outro ambiente (domínio próprio, dev local), a base volta a '/'.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const isGHActions = !!process.env.GITHUB_ACTIONS
const base = isGHActions && repoName ? `/${repoName}/` : '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg', 'icons/apple-touch-icon.png', 'icons/apple-touch-icon-120.png', 'icons/apple-touch-icon-152.png', 'icons/apple-touch-icon-167.png', 'icons/favicon-32.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable.png'],
      manifest: {
        name: 'Neves Finance',
        short_name: 'Neves',
        description: 'Controle financeiro pessoal',
        theme_color: '#0080FF',
        background_color: '#F7F7F7',
        display: 'standalone',
        orientation: 'portrait',
        scope: base,
        start_url: base,
        lang: 'pt-BR',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/apple-touch-icon-167.png',
            sizes: '167x167',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/apple-touch-icon-152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/apple-touch-icon-120.png',
            sizes: '120x120',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
