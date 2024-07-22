<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-20 10:32:08
 * @LastEditors: zhangkai 2572429235@qq.com
 * @LastEditTime: 2023-09-21 11:00:42
 * @FilePath: \tica-energy-plant\src\components\home\common\GuangFuInfo.vue
 * @Description: 光伏直驱发电-光伏信息面板
-->
<template>
    <div class="gf-info-conatiner">
        <div class="gf-sign"></div>
        <div class="text-value-unit">
            <div class="gf-text">{{ info.text }}</div>
            <div class="value-unit">
                <div class="gf-value">{{ info.value.toLocaleString('zh',{ minimumFractionDigits: 1,}) }}</div>
                <div class="gf-unit">{{ info.unit }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    info: {
        type: Object,
        default: () => ({
            text: '',
            value: 0,
            unit: '℃',
        }),
    },
})
</script>

<style lang="scss" scoped>
.gf-info-conatiner {
    display: flex;
    justify-content: space-between;
    width: 109.3px;
    height: 43px;

    .gf-sign {
        width: 8px;
        height: 8px;
        margin-top: 6px;
        background: linear-gradient(180deg, #01d0fd 0%, #1a84e9 100%);
        border-radius: 100%;
    }

    .text-value-unit {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 90px;
        height: 43px;

        .gf-text {
            width: 90px;
            height: 20px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: rgb(255 255 255 / 80%);
        }

        .value-unit {
            display: flex;
            width: 90px;
            height: 20px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: rgb(255 255 255 / 90%);

            .gf-value {
                width: fit-content;
                font-size: 16px;
            }

            .gf-unit {
                margin-top: 6px;
                margin-left: 2px;
                font-size: 10px;
            }
        }
    }
}
</style>
