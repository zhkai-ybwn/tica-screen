<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-11 14:12:08
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-02-27 11:18:39
 * @FilePath: \tica-energy-plant\src\components\energy-plant\common\ButtonGroup.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="button-group">
        <div
            v-for="(item, index) in labelData"
            :key="index" 
            :class="['button-sign', currentModule === item.key
                ? 'button-sign-active' : 'button-sign-normal']"
            @click="setCurrentKey(item.key)"
        >
            {{ item.label }}
        </div>
    </div>
</template>

<script setup>
import { useStore } from '@/store/index'

const props = defineProps({
    labelData: {
        type: Array,
        default: () => ([
        ]),
    },
    btnModuleKey: {
        type: Number,
        default: 0,
    },
})

const currentModule = computed(() => {
    const stores = [
        useStore().powerTrend,
        useStore().pvTrend,
        useStore().ariTrend,
        useStore().keyDevice,
        useStore().ydlTrend,
        useStore().areaAriTrend,
        useStore().pvDevicePower,
        useStore().pvPowerTrend,
    ]
    return stores[props.btnModuleKey]
})

const setCurrentKey = (key) => {
    if (props.btnModuleKey === 0) useStore().setPowerTrend(key)
    if (props.btnModuleKey === 1) useStore().setPVTrend(key)
    if (props.btnModuleKey === 2) useStore().setAirTrend(key)
    if (props.btnModuleKey === 3) useStore().setKeyDevice(key)
    if (props.btnModuleKey === 4) useStore().setYdlTrend(key)
    if (props.btnModuleKey === 5) useStore().setAreaAriTrend(key)
    if (props.btnModuleKey === 6) useStore().setPvDevicePower(key)
    if (props.btnModuleKey === 7) useStore().setPvPowerTrend(key)
}

</script>

<style lang="scss" scoped>
.button-group {
    display: flex;
    justify-content: space-between;
    width: 204px;
    height: 28px;

    .button-sign {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 28px;
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: rgb(255 255 255 / 65%);
        text-align: center;
        cursor: pointer;

        &:hover {
            @include set-back("@/assets/imgs/energy-plant/btn_bg_active.png");

            color: rgb(255 255 255 / 100%);
        }
    }

    .button-sign-normal {
        color: rgb(255 255 255 / 65%);

        @include set-back("@/assets/imgs/energy-plant/btn_bg_normal.png");
    }

    .button-sign-active {
        color: rgb(255 255 255);

        @include set-back("@/assets/imgs/energy-plant/btn_bg_active.png");
    }
}
</style>
