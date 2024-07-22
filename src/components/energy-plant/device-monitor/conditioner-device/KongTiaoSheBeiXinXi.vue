<!-- 空调设备信息组件 -->
<template>
    <div class="ktsbxx-container">
        <DeviceStateItem
            v-for="(item, index) in state.data" 
            :key="index"
            :config="state.config[index]"
            :data="item"
            :style="{marginLeft: index !== 0 ? '24px' : '0' }"
        ></DeviceStateItem>
    </div>
</template>

<script setup>
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'
import DeviceStateItem from '../DeviceStateItem.vue'

const { looping } = useEchart()

const state = reactive({
    config: [{
        type: 0,
        isPer: [false, false],
        class1: 'data-value1',
        class2: 'data-value2',
        title: '全厂空调总数',
        unit: '台',
        label1: '多联机',
        unit1: '台',
        label2: '室内机',
        unit2: '台',
    },
    {
        type: 0,
        isPer: [false, false],
        class1: 'data-value1',
        title: '全厂多联机总数',
        unit: '台',
        label1: '运行',
        unit1: '台',
        label2: '关机',
        unit2: '台',
    },
    {
        type: 0,
        isPer: [false, false],
        title: '全厂室内机总数',
        unit: '台',
        label1: '运行',
        unit1: '台',
        label2: '关机',
        unit2: '台',
    },
    {
        type: 0,
        isPer: [false, false],
        title: '今日空调运行总数/开启率',
        unit: ['台', '%'],
        label1: '昨日',
        unit1: '台',
        // label2: '环比',
        // unit2: '%',
    }],
    data: [],
})

const getData = async () => {
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.kongtiaoshebeixinxi)
    if (res.code === 200) {
        state.data = []
        state.data.push([res.data.totalEquNum, res.data.vrvNum, res.data.inDoorUnitNum])
        state.data.push([res.data.vrvNum, res.data.vrvRunningNum, res.data.vrvOffNum])
        state.data.push([res.data.inDoorUnitNum, res.data.inDoorRunningNum, res.data.inDoorOffNum])
        state.data.push([[res.data.todayAirconditionRunningNum, 
            res.data.openRate],
        res.data.yesterdayAirconditionRunningNum,
        res.data.airconditionRunningNumQOQ])
    }
}

looping(getData, window.ENERGYMONITOR.looping.kongtiaoshebeixinxi)

</script>

<style lang="scss" scoped>
.ktsbxx-container {
    display: flex;
    width: 1030px;
    height: 83px;
}
</style>
