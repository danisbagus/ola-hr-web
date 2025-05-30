import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const proxyPath = env.VITE_API_URL

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(env.VITE_PORT),
      open: true,
      strictPort: true,
      proxy: {
        [proxyPath]: {
          target: env.VITE_PROXY,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${proxyPath}`), '')
        }
      }
    }
  }
})
