<template>
    <div class="factory-ac-power">
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
import ButtonGroup from '../../common/ButtonGroup.vue'
import TrendChart from '../../common/TrendChart.vue'
import useEchart from '@/hooks/useEchart'
import axiosAPI from '@/axios/index'
import { useStore } from '@/store/index'
import * as echarts from 'echarts'

const state = reactive({
    titleConfig: {
        text: '全厂关键设备用电量趋势分析',
        width: 682,
        height: 40,
    },
    boxConfig: {
        width: 682,
        height: 228,
    },
    chartConfig: {
        width: 634,
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
        nameTextStylePadding: [0, 0, 0, 30],
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
    btnModuleKey: 4,
})

const { looping } = useEchart()
const ydlTrend = computed(() => useStore().ydlTrend)

watch(ydlTrend, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        getData() 
        setCurrentIndex()
    }
})

const setCurrentIndex = () => {
    state.currentIndex = ydlTrend.value === 'day' ? 0 : ydlTrend.value === 'month' ? 1 : 2
}

onMounted(() => {
    setCurrentIndex()
})

const getData = async () => {
    const formData = new FormData()
    formData.append('dimension', ydlTrend.value)
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.keyEquipmentEcInfo, formData)
    if (res.code === 200) {
        state.chartData = { currentData: res.data.currentCycleECInfo, pastData: res.data.previousCycleECInfo }
    }
}
looping(getData, window.ENERGYMONITOR.looping.keyEquipmentEcInfo)
</script>

<style lang="scss" scoped>
.factory-ac-power {
    position: relative;
    margin-left: 24px;

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
