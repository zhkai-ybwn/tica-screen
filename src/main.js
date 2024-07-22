/*
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-02-21 14:22:08
 * @LastEditors: zhkai 2572429235@qq.com
 * @LastEditTime: 2023-10-18 14:26:01
 * @FilePath: \tica-energy-plant\src\main.js
 * @Description: main.js
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { loadConfig } from './utils'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import * as Icons from '@ant-design/icons-vue'

loadConfig().then(() => {
    const app = createApp(App)
    app.use(createPinia())
    .use(router)
    .use(Antd)
    .mount('#app')

    // 全局使用图标，遍历引入
    const icons = Icons
    for (const i in icons) {
        app.component(i, icons[i])
    }
}).catch((error) => {
    console.error('Failed to load config:', error)
})
