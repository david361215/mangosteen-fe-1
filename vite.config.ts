import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svgstore } from './src/vite_plugins/svgstore'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    define:
      command === 'build'
        ? {
            DEBUG: false
          }
        : {
            DEBUG: true
          },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes('echarts')) {
              return 'echarts'
            }
            if (id.includes('mock') || id.includes('faker')) {
              return 'mock'
            }
            if (id.includes('vant')) {
              return 'vant'
            }
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },
    plugins: [
      vue(),
      vueJsx({
        transformOn: true,
        mergeProps: true
      }),
      svgstore()
    ],
    server: {
      port: 5168,
      host: "0.0.0.0",
      proxy: {
        '/api/v1': {
          target: 'http://8.138.147.80:3000/'
        }
      }
    }
  }
})
