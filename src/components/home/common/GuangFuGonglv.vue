<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-20 14:15:05
 * @LastEditors: zhkai 2572429235@qq.com
 * @LastEditTime: 2023-10-07 14:37:52
 * @FilePath: \tica-energy-plant\src\components\home\common\GuangFuGonglv.vue
 * @Description: 光伏直驱发电-光伏功率
-->
<template>
    <div class="gf-gl-container">
        <div class="text-value-unit">
            <div class="gl-text">{{ info.text }}</div>
            <div class="value-unit">
                <div class="gl-value">{{ info.value }}</div>
                <div class="gl-unit">{{ info.unit }}</div>
            </div>
        </div>
        <ProgressBar :percent="progressPer"></ProgressBar>
    </div>
</template>

<script setup>
import ProgressBar from '@/components/home/common/ProgressBar.vue'
import { computed } from 'vue'

const props = defineProps({
    info: {
        type: Object,
        default: () => ({
            text: '当前功率',
            value: 0,
            per: 0,
            unit: 'kW',
        }),
    },
})

const progressPer = computed(() => (props.info.value / 60) * 100)
</script>

<style lang="scss" scoped>
.gf-gl-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 126px;
    height: 43px;

    .text-value-unit {
        display: flex;
        justify-content: space-between;

        .gl-text {
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: rgb(255 255 255 / 90%);
        }

        .value-unit {
            display: flex;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: rgb(255 255 255 / 90%);

            .gl-value {
                font-size: 16px;
            }

            .gl-unit {
                margin-top: 4px;
                margin-left: 2px;
                font-size: 10px;
            }
        }
    }
}
</style>
