/*
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-02-21 14:22:08
 * @LastEditors: zhkai 2572429235@qq.com
 * @LastEditTime: 2023-10-17 09:05:00
 * @FilePath: \tica-energy-plant\src\utils\index.js
 * @Description: 加载配置文件，加上时间戳防止缓存
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
export async function loadConfig() {
    const existingScript = document.querySelector('script[src*="config.js"]')

    if (existingScript) {
        console.log('Script already loaded:', existingScript.src)
        return
    }

    // 创建一个全局变量来存储是否已经加载过config.js
    if (window.configScriptLoaded) {
        console.log('Script already loaded globally')
        return
    }

    const path = './config.js?t=' + Date.now()

    return new Promise((resolve, reject) => {
        const scriptHtml = document.createElement('script')
        scriptHtml.type = 'text/javascript'
        scriptHtml.src = path
        scriptHtml.async = true
        scriptHtml.onload = () => {
            console.log('Config script loaded:', path)

            // 将全局变量设置为true以表示已加载
            window.configScriptLoaded = true
            resolve()
        }
        scriptHtml.onerror = (error) => {
            console.error('Error loading config script:', error)
            reject(error)
        }

        document.head.appendChild(scriptHtml)
    })
}
