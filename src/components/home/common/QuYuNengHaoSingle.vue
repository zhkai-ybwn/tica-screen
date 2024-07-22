<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-21 12:59:28
 * @LastEditors: zhangkai 2572429235@qq.com
 * @LastEditTime: 2023-09-22 13:15:53
 * @FilePath: \tica-energy-plant\src\components\home\common\QuYuNengHaoSingle.vue
 * @Description: 区域能耗信息面板单个
-->
<template>
    <div class="qynh-signle-container">
        <div class="info-box">
            <div class="upper-box">
                <div class="sign"></div>
                <div class="text">{{ info.text }}</div>
            </div>
            <div class="value-unit">
                <div class="value">{{ info.value }}</div>
                <div class="unit">{{ info.unit }}</div>
            </div>
        </div>
        <div class="icon"></div>
    </div>
</template>

<script setup>
defineProps({
    info: {
        type: Object,
        default: () => ({
            text: '',
            color: 'linear-gradient(180deg, #1890FF 0%, rgba(24, 144, 255, 0.20) 100%)',
            value: 0,
            unit: 'kWh',
        }),
    },
})
</script>

<style lang="scss" scoped>
.qynh-signle-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .info-box {
        display: flex;
        flex-direction: column;
        width: fit-content;
        height: fit-content;
        padding: 6px 10px;
        background: rgb(6 12 28 / 26%);
        border-radius: 4px;
        backdrop-filter: blur(5px);

        .upper-box {
            display: flex;
            align-items: center;

            .sign {
                width: 10px;
                height: 10px;
                background: v-bind("info.color");
            }

            .text {
                margin-left: 5px;
                font-family: HarmonyOS-Regular, sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 32px; /* 200% */
                color: rgb(255 255 255 / 80%);
            }
        }

        .value-unit {
            display: flex;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            font-weight: 700;
            line-height: 28px; /* 140% */
            color: rgb(255 255 255 / 90%);

            .value {
                font-size: 20px;
            }

            .unit {
                margin-top: 3px;
                margin-left: 2px;
                font-size: 12px;
            }
        }
    }

    .icon {
        width: 37.24px;
        height: 40px;
        margin-top: 8px;

        @include set-back("../../../assets/imgs/home/marker-icon.png");
    }
}
</style>
