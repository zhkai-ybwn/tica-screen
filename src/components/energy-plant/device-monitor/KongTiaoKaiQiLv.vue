<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-11 09:37:50
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-25 13:15:24
 * @FilePath: \tica-energy-plant\src\components\energy-plant\device-monitor\KongTiaoKaiQiLv.vue
 * @Description: 近7日空调开启率趋势分析
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->

<template>
    <div class="ktkql-container">
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
import ModuleBox from '../common/ModuleBox.vue'
import RateTrend from '../common/RateTrend.vue'
import useEchart from '@/hooks/useEchart'
import axiosAPI from '@/axios/index'
import { useStore } from '@/store/index'

const region = computed(() => useStore().region)
const floor = computed(() => useStore().floor)

const state = reactive({
    titleConfig: {
        text: '当前楼层近7日空调开启率趋势分析',
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
        tooltipText: '开启率',
    },
})

const { looping } = useEchart()

const getData = async () => {
    const formData = new FormData()
    formData.append('location', getParam())
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.last7DaysOpenRate, formData)
    if (res.code === 200) {
        state.chartData = res.data.reteInfo
    }
}

watch([region, floor], ([newValue1, newValue2], [oldValue1, oldValue2]) => {
    if (newValue1 !== oldValue1) getData()
    if (newValue2 !== oldValue2) getData()
})

const formatRegionFloor = (s) => {
    const regionFloorMap = {
        west_f1: '天加能源基地-综合楼-综合楼西区-一楼',
        west_f2: '天加能源基地-综合楼-综合楼西区-二楼',
        west_f3: '天加能源基地-综合楼-综合楼西区-三楼',
        east_f1: '天加能源基地-综合楼-综合楼东区-一楼',
        east_f2: '天加能源基地-综合楼-综合楼东区-二楼',
        east_f3: '天加能源基地-综合楼-综合楼东区-三楼',
    }
    return regionFloorMap[s] || ''
}

const getParam = () => {
    const regionStr = region.value === 0 ? 'east' : 'west'
    return formatRegionFloor(`${regionStr}_f${floor.value}`)
}

looping(getData, window.ENERGYMONITOR.looping.last7DaysOpenRate)
</script>

<style lang="scss" scoped>
.ktkql-container {
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
