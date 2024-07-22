<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-11 09:37:21
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-15 12:59:41
 * @FilePath: \tica-energy-plant\src\components\energy-plant\device-monitor\YongDianLiangQuShi.vue
 * @Description: 空调用电量趋势分析
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="ydlqs-container">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <TrendChart
                class="trend-chart" 
                :data="state.chartData"
                :label="state.labelList[state.currentIndex]"
                :config="state.chartConfig"
                :current-index="state.currentIndex"
            ></TrendChart>
        </ModuleBox>
        <ButtonGroup :label-data="state.btnList" :btn-module-key="state.btnModuleKey" class="btn-group">
        </ButtonGroup>
    </div>
</template>

<script setup>
import ModuleBox from '../common/ModuleBox.vue'
import ButtonGroup from '../common/ButtonGroup.vue'
import TrendChart from '../common/TrendChart.vue'
import useEchart from '@/hooks/useEchart'
import axiosAPI from '@/axios/index'
import { useStore } from '@/store/index'
import * as echarts from 'echarts'

const region = computed(() => useStore().region)

const state = reactive({
    titleConfig: {
        text: '综合楼东区空调用电量趋势分析',
        width: 784,
        height: 40,
    },
    boxConfig: {
        width: 784,
        height: 228,
    },
    chartConfig: {
        width: 743,
        height: 197,
        smooth1: true,
        smooth2: true,
        lineStyle: [{ color: '#00C2FF', width: 2 }, { color: '#35FFCF', width: 2 }],
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
        tooltipColors: ['#00C2FF', '#35FFCF'],
        grid: {
            top: '14%',
            bottom: '0%',
            left: '1%',
            right: '3%',
            containLabel: true,
        },
        // eslint-disable-next-line max-len
        legendInfo: ['image://data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDE0IDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGlkPSJHcm91cCA0NzcwNiI+CjxjaXJjbGUgaWQ9IkVsbGlwc2UgNTkiIGN4PSI2LjgzODM4IiBjeT0iMyIgcj0iMiIgc3Ryb2tlPSIjMDBDMkZGIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggaWQ9IkxpbmUgOSIgZD0iTTEgM0g0IiBzdHJva2U9IiMwMEMyRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGlkPSJMaW5lIDEwIiBkPSJNMTAgM0gxMyIgc3Ryb2tlPSIjMDBDMkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+Cjwvc3ZnPgo=',
            // eslint-disable-next-line max-len
            'image://data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDE0IDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGlkPSJHcm91cCA0NzcwNiI+CjxjaXJjbGUgaWQ9IkVsbGlwc2UgNTkiIGN4PSI2LjgzODM4IiBjeT0iMyIgcj0iMiIgc3Ryb2tlPSIjMzVGRkNGIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggaWQ9IkxpbmUgOSIgZD0iTTEgM0g0IiBzdHJva2U9IiMzNUZGQ0YiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGlkPSJMaW5lIDEwIiBkPSJNMTAgM0gxMyIgc3Ryb2tlPSIjMzVGRkNGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+Cjwvc3ZnPgo='],
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
    btnModuleKey: 5,
})

const { looping } = useEchart()
const areaAriTrend = computed(() => useStore().areaAriTrend)

watch(areaAriTrend, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        getData() 
        setCurrentIndex()
    }
})

watch(region, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        state.titleConfig.text = newValue === 0 ? '综合楼东区空调用电量趋势分析' : '综合楼西区空调用电量趋势分析'
        getData() 
        setCurrentIndex()
    }
})

const setCurrentIndex = () => {
    state.currentIndex = areaAriTrend.value === 'day' ? 0 : areaAriTrend.value === 'month' ? 1 : 2
}

const getData = async () => {
    const formData = new FormData()
    formData.append('dimension', areaAriTrend.value)
    formData.append(
        'location',
        region.value === 0
            ? '天加能源基地-综合楼-综合楼东区'
            : '天加能源基地-综合楼-综合楼西区',
    )
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.compBuildingECInfo, formData)
    if (res.code === 200) {
        state.chartData = { currentData: res.data.currentCycleECInfo, pastData: res.data.previousCycleECInfo }
    }
}

onMounted(() => {
    setCurrentIndex()
})

looping(getData, window.ENERGYMONITOR.looping.compBuildingECInfo)
</script>

<style lang="scss" scoped>
.ydlqs-container {
    position: relative;

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
