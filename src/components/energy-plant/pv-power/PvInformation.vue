<!-- 光伏直驱信息组件 -->
<template>
    <div class="container">
        <div class="content-box">
            <PvInformationSingle
                v-for="(item, index) in state.dataList" 
                :key="index"
                :index="index"
                :data="item"
            ></PvInformationSingle>
        </div>
    </div>
</template>

<script setup>
import PvInformationSingle from './PvInformationSingle.vue'
import useEchart from '@/hooks/useEchart'
import axiosAPI from '@/axios/index'

const { looping } = useEchart()

const state = reactive({
    dataList: [],
})

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGYMONITOR.urls.pvOverview)
    if (res.code === 200) {
        state.dataList = []
        const dataL = res.data
        state.dataList.push({
            title: '当日光伏发电量',
            num: Number(dataL.todayElecGen),
            ynum: Number(dataL.yesterdayElecGen),
            rate: Number(dataL.todayElecGenYOY),
            rateT: '同比',
        })
        state.dataList.push({
            title: '当日主机耗电量',
            num: Number(dataL.mainEngineConsumption),
            ynum: Number(dataL.yesterdayMainEngineConsumption),
            rate: Number(dataL.mainEngineConsumptionYOY),
            rateT: '同比',
        })
        state.dataList.push({
            title: '当日并网发电量',
            num: Number(dataL.todayOnGridElecGen),
            ynum: Number(dataL.yesterdayOnGridElecGen),
            rate: Number(dataL.todayOnGridElecGenYOY),
            rateT: '同比',
        })
        state.dataList.push({
            title: '全年累计光伏发电量',
            num: Number(dataL.totalElecGen),
            rate: Number(dataL.totalElecGenQOQ),
            rateT: '环比',
        })
        state.dataList.push({
            title: '全年CO2累计减排量',
            num: Number(dataL.totalCarbonEmissionReduction),
            rate: Number(dataL.totalCarbonEmissionReductionYOY),
            rateT: '环比',
        })
    }
}

looping(getData, window.ENERGYMONITOR.looping.pvOverview)

</script>

<style lang="scss" scoped>
.container {
    width: 1388px;
    height: 78px;
    padding-top: 53px;

    .content-box {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
}

</style>
