<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-11 16:34:39
 * @LastEditors: zhkai 2572429235@qq.com
 * @LastEditTime: 2023-10-20 13:10:08
 * @FilePath: \tica-energy-plant\src\components\load-forecast\common\LegendUnit.vue
 * @Description: 图例和单位组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="legend-unit-container">
        <div v-for="(item, index) in unitList" :key="index" class="unit-box">
            <div class="text">{{ item.text }}</div>
            <div class="unit">{{ item.unit }}</div>
        </div>
        <div v-for="(item, index) in legendList" :key="index" class="legend-box">
            <div class="sign" :style="{background: `${item.color}`}"></div>
            <div class="text">{{ item.text }}</div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    unitList: {
        type: Array,
        default: () => ([
            { text: '', unit: '' },
        ]),
    },
    legendList: {
        type: Array,
        default: () => ([
            { text: '', color: '' },
        ]),
    },
})
</script>

<style lang="scss" scoped>
.legend-unit-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .unit-box {
        display: flex;
        width: fit-content;
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        color: #fff;

        .unit {
            margin-left: 2px;
        }
    }

    .legend-box {
        display: flex;
        align-items: center;
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        color: rgb(255 255 255 / 80%);

        .sign {
            width: 10px;
            height: 10px;
        }

        .text {
            margin-left: 8px;
        }
    }
}
</style>
