<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-23 10:00:35
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-28 11:21:02
 * @FilePath: \tica-energy-plant\src\components\energy-plant\header\Header.vue
 * @Description: 头部组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="header-container">
        <div class="logo-title">
            <div class="logo"></div>
            <div class="title">{{ state.title }}</div>
        </div>
        <!-- 模块导航 -->
        <div class="module-nav">
            <div
                v-for="(item,index) in state.moduleNav"
                :key="index"
                :class="['module-nav-item', index === moduleNavIndex ? 'module-nav-item-active' : '']" 
                @click="setModuleNavIndex(index)"
            >
                {{ item }}
            </div>
        </div>
        <div class="wea-sep-date">
            <WeatherInfo></WeatherInfo>
            <div class="separator"></div>
            <DateTime></DateTime>
        </div>
    </div>
</template>

<script setup>
import DateTime from '../common/DateTime.vue'
import WeatherInfo from '../common/WeatherInfo.vue'
import { useStore } from '@/store/index'

const state = reactive({
    title: window.ENERGYMONITOR.title,
    moduleNav: ['全厂能源监控', '设备态势监控', '光伏直驱发电'],
})

const moduleNavIndex = computed(() => useStore().moduleNav)

const setModuleNavIndex = (index) => {
    useStore().setModuleNav(index)
}

</script>

<style lang="scss" scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1920px;
    height: 88px;

    @include set-back("../../../assets/imgs/energy-plant/header-bg.png");

    .logo-title {
        display: flex;
        align-items: center;

        .logo {
            width: 120px;
            height: 31px;
            margin-left: 55px;

            @include set-back("../../../assets/imgs/energy-plant/energy-monitor-logo.png");
        }

        .title {
            margin-left: 16px;
            font-family: YouSheBiaoTiHei, sans-serif;
            font-size: 40px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: #fff;
            text-shadow: 0 3px 1px rgb(0 0 0 / 25%);
            letter-spacing: 4px;
        }
    }

    .module-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 792px;
        height: 80px;
        margin-top: -4px;

        .module-nav-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 267px;
            font-family: YouSheBiaoTiHei, sans-serif;
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: #fff;
            cursor: pointer;
        }

        .module-nav-item-active {
            width: 264px;
            height: 80px;

            @include set-back("@/assets/imgs/energy-plant/module_nav_active.png");
        }
    }

    .wea-sep-date {
        display: flex;
        align-items: center;

        .separator {
            width: 1px;
            height: 28px;
            margin-left: 20px;
            background: rgb(255 255 255 / 20%);
        }
    }
}
</style>
