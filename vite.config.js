import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: './src/index',
            formats: ['es', 'cjs'],
        },
    },
    plugins: [
        dts({
            exclude: './src/**/*.test.ts',
        }),
    ],
})