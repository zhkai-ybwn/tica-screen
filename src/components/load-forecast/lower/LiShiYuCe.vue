<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-08 08:52:11
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-10-25 15:43:57
 * @FilePath: \tica-energy-plant\src\components\load-forecast\lower\LiShiYuCe.vue
 * @Description: 历史预测
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="lsyc-container">
        <ModuleTitle :config="state.config"></ModuleTitle>
        <div class="content-box">
            <div class="left-box">
                <div class="left-title-lu-box">
                    <div class="title left-title">{{ state.title1 }}</div>
                    <LegendUnit
                        class="left-lu"
                        :unit-list="state.unitList" 
                        :legend-list="state.legendList"
                    ></LegendUnit>
                </div>
                <LineChart
                    v-if="!state.isShowYesSpin" 
                    :data="state.yesterdayForecast"
                    class="yes-line-chart"
                    :config="{width: 38.33, height: 18.52}"
                ></LineChart>
                <a-spin v-if="state.isShowYesSpin" tip="加载中" class="yes-spin"></a-spin>
            </div>
            <div class="center-box">
                <div class="center-title-lu-box">
                    <div class="title center-title">{{ state.title2 }}</div>
                    <LegendUnit
                        class="center-lu"
                        :unit-list="state.unitList" 
                        :legend-list="state.legendList"
                    ></LegendUnit>
                </div>
                <LineChart
                    v-if="!state.isShowWeekSpin" 
                    :data="state.lastWeekForecast"
                    class="week-line-chart"
                    :config="{width: 38.33, height: 18.52}"
                ></LineChart>
                <a-spin v-if="state.isShowWeekSpin" tip="加载中" class="week-spin"></a-spin>
            </div>
            <div class="right-box">
                <AccuracyInfo class="acc1" :data="state.yesterdayAverAcc"></AccuracyInfo>
                <AccuracyInfo class="acc2" :data="state.lastWeekAverAcc"></AccuracyInfo>
            </div>
        </div>
        <BoxTriangle></BoxTriangle>
    </div>
</template>
<script setup>
import ModuleTitle from '../common/ModuleTitle.vue'
import LineChart from '../common/LineChart.vue'
import LegendUnit from '../common/LegendUnit.vue'
import AccuracyInfo from './AccuracyInfo.vue'
import BoxTriangle from '../common/BoxTriangle.vue'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'
import moment from 'moment'

const { looping } = useEchart()

const state = reactive({
    config: {
        boxWidth: 100,
        boxHeigth: 53.7,
        titleWidth: 100,
        titleHeight: 11.48,
        text: window.FORECAST.titles.lowerTitle,
        textEn: window.FORECAST.titles.lowerTitleEn,
    },
    yesterdayForecast: {
        actualData: [],
        forecastData: [],
    },
    lastWeekForecast: {
        actualData: [],
        forecastData: [],
    },
    unitList: [
        { text: window.FORECAST.text.lishiyuce.unitText, unit: window.FORECAST.text.lishiyuce.unit },
    ],
    legendList: [
        { text: window.FORECAST.text.lishiyuce.legend1, color: '#ccdfff' }, 
        { text: window.FORECAST.text.lishiyuce.legend2, color: '#0079ff' },
    ],
    title1: window.FORECAST.text.lishiyuce.title1,
    title2: window.FORECAST.text.lishiyuce.title2,
    yesterdayAverAcc: {
        text: window.FORECAST.text.lishiyuce.accText1,
        value: 0,
    },
    lastWeekAverAcc: {
        text: window.FORECAST.text.lishiyuce.accText2,
        value: 0,
    },
    isShowYesSpin: true,
    isShowWeekSpin: true,
})

const getYesData = async () => {
    state.isShowYesSpin = true
    const yesParams = getYesParams()
    const resYes = await axiosAPI.post(window.FORECAST.urls.lishiyuce, yesParams)
    if (resYes.code === 200) {
        const datas = resYes.data
        state.yesterdayForecast = { actualData: datas.actValue, 
            forecastData: datas.histPreValue }
        state.yesterdayAverAcc.value = datas.avaccuracy
        state.isShowYesSpin = false
    }
}

const getWeekData = async () => {
    state.isShowWeekSpin = true
    const weekParams = getWeekParams()
    const resWeek = await axiosAPI.post(window.FORECAST.urls.lishiyuce, weekParams)
    if (resWeek.code === 200) {
        const datas = resWeek.data
        state.lastWeekForecast = { actualData: datas.actValue, 
            forecastData: datas.histPreValue }
        state.lastWeekAverAcc.value = datas.avaccuracy
        state.isShowWeekSpin = false
    }
}

const getYesParams = () => {
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
    return { startTime: yesterday, endTime: yesterday }
}

const getWeekParams = () => {
    const currentDate = moment()
    // 获取上一周的开始日期（上周一）
    const lastWeekStartDate = currentDate.clone().subtract(1, 'weeks').startOf('isoWeek')
    // 获取上一周的结束日期（上周日）
    const lastWeekEndDate = currentDate.clone().subtract(1, 'weeks').endOf('isoWeek')
    // 格式化日期范围
    const startDateFormatted = lastWeekStartDate.format('YYYY-MM-DD')
    const endDateFormatted = lastWeekEndDate.format('YYYY-MM-DD')
    return { startTime: startDateFormatted, endTime: endDateFormatted }
}

looping(getYesData, window.FORECAST.looping.lishiyuce)

looping(getWeekData, window.FORECAST.looping.lishiyuce)

</script>

<style lang="scss" scoped>
.lsyc-container {
    position: relative;
    width: 100%;
    height: 32.22%;
    background: linear-gradient(180deg, rgb(12 28 43 / 60%) 0%, rgb(31 47 80 / 60%) 100%);
    border-bottom: 1px solid rgb(204 224 255 / 70%);
    box-shadow: 0 0 22px 0 rgb(153 193 255 / 30%) inset;

    .content-box {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 85%;
        padding: 1.5% 2.9% 0;

        .left-box {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 42%;

            .left-title-lu-box {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 9%;

                .left-title {
                    width: 25%;
                }

                .left-lu {
                    width: 42%;
                }
            }

            .yes-line-chart {
                height: 85%;
            }

            .yes-spin {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .center-box {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 42%;

            .center-title-lu-box {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 9%;

                .center-title {
                    width: 25%;
                }

                .center-lu {
                    width: 43%;
                }
            }

            .week-line-chart {
                height: 85%;
            }

            .week-spin {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .right-box {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 10%;

            .acc1 {
                margin-top: -20px;
            }

            .acc2 {
                margin-top: -20px;
            }
        }
    }

    .title {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        color: rgb(255 255 255 / 80%);
    }
}
</style>
