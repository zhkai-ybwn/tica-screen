<template>
    <div class="kaidonglv">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <RateTrend
                class="trend-chart" 
                :data="state.chartData"
                :config="state.chartConfig"
            ></RateTrend>
        </ModuleBox>
    </div>
</template>

<script setup>
import ModuleBox from '../../common/ModuleBox.vue'
import RateTrend from '../../common/RateTrend.vue'
import useEchart from '@/hooks/useEchart'
import axiosAPI from '@/axios/index'
import { useStore } from '@/store/index'

const state = reactive({
    titleConfig: {
        text: '近7日关键设备开动率趋势分析',
        width: 566,
        height: 40,
    },
    boxConfig: {
        width: 566,
        height: 228,
    },
    chartConfig: {
        width: 518,
        height: 208,
        tooltipText: '开动率',
    },
})

const { looping } = useEchart()
const ariTrend = computed(() => useStore().ariTrend)

const getData = async () => {
    const formData = new FormData()
    formData.append('dimension', ariTrend.value)
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.keyEquipmentAcRateHist, formData)
    if (res.code === 200) {
        state.chartData = formatData(res.data)
    }
}

const formatData = (data) => {
    // 获取当前时间戳（毫秒）
    const currentTimeStamp = Date.now()

    // 存储近七天的时间戳和对应的数据
    const matchedData = []
    // 生成近七天的时间戳并将时间戳与数据匹配
    for (let i = 6; i >= 0; i--) {
        const timestamp = currentTimeStamp - i * 24 * 60 * 60 * 1000 // 减去一天的毫秒数
        matchedData.push({
            ts: timestamp.toString(), // 将时间戳转换为字符串
            v: data[6 - i], // 对应的数据
        })
    }
    return matchedData
}

looping(getData, window.ENERGYMONITOR.looping.keyEquipmentAcRateHist)
</script>

<style lang="scss" scoped>
.kaidonglv {
    position: relative;

    .btn-group {
        position: absolute;
        top: 6px;
        right: 16px;
    }

    .trend-chart {
        margin: 12px 24px 0;
    }
}
</style>
