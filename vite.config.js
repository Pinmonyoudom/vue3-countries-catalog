import vue from '@vitejs/plugin-vue2'
import path from 'path';
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

export default {
    base: '/vue3-countries-catalog/',
    plugins: [
        vue(),
        Components({
            resolvers: [VuetifyResolver()], 
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
}