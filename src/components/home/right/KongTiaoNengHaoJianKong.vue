<template>
    <div class="ktnhjk-container">
        <ModuleTitle
            :config="{
                width: 480,height: 40,
                title: state.moduleTitle,
                subTitle: '今日内',
            }"
        ></ModuleTitle>
        <div class="title-legend">
            <div class="line-title">{{ state.lineChartTitle }}</div>
            <div class="line-legend">
                <div class="sign sign1"></div>
                <div class="label">{{ state.legend1 }}</div>
                <div class="total-value total-value1" :text="state.todayEC.toLocaleString()">
                    {{ state.todayEC.toLocaleString() }}
                </div>
                <div class="sign sign2"></div>
                <div class="label"> {{ state.legend2 }}</div>
                <div class="total-value total-value2" :text="state.yesterdayEC.toLocaleString()">
                    {{ state.yesterdayEC.toLocaleString() }}
                </div>
            </div>
        </div>
        <TwoLineChart class="line-chart" :data="state.linesData" :config="{width: 449, height: 220}"></TwoLineChart>
    </div>
</template>
<script setup>
import TwoLineChart from '../common/TwoLineChart.vue'
import ModuleTitle from '../common/ModuleTitle.vue'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'

const { looping } = useEchart()
const state = reactive({
    linesData: {
        todayECInfo: [],
        yesterdayECInfo: [],
    },
    moduleTitle: window.ENERGY.text.kongtiaonenghaojiankong.moduleTitle,
    lineChartTitle: window.ENERGY.text.kongtiaonenghaojiankong.lineChartTitle,
    legend1: window.ENERGY.text.kongtiaonenghaojiankong.legend1,
    legend2: window.ENERGY.text.kongtiaonenghaojiankong.legend2,
    todayEC: 0,
    yesterdayEC: 0,
})
const getData = async () => {
    const res = await axiosAPI.get(window.ENERGY.urls.kongtiaonenghaojiankong)
    if (res.code === 200) {
        const datas = res.data
        state.linesData = { todayECInfo: datas.todayECInfo, yesterdayECInfo: datas.yestodayECInfo }
        state.todayEC = datas.todayEC
        state.yesterdayEC = datas.yesterdayEC
    }
}

looping(getData, window.ENERGY.looping.kongtiaonenghaojiankong)
</script>

<style lang="scss" scoped>
.ktnhjk-container {
    position: relative;
    width: 480px;
    height: 312px;
    background: rgb(6 12 28 / 50%);
    backdrop-filter: blur(7.5px);

    .title-legend {
        position: absolute;
        top: 65px;
        left: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 421px;
        height: 24px;

        .line-title {
            width: 235px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            color: rgb(255 255 255 / 90%);
            text-align: left;
        }

        .line-legend {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: fit-content;

            .sign {
                width: 10px;
                height: 10px;
            }

            .sign1 {
                background: linear-gradient(180deg, #1890ff 0%, rgb(24 144 255 / 20%) 100%);
            }

            .sign2 {
                margin-left: 24px;
                background: rgb(255 255 255 / 80%);
            }

            .label {
                width: 60px;
                margin-left: 8px;
                font-family: HarmonyOS-Regular, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                color: rgb(255 255 255 / 80%);
            }

            .total-value {
                width: fit-content;
                margin-left: 8px;
                font-family: AlimamaShuHeiTi-Bold, sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 700;
                background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .total-value::before {
                position: absolute;
                z-index: -1;
                text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
                content: attr(text);
            }

            // .total-value1 {}

            // .total-value1 {}
        }
    }

    .line-chart {
        position: absolute;
        top: 79px;
    }
}
</style>
