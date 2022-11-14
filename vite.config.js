import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            formats: ['es', 'cjs'],
        },
    },
    plugins: [
        dts(),
    ],
})