<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-05 09:58:47
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-26 14:15:42
 * @FilePath: \tica-energy-plant\src\components\energy-plant\device-monitor\DeviceStateInfo.vue
 * @Description: 设备状态信息
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="device-state-container">
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
import DeviceStateItem from './DeviceStateItem.vue'

const { looping } = useEchart()

const state = reactive({
    config: [{
        type: 0,
        isPer: [false, false],
        class1: 'data-value1',
        class2: 'data-value2',
        title: '全厂关键设备总数',
        unit: '台',
        label1: '运行',
        unit1: '台',
        label2: '关机',
        unit2: '台',
    },
    {
        type: 0,
        isPer: [false, false],
        class1: 'data-value1',
        title: '关键设备开动率',
        unit: '%',
        label1: '昨日',
        unit1: '%',
        // label2: '环比',
        // unit2: '%',
    },
    {
        type: 1,
        isPer: [true, true],
        title: '关键设备今日耗电量',
        unit: 'kWh',
        label1: '同比',
        unit1: '%',
        label2: '环比',
        unit2: '%',
    },
    {
        type: 1,
        isPer: [true, false],
        title: '关键设备全年耗电量',
        unit: 'kWh',
        label1: '环比',
        unit1: '%',
    }],
    data: [],
})

const getData = async () => {
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.equOverview)
    if (res.code === 200) {
        state.data = []
        state.data.push([res.data.eqNum, res.data.runningNum, res.data.offNum])
        state.data.push([res.data.actRate, res.data.yesterdayActRate, res.data.actRateQOQ])
        state.data.push([res.data.todayEQEC, res.data.todayEQECYOY, res.data.todayEQECQOQ])
        state.data.push([res.data.yearEQEC, res.data.yearEQECYOY])
    }
}

looping(getData, window.ENERGYMONITOR.looping.equOverview)

</script>

<style lang="scss" scoped>
.device-state-container {
    display: flex;
    width: 1030px;
    height: 83px;
}
</style>
