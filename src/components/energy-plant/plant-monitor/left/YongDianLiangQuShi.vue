<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-26 14:26:46
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-13 11:14:16
 * @FilePath: \tica-energy-plant\src\components\energy-plant\plant-monitor\left\YongDianLiangQuShi.vue
 * @Description: 用电量趋势分析
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="power-trend-container">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <TrendChart
                class="trend-chart" 
                :data="state.chartData"
                :label="state.labelList[state.currentIndex]"
                :config="state.chartConfig"
                :current-index="state.currentIndex"
            ></TrendChart>
        </ModuleBox>
        <ButtonGroup :label-data="state.btnList" :btn-module-key="state.btnModuleKey" class="btn-group"></ButtonGroup>
    </div>
</template>

<script setup>
import ModuleBox from '../../common/ModuleBox.vue'
import TrendChart from '../../common/TrendChart.vue'
import ButtonGroup from '../../common/ButtonGroup.vue'
import useEchart from '@/hooks/useEchart'
import axiosAPI from '@/axios/index'
import { useStore } from '@/store/index'
import * as echarts from 'echarts'

const state = reactive({
    titleConfig: {
        text: window.ENERGYMONITOR.text.yongdianliangqushi.title,
        width: 1003,
        height: 40,
    },
    boxConfig: {
        width: 1003,
        height: 425,
    },
    chartConfig: {
        width: 955,
        height: 377,
        smooth1: false,
        smooth2: false,
        lineStyle: [{ color: '#28ffff', width: 2 }, { color: '#9E79FF', width: 2 }],
        areaStyle: [
            {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                        {
                            offset: 0,
                            color: 'rgba(40, 172, 255, 0.3)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(109, 69, 253, 0)',
                        },
                    ],
                    false,
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
            }, 
            {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                        {
                            offset: 0,
                            color: 'rgba(109, 69, 253, 0.3)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(109, 69, 253, 0)',
                        },
                    ],
                    false,
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
            }],
        tooltipColors: ['#41ffeb', '#b089ff'],
        grid: {
            top: '10%',
            bottom: '0%',
            left: '2%',
            right: '5%',
            containLabel: true,
        },
        // eslint-disable-next-line max-len
        legendInfo: ['image://data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDIxIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGlkPSJHcm91cCA0NzcwNiI+CjxjaXJjbGUgaWQ9IkVsbGlwc2UgNTkiIGN4PSIxMC41OTA2IiBjeT0iNC44ODE4NCIgcj0iMyIgc3Ryb2tlPSIjNDFGRkVCIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggaWQ9IkxpbmUgOSIgZD0iTTEgNUg3IiBzdHJva2U9IiM0MUZGRUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGlkPSJMaW5lIDEwIiBkPSJNMTQgNUgyMCIgc3Ryb2tlPSIjNDFGRkVCIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+Cjwvc3ZnPgo=',
            // eslint-disable-next-line max-len
            'image://data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDIxIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGlkPSJHcm91cCA0NzcwNiI+CjxjaXJjbGUgaWQ9IkVsbGlwc2UgNTkiIGN4PSIxMC41OTA2IiBjeT0iNC44ODE4NCIgcj0iMyIgc3Ryb2tlPSIjQjA4OUZGIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggaWQ9IkxpbmUgOSIgZD0iTTEgNUg3IiBzdHJva2U9IiNCMDg5RkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGlkPSJMaW5lIDEwIiBkPSJNMTQgNUgyMCIgc3Ryb2tlPSIjQjA4OUZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+Cjwvc3ZnPgo='],
    },
    chartData: {
        currentData: [],
        pastData: [],
    },
    labelList: [['今日用电量', '昨日用电量'], ['本月用电量', '上月用电量'], ['今年用电量', '去年用电量']],
    currentIndex: 0,
    btnList: [{
        key: 'day', label: '日',
    }, 
    {
        key: 'month', label: '月',
    },
    {
        key: 'year', label: '年',
    }],
    btnModuleKey: 0,
})
const { looping } = useEchart()
const powerTrend = computed(() => useStore().powerTrend)

watch(powerTrend, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        getData() 
        setCurrentIndex()
    }
})

const setCurrentIndex = () => {
    state.currentIndex = powerTrend.value === 'day' ? 0 : powerTrend.value === 'month' ? 1 : 2
}

onMounted(() => {
    setCurrentIndex()
})

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGYMONITOR.urls.yongdianliangqushi, { dimension: powerTrend.value })
    if (res.code === 200) {
        state.chartData = { currentData: res.data.currentCycle, pastData: res.data.previousCycle }
    }
}

looping(getData, window.ENERGYMONITOR.looping.yongdianliangqushi)

</script>

<style lang="scss" scoped>
.power-trend-container {
    position: relative;
    width: 1003px;
    height: 425px;

    .btn-group {
        position: absolute;
        top: 6px;
        right: 16px;
    }

    .trend-chart {
        margin: 24px;
    }
}
</style>
