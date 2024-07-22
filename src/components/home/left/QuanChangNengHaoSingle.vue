<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-09 15:17:08
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-10 09:11:08
 * @FilePath: \tica-energy-plant\src\components\home\left\QuanChangNengHaoSingle.vue
 * @Description: 全场能耗单个
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="qcnhs-container">
        <div class="text">{{ data.text }}</div>
        <div v-if="data.value" class="value-unit">
            <div class="value" :text="data.value.toLocaleString()">{{ data.value.toLocaleString() }}</div>
            <div class="unit">{{ data.unit }}</div>
        </div>
        <div class="hb-box">
            <div class="hb">环比</div>
            <img
                v-if="isIncreaseOrDecrease(data.percent)" 
                class="sign"
                :src="isIncreaseOrDecrease(data.percent)"
            >
            <div class="percent-unit-box">
                <div class="percent">{{ Math.abs(data.percent) }}</div>
                <div class="percent-unit">%</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import redArrow from '@/assets/imgs/home/red-arrow.png'
import greenArrow from '@/assets/imgs/home/green-arrow.png'

defineProps({
    data: {
        type: Object,
        default: () => ({
            // 文本
            text: '',
            // 增减百分比
            percent: 0,
            // 能耗
            value: 0,
            // 能耗单位
            unit: '',
        }),
    },
    isShowPer: {
        type: Boolean,
        default: false,
    },
})
const isIncreaseOrDecrease = (percent) => {
    if (percent > 0) {
        return redArrow
    } 
    if (percent <= 0) {
        return greenArrow
    } 
    return null
}
</script>

<style lang="scss" scoped>
.qcnhs-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .text {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        color: rgb(255 255 255 / 80%);
    }

    .value-unit {
        display: flex;

        .value {
            width: fit-content;
            font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
            font-size: 26px;
            font-style: normal;
            font-weight: 400;
            text-align: left;
            background: var(--unnamed, linear-gradient(180deg, #fff 0%, #c1daff 100%));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .value::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: attr(text);
        }

        .unit {
            margin-top: 10px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            color: rgb(255 255 255 / 80%);
        }
    }

    .hb-box {
        display: flex;
        align-items: center;
        width: fit-content;

        .hb {
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            color: rgb(255 255 255 / 90%);
            text-transform: capitalize;
        }

        .sign {
            width: 11px;
            height: 15.3px;
            margin-left: 4px;
        }

        .percent-unit-box {
            display: flex;
            align-items: center;
            margin-left: 4px;

            .percent {
                font-family: HarmonyOS-Regular, sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                color: rgb(255 255 255 / 90%);
            }

            .percent-unit {
                margin-top: 4px;
                margin-left: 4px;
                font-family: HarmonyOS-Regular, sans-serif;
                font-size: 10px;
                font-style: normal;
                font-weight: 400;
                color: rgb(255 255 255 / 90%);
                text-transform: capitalize;
            }
        }
    }
}
</style>
