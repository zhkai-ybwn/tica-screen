<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-18 16:21:13
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-27 13:35:09
 * @FilePath: \tica-energy-plant\src\App.vue
 * @Description: 程序入口
-->
<template>
    <a-config-provider :locale="state.locale"><router-view></router-view></a-config-provider>
</template>

<script setup>
import { initMock } from '@/mock/index'
import { loadConfig } from '@/utils/index'
import { onBeforeMount } from 'vue'
import zhCN from 'ant-design-vue/lib/locale/zh_CN'

const state = reactive({
    locale: zhCN,
})
onBeforeMount(() => {
    loadConfig()
})
initMock()

</script>

<style lang='scss'>
@import "./assets/css/reset.css";

#app {
    height: 100vh;
    min-height: 919px;
}
</style>
