<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-22 08:41:13
 * @LastEditors: zhkai 2572429235@qq.com
 * @LastEditTime: 2023-10-17 14:37:59
 * @FilePath: \tica-energy-plant\src\components\home\common\CircularChart.vue
 * @Description: 环形图
-->
<!--
 * @Description: 圆环进度条
 * @Author: zhangkai
-->
<template>
    <div class="chart-box">
        <div
            ref="echartRef"
            class="circular-progress-container" 
            :style="{width:`${config.width}px`,height:`${config.height}px`}"
        ></div>
        <div class="text-box">
            <div class="text">{{ data.text }}</div>
            <div class="sign-value-unit">
                <div class="hb">环比</div>
                <div :class="['sign', data.increaseOrDecrease ? 'red' : 'green']"></div>
                <div class="value-unit">
                    <div class="value">{{ data.value.toLocaleString('zh',{ minimumFractionDigits: 1,}) }}</div>
                    <div class="unit">%</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import useEchart from '@/hooks/useEchart'

const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            value: 0,
            increaseOrDecrease: true,
            text: '',
        }),
    },
    config: {
        type: Object,
        default: () => ({
            width: 100,
            height: 100,
            color: ['rgba(24, 144, 255, 1)', 'rgba(24, 144, 255, 1)'],
        }),
    },
})

const dataC = computed(() => props.data.value) 
const getOptions = () => ({
    angleAxis: {
        max: 100,
        // 隐藏刻度线
        show: false,
        startAngle: 90,
    },
    radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
    },
    polar: {
        radius: '190%', // 图形大小
    },
    series: [{
        type: 'bar',
        data: [props.data.value],
        showBackground: true,
        roundCap: true,
        backgroundStyle: {
            color: 'rgba(58, 61, 67, 1)',
        },
        coordinateSystem: 'polar',
        barWidth: 4,
        itemStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: props.config.color[0],
                }, {
                    offset: 1, color: props.config.color[1],
                }],
                global: false,
            },
        },
    }],
})
const { echartRef, renderChart } = useEchart(getOptions, { isWatch: true, watchData: dataC })
renderChart(true, true)
</script>

<style lang="scss" scoped>
.chart-box {
    position: relative;

    .text-box {
        position: absolute;
        top: 22px;

        .text {
            width: 108px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 36px;
            color: rgb(255 255 255 / 80%);
            text-align: center;
        }

        .sign-value-unit {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 108px;

            .hb {
                font-family: HarmonyOS-Regular, sans-serif;
                font-size: 10px;
                font-style: normal;
                font-weight: 400;
                line-height: 16px; /* 160% */
                color: rgb(255 255 255 / 90%);
                text-transform: capitalize;
            }

            .sign {
                width: 11px;
                height: 16px;
                margin-left: 3px;
            }

            .red {
                @include set-back("../../../assets/imgs/home/red-arrow.png");
            }

            .green {
                @include set-back("../../../assets/imgs/home/green-arrow.png");
            }

            .value-unit {
                display: flex;
                margin-left: 3px;

                .value {
                    font-family: HarmonyOS-Regular, sans-serif;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 20px; /* 125% */
                    color: rgb(255 255 255 / 90%);
                }

                .unit {
                    margin-top: 3px;
                    font-family: HarmonyOS-Regular, sans-serif;
                    font-size: 10px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 16px; /* 160% */
                    color: rgb(255 255 255 / 90%);
                    text-transform: capitalize;
                }
            }
        }
    }
}
</style>
