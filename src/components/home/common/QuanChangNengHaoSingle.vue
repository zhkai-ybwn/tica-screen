<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-19 08:50:01
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-09 15:57:10
 * @FilePath: \tica-energy-plant\src\components\home\common\QuanChangNengHaoSingle.vue
 * @Description: 全厂能耗单个组件
-->
<template>
    <div class="qcnh-container">
        <div class="upper-area">
            <div class="text">{{ data.text }}</div>
            <div v-if="isShowPer" class="hb">环比</div>
            <img
                v-if="isShowPer && isIncreaseOrDecrease(data.percent)" 
                class="sign"
                :src="isIncreaseOrDecrease(data.percent)"
            >
            <div class="value-unit">
                <div v-if="isShowPer" class="value">{{ Math.abs(data.percent) }}</div>
                <div v-if="isShowPer" class="unit">%</div>
            </div>
        </div>
        <div class="lower-area">
            <div class="value-l" :text="data.value.toLocaleString()">{{ data.value.toLocaleString() }}</div>
            <div class="unit-l">{{ data.unit }}</div>
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
.qcnh-container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 225px;
    height: 120px;
    background: linear-gradient(278deg, rgb(19 54 105 / 60%) 0%, rgb(83 119 245 / 50%) 100%);
    border-radius: 2px;
    backdrop-filter: blur(5px);

    .upper-area {
        position: absolute;
        top: 22px;
        left: 16px;
        display: flex;
        align-items: center;
        width: 187px;
        height: 32px;

        .hb {
            position: absolute;
            top: 8px;
            left: 103px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px; /* 160% */
            color: rgb(255 255 255 / 90%);
            text-transform: capitalize;
        }

        .text {
            position: absolute;
            top: 8px;
            left: 0;
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 16px;
            font-weight: 400;
            color: rgb(255 255 255 / 80%);
        }

        .sign {
            position: absolute;
            top: 8px;
            left: 129px;
            width: 11px;
            height: 15.3px;
        }

        .value-unit {
            position: absolute;
            top: 8px;
            left: 144px;
            display: flex;
            color: rgb(255 255 255 / 90%);

            .value {
                font-family: HarmonyOS-Medium, sans-serif;
                font-size: 16px;
                font-weight: 500;
            }

            .unit {
                margin-top: 3px;
                margin-left: 2px;
                font-family: HarmonyOS-Regular, sans-serif;
                font-size: 10px;
                font-weight: 400;
            }
        }
    }

    .lower-area {
        position: absolute;
        top: 63px;
        left: 16px;
        display: flex;
        align-items: center;
        width: 209px;
        height: 32px;

        .value-l {
            width: fit-content;
            font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
            font-size: 36px;
            font-style: normal;
            font-weight: 400;
            text-align: left;
            background: var(--unnamed, linear-gradient(180deg, #fff 0%, #c1daff 100%));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .value-l::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: attr(text);
        }

        .unit-l {
            margin-top: 10px;
            margin-left: 4px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 10px;
            font-weight: 400;
            line-height: 16px;
            color: rgb(255 255 255 / 90%);
        }
    }
}
</style>
