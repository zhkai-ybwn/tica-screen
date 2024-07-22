<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-11 13:52:33
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-02-04 15:18:09
 * @FilePath: \tica-energy-plant\src\components\energy-plant\pv-power\GuangFuFaDianNengHaoFenXi.vue
 * @Description: 光伏发电系统能耗趋势分析
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="gffdnhfx-container">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <TripleLineChart
                class="trend-chart" 
                :data="state.chartData"
                :label="state.labelList[state.currentIndex]"
                :config="state.chartConfig"
                :current-index="state.currentIndex"
            ></TripleLineChart>
        </ModuleBox>
        <ButtonGroup :label-data="state.btnList" :btn-module-key="state.btnModuleKey" class="btn-group">
        </ButtonGroup>
    </div>
</template>

<script setup>
import ModuleBox from '../common/ModuleBox.vue'
import ButtonGroup from '../common/ButtonGroup.vue'
import TripleLineChart from '../common/TripleLineChart.vue'
import { useStore } from '@/store/index'
import useEchart from '@/hooks/useEchart'
import axiosAPI from '@/axios/index'
import * as echarts from 'echarts'

const state = reactive({
    titleConfig: {
        text: '光伏发电系统能耗趋势分析',
        width: 822,
        height: 40,
    },
    boxConfig: {
        width: 822,
        height: 228,
    },
    btnModuleKey: 7,
    btnList: [{
        key: 'day', label: '今日',
    }, 
    {
        key: 'month', label: '本月',
    },
    {
        key: 'year', label: '全年',
    }],
    chartConfig: {
        width: 774,
        height: 197,
        smooth1: true,
        smooth2: true,
        lineStyle: [{ color: '#00C2FF', width: 2 }, { color: '#FFBA35', width: 2 }, { color: '#35FFCE', width: 2 }],
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
                            color: 'rgba(0, 148, 255, 0.5)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(0, 148, 255, 0)',
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
                            color: 'rgba(255, 186, 53, 0.5)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(255, 186, 53, 0)',
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
                            color: 'rgba(53, 255, 207, 0.5)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(53, 255, 207, 0)',
                        },
                    ],
                    false,
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
            }],
        tooltipColors: ['#00C2FF', '#FFBA35', '#35FFCF'],
        grid: {
            top: '18%',
            bottom: '0%',
            left: '1%',
            right: '3%',
            containLabel: true,
        },
        // eslint-disable-next-line max-len
        legendInfo: ['image://data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDE0IDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGlkPSJHcm91cCA0NzcwNiI+CjxjaXJjbGUgaWQ9IkVsbGlwc2UgNTkiIGN4PSI3IiBjeT0iMyIgcj0iMiIgc3Ryb2tlPSIjMDBDMkZGIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggaWQ9IkxpbmUgOSIgZD0iTTEgM0g0IiBzdHJva2U9IiMwMEMyRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGlkPSJMaW5lIDEwIiBkPSJNMTAgM0gxMyIgc3Ryb2tlPSIjMDBDMkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+Cjwvc3ZnPgo=',
            // eslint-disable-next-line max-len
            'image://data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDE0IDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGlkPSJHcm91cCA0NzcwNiI+CjxjaXJjbGUgaWQ9IkVsbGlwc2UgNTkiIGN4PSI3IiBjeT0iMyIgcj0iMiIgc3Ryb2tlPSIjRkZCQTM1IiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggaWQ9IkxpbmUgOSIgZD0iTTEgM0g0IiBzdHJva2U9IiNGRkJBMzUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGlkPSJMaW5lIDEwIiBkPSJNMTAgM0gxMyIgc3Ryb2tlPSIjRkZCQTM1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+Cjwvc3ZnPgo=',
            // eslint-disable-next-line max-len
            'image://data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDE0IDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGlkPSJHcm91cCA0NzcwNiI+CjxjaXJjbGUgaWQ9IkVsbGlwc2UgNTkiIGN4PSI3IiBjeT0iMyIgcj0iMiIgc3Ryb2tlPSIjMzVGRkNFIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggaWQ9IkxpbmUgOSIgZD0iTTEgM0g0IiBzdHJva2U9IiMzNUZGQ0UiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGlkPSJMaW5lIDEwIiBkPSJNMTAgM0gxMyIgc3Ryb2tlPSIjMzVGRkNFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+Cjwvc3ZnPgo='],
    },
    chartData: {
        mainEngry: [],
        onGrid: [],
        phoGenEc: [],
    },
    labelList: [['主机耗电量', '并网发电量', '光伏发电量'], ['主机耗电量', '并网发电量', '光伏发电量'], ['主机耗电量', '并网发电量', '光伏发电量']],
    currentIndex: 0,
})

const { looping } = useEchart()
const pvPowerTrend = computed(() => useStore().pvPowerTrend)

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGYMONITOR.urls.eCTrendAnalysis, 
        { dimension: pvPowerTrend.value })
    if (res.code === 200) {
        state.chartData = { 
            mainEngry: res.data.mainEngry,
            onGrid: res.data.onGrid,
            phoGenEc: res.data.phoGenEc, 
        }
    }
}
const setCurrentIndex = () => {
    state.currentIndex = pvPowerTrend.value === 'day' ? 0 : pvPowerTrend.value === 'month' ? 1 : 2
}

onMounted(() => {
    setCurrentIndex()
})

watch(pvPowerTrend, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        getData() 
        setCurrentIndex()
    }
})

looping(getData, window.ENERGYMONITOR.looping.eCTrendAnalysis)
</script>

<style lang="scss" scoped>
.gffdnhfx-container {
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
