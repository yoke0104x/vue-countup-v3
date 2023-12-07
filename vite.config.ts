import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: 'tsconfig.json',
      rollupTypes: true
    })
  ],
  // base: '/vue-countup-v3',
  build: {
    lib: {
      // 入口指向组件库入口模块
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'vue3-countup',
      // 构建生成的文件名，与package.json中配置一致
      fileName: 'vue3-countup',
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})