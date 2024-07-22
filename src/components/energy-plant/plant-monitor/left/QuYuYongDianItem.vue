<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-13 08:59:54
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-24 14:30:28
 * @FilePath: \tica-energy-plant\src\components\energy-plant\plant-monitor\left\QuYuYongDianItem.vue
 * @Description: 区域用电统计List单个Item
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div :class="['qyyd-list-item', showBg ? 'qyyd-list-item-selected' : '']">
        <div class="legend" :style="{background:`${color}`}"></div>
        <div class="name">{{ dataItem.name }}</div>
        <div class="percent-value">{{ dataItem.per || '-' }}</div>
        <div v-if="dataItem.per" class="percent-unit">%</div>
        <div class="driver"></div>
        <div class="value">{{ dataItem.value || '-' }}</div>
        <div v-if="dataItem.value" class="unit">{{ dataItem.unit }}</div>
    </div>
</template>

<script setup>
defineProps({
    dataItem: {
        type: Object,
        default: () => ({
            name: '',
            unit: '',
            per: '',
            value: '',
        }),
    },
    color: {
        type: String,
        default: '',
    },
    showBg: {
        type: Boolean,
        default: false,
    },
    height: {
        type: String,
        default: '40px',
    },
})
</script>

<style lang="scss" scoped>
.qyyd-list-item {
    display: flex;
    align-items: center;
    width: 283px;
    height: v-bind(height);

    .legend {
        width: 10px;
        height: 10px;
        margin-left: 30px;
        background: #2871ca;
        border: 2px solid rgb(255 255 255 / 20%);
    }

    .name {
        width: 84px;
        margin-left: 8px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 350;
        color: #fff;
    }

    .percent-value {
        width: 20px;
        margin-left: 13px;
        font-family: Barlow-Italic, sans-serif;
        font-size: 18px;
        font-style: italic;
        font-weight: 700;
        color: #fff;
    }

    .percent-unit {
        margin-top: 5px;
        margin-left: 4px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        color: rgb(255 255 255 / 64%);
    }

    .driver {
        width: 1px;
        height: 10px;
        margin-top: 4px;
        margin-left: 8px;
        background: rgb(255 255 255 / 20%);
    }

    .value {
        margin-left: 8px;
        font-family: Barlow-Italic, sans-serif;
        font-size: 18px;
        font-style: italic;
        font-weight: 700;
        color: #fff;
    }

    .unit {
        margin-top: 5px;
        margin-left: 4px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        color: rgb(255 255 255 / 64%);
    }
}

.qyyd-list-item-selected {
    @include set-back("@/assets/imgs/energy-plant/quyuyongdian-item-bg.png");
}
</style>
