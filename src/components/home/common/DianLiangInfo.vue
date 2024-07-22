<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-20 10:31:40
 * @LastEditors: zhkai 2572429235@qq.com
 * @LastEditTime: 2023-10-19 09:24:59
 * @FilePath: \tica-energy-plant\src\components\home\common\DianLiangInfo.vue
 * @Description: 光伏直驱发电-电量信息面板
-->
<template>
    <div class="dl-info-container">
        <div class="dl-text">{{ info.text }}</div>
        <div class="value-unit">
            <div
                v-if="info.isDig"
                class="dl-value" 
                :text="info.value.toLocaleString('zh',{ minimumFractionDigits: 1,})"
            >
                {{ info.value.toLocaleString('zh',{ minimumFractionDigits: 1,}) }}
            </div>
            <div v-else class="dl-value" :text="info.value.toLocaleString()">
                {{ info.value.toLocaleString() }}
            </div>
            <div class="dl-unit">{{ info.unit }}</div>
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
            unit: '',
            isDig: false,
        }),
    },
})
</script>

<style lang="scss" scoped>
.dl-info-container {
    max-width: 113px;
    height: 65px;

    .dl-text {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 32px;
        color: #fff;
        text-align: left;
    }

    .value-unit {
        display: flex;

        .dl-value {
            width: fit-content;
            font-family: AlimamaShuHeiTi-Bold, sans-serif;
            font-size: 26px;
            font-style: normal;
            font-weight: 700;
            text-align: left;
            background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .dl-value::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: attr(text);
        }

        .dl-unit {
            margin-top: 14px;
            margin-left: 2px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            color: rgb(255 255 255 / 90%);
        }
    }
}
</style>
