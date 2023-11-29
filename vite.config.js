import { resolve } from 'path'
import { defineConfig } from 'vite'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  publicDir: false,
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    outDir: 'Resources/Public/Out',
    lib: {
      entry: [
        resolve(__dirname, 'Resources/Public/JavaScript/Src/main.js'),
        resolve(__dirname, 'Resources/Public/JavaScript/Src/lightbox.js'),
        resolve(__dirname, 'Resources/Public/JavaScript/Src/accordion.js'),
      ],
      name: 'skeleton',
      fileName: '[name].bundle',
      formats: [
        'es'
      ]
    },
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.match('.css')) {
            return '[name].bundle.css'
          }

          return assetInfo.name
        }
      }
    }
  }
})
