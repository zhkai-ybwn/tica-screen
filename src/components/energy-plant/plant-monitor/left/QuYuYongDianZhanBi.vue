<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-30 10:36:36
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-24 14:31:10
 * @FilePath: \tica-energy-plant\src\components\energy-plant\plant-monitor\left\QuYuYongDianZhanBi.vue
 * @Description: 区域用电占比统计组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="disp-area-usage">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <div class="ring-bg1">
                <div class="ring-bg2">
                </div>
            </div>
            <RingChart class="ring-chart" :data="state.dataList"></RingChart>
            <div class="info-card">
                <div class="value-unit">
                    {{ state.dataList[state.currentItemIndex]?.per || '-' }}
                    <span v-if="state.dataList[state.currentItemIndex]?.per">%</span>
                </div>
                <div class="name">{{ state.dataList[state.currentItemIndex]?.name }}</div>
            </div>
            <div class="info-list">
                <QuYuYongDianItem 
                    v-for="(item,index) in state.dataList"
                    :key="index"
                    :data-item="item"
                    :color="state.colors[index]"
                    :show-bg="state.currentItemIndex === index"
                ></QuYuYongDianItem>
            </div>
        </ModuleBox>
        <div class="time">今日内</div>
    </div>
</template>

<script setup>
import ModuleBox from '../../common/ModuleBox.vue'
import RingChart from '../../common/RingChart.vue'
import QuYuYongDianItem from './QuYuYongDianItem.vue'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'

const { looping } = useEchart()

const state = reactive({
    titleConfig: {
        text: window.ENERGYMONITOR.text.quyuyongdianzhanbi.title,
        width: 361,
        height: 38,
    },
    boxConfig: {
        width: 361,
        height: 425,
    },
    dataList: [],
    labelUnit: window.ENERGYMONITOR.text.quyuyongdianzhanbi.labelUnit,
    colors: ['linear-gradient(103deg, #328FFF 5.75%, #4A90E4 91.56%)', 
        'linear-gradient(120deg, #716FFF 11.66%, #4560BD 66.23%)',
        'linear-gradient(167deg, #9B76CB 10.54%, #7366BE 84.92%)',
        'linear-gradient(103deg, #FFAD32 6.18%, #947A54 92%)',
        'linear-gradient(81deg, rgba(18, 228, 216, 0.85) 8.02%, rgba(49, 255, 243, 0.40) 99.18%)'],
    currentItemIndex: 0,
    intervalIndex: null,
})

onMounted(() => {
    setIntervalIndex()
})

const getData = async () => {
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.quyuyongdianzhanbi)
    if (res.code === 200) {
        setData(res.data)
    }
}

const setData = (data) => { 
    state.dataList = []
    state.dataList.push({
        name: state.labelUnit[0].label,
        unit: state.labelUnit[0].unit,
        per: data.manufacturePlantECProp,
        value: data.manufacturePlantEC,
    })
    state.dataList.push({
        name: state.labelUnit[1].label,
        unit: state.labelUnit[1].unit,
        per: data.smtProductionECProp,
        value: data.smtProductionEC,
    })
    state.dataList.push({
        name: state.labelUnit[2].label,
        unit: state.labelUnit[2].unit,
        per: data.productTransportationECProp,
        value: data.productTransportationEC,
    })
    state.dataList.push({
        name: state.labelUnit[3].label,
        unit: state.labelUnit[3].unit,
        per: data.testCenterECProp,
        value: data.testCenterEC,
    })
    state.dataList.push({
        name: state.labelUnit[4].label,
        unit: state.labelUnit[4].unit,
        per: data.comprehensiveBuildECProp,
        value: data.comprehensiveBuildEC,
    })
    state.dataList.sort((a, b) => b.value - a.value)
}

const setIntervalIndex = () => {
    state.intervalIndex = setInterval(() => {
        if (state.currentItemIndex < state.dataList.length - 1) {
            state.currentItemIndex++
        } else {
            state.currentItemIndex = 0
        }
    }, 5000)
}

onBeforeUnmount(() => {
    clearInterval(state.intervalIndex)
})

looping(getData, window.ENERGYMONITOR.looping.quyuyongdianzhanbi)
</script>

<style lang="scss" scoped>
.disp-area-usage {
    position: relative;

    .ring-bg1 {
        position: absolute;
        top: 18px;
        left: 92px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 176px;
        height: 176px;

        @include set-back("@/assets/imgs/energy-plant/ring_chart_bg1.png");

        .ring-bg2 {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 100px;

            @include set-back("@/assets/imgs/energy-plant/ring_chart_bg2.png");
        }
    }

    .ring-chart {
        position: absolute;
        top: 18px;
        left: 92px;
    }

    .info-card {
        position: absolute;
        top: 55px;
        left: 130px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;

        .value-unit {
            font-family: Barlow-Italic, sans-serif;
            font-size: 26px;
            font-style: italic;
            font-weight: 700;
            color: #fff;

            span {
                font-size: 14px;
                color: rgb(255 255 255 / 64%);
            }
        }

        .name {
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 350;
            line-height: normal;
            color: #fff;
            text-align: center;
        }
    }

    .info-list {
        position: absolute;
        top: 214px;
        left: 39px;
    }
}

.time {
    position: absolute;
    top: 10px;
    right: 16px;
    font-family: "HarmonyOS Sans SC", sans-serif;
    font-size: 14px;
    line-height: 22px;
    color: #97a3b7;
}
</style>
