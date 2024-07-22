<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-04 09:38:36
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-05 10:25:48
 * @FilePath: \tica-energy-plant\src\components\energy-plant\device-monitor\SwitchButton.vue
 * @Description: 空调设备和关键设备切换按钮组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="switch-btn-container">
        <!-- 空调设备 -->
        <div :class="[deviceType === 0 ? 'kt-active' : 'kt-normal']" @click="setDeviceType(0)">
            空调设备
        </div>
        <!-- 关键设备 -->
        <div :class="[deviceType === 1 ? 'gj-active' : 'gj-normal']" @click="setDeviceType(1)">
            关键设备
        </div>
    </div>
</template>

<script setup>
import { useStore } from '@/store/index'

const deviceType = computed(() => useStore().deviceType)

const setDeviceType = (type) => {
    useStore().setDeviceType(type)
}
</script>

<style lang="scss" scoped>
.switch-btn-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 262px;
    height: 149px;

    .kt-active {
        width: 262px;
        height: 87px;
        padding-top: 39px;
        padding-left: 109px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: #fff;
        text-shadow: 0 3px 4px rgb(0 0 0 / 10%);
        cursor: pointer;

        @include set-back("../../../assets/imgs/energy-plant/device-active.png");
    }

    .kt-normal {
        width: 189px;
        height: 56px;
        padding-top: 12px;
        padding-left: 40px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: rgb(255 255 255 / 50%);
        cursor: pointer;

        @include set-back("../../../assets/imgs/energy-plant/device-normal.png");
    }

    .gj-active {
        width: 262px;
        height: 87px;
        padding-top: 39px;
        padding-left: 109px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: #fff;
        text-shadow: 0 3px 4px rgb(0 0 0 / 10%);
        cursor: pointer;

        @include set-back("../../../assets/imgs/energy-plant/device-active.png");
    }

    .gj-normal {
        width: 189px;
        height: 56px;
        padding-top: 12px;
        padding-left: 40px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: rgb(255 255 255 / 50%);
        cursor: pointer;

        @include set-back("../../../assets/imgs/energy-plant/device-normal.png");
    }
}
</style>
