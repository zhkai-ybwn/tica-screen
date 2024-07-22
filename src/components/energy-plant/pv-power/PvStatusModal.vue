<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-14 09:15:34
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-14 10:34:44
 * @FilePath: \tica-energy-plant\src\components\energy-plant\pv-power\PvStatusModal.vue
 * @Description: 光伏状态面板
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div :class="['bg', statusInfo.type === 1 ? 'bg1' : statusInfo.type === 2 ? 'bg2' : 'bg3']">
        <div class="status-sign" :style="{background: `${statusInfo.status === '0' ? '#FFB800' : '#00FFF0'}`}"></div>
        <div class="status-label">{{ statusInfo.label }}</div>
    </div>
</template>

<script setup>
defineProps({
    statusInfo: {
        type: Object,
        default: () => ({
            status: '',
            label: '',
            type: 0,
        }),
    },
})
</script>

<style lang="scss" scoped>
.bg1 {
    width: 90px;
    height: 30px;

    @include set-back("@/assets/imgs/energy-plant/pv_status_modal_bg1.png");
}

.bg2 {
    width: 136px;
    height: 30px;

    @include set-back("@/assets/imgs/energy-plant/pv_status_modal_bg2.png");
}

.bg3 {
    width: 101px;
    height: 30px;

    @include set-back("@/assets/imgs/energy-plant/pv_status_modal_bg3.png");
}

.bg {
    display: flex;
    align-items: center;
    justify-content: center;

    .status-sign {
        width: 6px;
        height: 6px;
        border-radius: 4px;
    }

    .status-label {
        margin-left: 4px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: #fff;
        text-align: center;
        text-shadow: 0 0 4px #004a80;
        letter-spacing: .7px;
    }
}
</style>
