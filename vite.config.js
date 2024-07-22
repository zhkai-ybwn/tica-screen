/*
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-09-18 16:37:58
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-10-26 11:23:28
 * @FilePath: \tica-energy-plant\vite.config.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'

export default defineConfig({
    plugins: [
        eslintPlugin(),
        vue(),
        AutoImport({
            imports: ['vue'],
            dts: false,
            eslintrc: {
                enabled: true,
            },
        }),
    ],
    server: {
        host: true,
        // proxy: {
        //     '/energyPlant': {
        //         target: 'http://192.168.0.52:8083/',
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/energyPlant/, ''),
        //     },
        // },
    },
    resolve: {
        alias: {
            '#': path.resolve(__dirname, './public/'),
            '@': path.resolve(__dirname, './src/'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/style/index.scss";',
            },
        },
    },
    base: './',
})
