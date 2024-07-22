<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-21 10:07:28
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-29 10:10:27
 * @FilePath: \tica-energy-plant\src\views\FileOperation.vue
 * @Description: 文件操作页面
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="file-container">
        <a
            href="https://blockchain.aiot-fuca.com:10001/energyBase/energyMonitor/v1/tempDownload"
        >行政组织用电情况上传模板下载</a>
        <input type="file" @change="handleFileUpload" />
    </div>
</template>

<script setup>
import axiosAPI from '@/axios/index'

const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('multipartFile', file)
    try {
        const response = await axiosAPI.post(window.ENERGYMONITOR.urls.admOrgECinfoUpload, formData)
        console.log('File uploaded successfully:', response)
    } catch (error) {
        console.error('File upload failed:', error)
    }
}
</script>
