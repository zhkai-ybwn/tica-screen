<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-07 10:20:31
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-08 09:31:50
 * @FilePath: \tica-energy-plant\src\components\load-forecast\middle\LengFuHeYuCe.vue
 * @Description: 冷负荷预测
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="lfhyc-container">
        <ModuleTitle :config="state.config">
        </ModuleTitle>
        <div class="content-box">
            <div class="left-box">
                <div class="select-lu-box">
                    <div class="select-box">
                        <a-select
                            v-model:value="state.currentType" 
                            style="width: 220px;"
                            :get-popup-container="(triggerNode) => triggerNode.parentNode"
                            @change="changeType"
                        >
                            <a-select-option value="day">日</a-select-option>
                            <a-select-option value="week">周</a-select-option>
                        </a-select>
                        <a-date-picker
                            v-model:value="state.currentDate" 
                            class="custom-picker"
                            style="width: 196px;"
                            :locale="locale"
                            :get-popup-container="(triggerNode) => triggerNode.parentNode"
                            :picker="picker"
                            :allow-clear="false"
                            :disabled-date="disabledDate"
                            @change="handleChange"
                        ></a-date-picker>
                    </div>
                    <LegendUnit class="lu" :unit-list="state.unitList" :legend-list="state.legendList"></LegendUnit>
                </div>
                <LineChart
                    v-if="!state.isShowSpin"
                    class="line-chart"
                    :data="state.linesData"
                ></LineChart>
                <div v-if="!state.isShowSpin" class="weather-box">
                    <div class="weather-text">
                        <div class="w-text" :text="state.weatherText">{{ state.weatherText }}</div>
                    </div>
                    <div
                        class="weather-info"
                    >
                        <WeatherInfoItem
                            v-for="(item, index) in state.weatherInfo" 
                            :key="index"
                            :data="item"
                        ></WeatherInfoItem>
                    </div>
                </div>
                <a-spin v-if="state.isShowSpin" tip="加载中" class="spin" />
            </div>
            <div class="right-box">
                <InfoList class="il" :data="state.infoData"></InfoList>
            </div>
        </div>
        <BoxTriangle></BoxTriangle>
    </div>
</template>
<script setup>
import ModuleTitle from '../common/ModuleTitle.vue' 
import LineChart from '../common/LineChart.vue'
import InfoList from './InfoList.vue'
import LegendUnit from '../common/LegendUnit.vue'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import moment from 'moment '
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'
import WeatherInfoItem from './WeatherInfoItem.vue'
import BoxTriangle from '../common/BoxTriangle.vue'

dayjs.locale('zh-cn')

const { looping } = useEchart()

const state = reactive({
    config: {
        boxWidth: 100,
        boxHeigth: 53.7,
        titleWidth: 100,
        titleHeight: 6.89,
        text: window.FORECAST.titles.middleTitle,
        textEn: window.FORECAST.titles.middleTitleEn,
    },
    currentType: 'day',
    currentDate: '',
    dateArray: [],
    formatStr: 'YYYY-MM-DD',
    linesData: {
        actualData: [],
        forecastData: [],
    },
    unitList: [
        { text: window.FORECAST.text.lengfuheyuce.unitText, unit: window.FORECAST.text.lengfuheyuce.unit },
    ],
    legendList: [
        { text: window.FORECAST.text.lengfuheyuce.legend1, color: '#ccdfff' }, 
        { text: window.FORECAST.text.lengfuheyuce.legend2, color: '#0079ff' },
    ],
    weatherInfo: [],
    weatherText: window.FORECAST.text.lengfuheyuce.weatherText,
    infoData: {
        currentLoad: 0,
        predictedLoad: 0,
        accuracy: 0,
        accuracyLevel: '',
        nextHourForecast: 0,
    },
    isShowSpin: true,
})
const picker = computed(() => (state.currentType === 'day' ? 'date' : 'week'))

onMounted(() => {
    state.currentDate = dayjs(moment().format(state.formatStr), state.formatStr)
    state.dateArray = [moment().format(state.formatStr), moment().format(state.formatStr)]
    getData()
})

const getData = async () => {
    state.isShowSpin = true
    if (state.dateArray[0] && state.dateArray[1]) {
        const res = await axiosAPI.post(window.FORECAST.urls.lengfuheyuce,
            { startTime: state.dateArray[0], endTime: state.dateArray[1], type: state.currentType })
        if (res.code === 200) { 
            const datas = res.data
            state.linesData = { actualData: datas.actualData, forecastData: datas.forecastData }
            state.infoData = {
                currentLoad: datas.currentLoad,
                predictedLoad: datas.predictedLoad,
                accuracy: datas.accuracy,
                accuracyLevel: datas.evaluationGrade,
                nextHourForecast: datas.nextHourFL,
            }
        }
        const weatherInfo = await axiosAPI.post(window.FORECAST.urls.weather,
            { startTime: state.dateArray[0], endTime: state.dateArray[1], type: state.currentType })
        if (weatherInfo.code === 200) { 
            const datas = weatherInfo.data
            state.weatherInfo = datas
            state.isShowSpin = false
        }
    }
}

const handleChange = (value) => {
    state.dateArray = []
    state.dateArray = state.currentType === 'day' 
        ? [dayjs(value).format(state.formatStr), dayjs(value).format(state.formatStr)] 
        : getWeek(dayjs(value).format(state.formatStr))
    getData()
}

const changeType = () => {
    state.dateArray = []
    // 获取当前日期
    const value = moment().format(state.formatStr)
    state.dateArray = state.currentType === 'day' 
        ? [dayjs(value).format(state.formatStr), dayjs(value).format(state.formatStr)] 
        : getWeek(dayjs(value).format(state.formatStr))
    getData()
}

/**
 * @description: 根据日期获取当周日期范围
 * @param {*} dateStr 日期
 * @return {*} 当周日期范围
 */
const getWeek = (dateStr) => {
    const date = moment(dateStr)
    const startOfWeek = date.clone().isoWeekday(1).startOf('isoWeek')
    const endOfWeek = date.clone().isoWeekday(1).endOf('isoWeek')
    const formattedStartDate = startOfWeek.format(state.formatStr)
    const formattedEndDate = endOfWeek.format(state.formatStr)
    return [formattedStartDate, formattedEndDate]
}

/**
 * @description: 计算当前日期是否在周选择范围内
 * @param {*} current 当前日期
 * @return {*} 是否在周选择范围内
 */
const disabledDate = (current) => {
    const today = moment()
    const nextSevenDays = today.clone().add(7, 'days')
    const endOfWeek = today.clone().isoWeekday(1).endOf('isoWeek')
    return state.currentType === 'day' ? current && current > nextSevenDays
        : current && current > endOfWeek
}

looping(getData, window.FORECAST.looping.lengfuheyuce)
</script>

<style lang="scss" scoped>
.lfhyc-container {
    position: relative;
    width: 100%;
    height: 53.7%;
    background: linear-gradient(180deg, rgb(12 28 43 / 60%) 0%, rgb(31 47 80 / 60%) 100%);
    border-bottom: 1px solid rgb(204 224 255 / 70%);
    box-shadow: 0 0 22px 0 rgb(153 193 255 / 30%) inset;

    .content-box {
        display: flex;
        width: 100%;
        height: 92%;
        padding: 1.5% 0 0 2.9%;

        .left-box {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 70%;
            height: 95%;

            .spin {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .select-lu-box {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 9%;

                .select-box {
                    display: flex;

                    // justify-content: space-between;
                    width: 35%;
                    height: 100%;

                    .custom-picker {
                        margin-left: 30px;
                    }
                }

                .lu {
                    width: 25%;
                }
            }

            .line-chart {
                height: 68%;
            }

            .weather-box {
                display: flex;
                justify-content: flex-start;
                width: 100%;
                height: 18%;

                .weather-text {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 7%;
                    height: 100%;

                    @include set-back("../../../assets/imgs/load-forecast/weather-title-bg.png");

                    .w-text {
                        width: 40px;
                        font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                        letter-spacing: .4px;
                        background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                }

                .weather-text::before {
                    position: absolute;
                    z-index: -1;
                    text-shadow: 0 0 4px rgb(43 102 255 / 80%);
                    content: attr(text);
                }

                .weather-info {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 84%;
                    margin-left: 2%;
                }
            }
        }

        .right-box {
            width: 30%;
            height: 95%;
        }
    }

    ::v-deep(.ant-select) {
        height: 40px;
    }

    ::v-deep(.ant-select-selector) {
        height: 40px;
        background: rgb(96 96 96 / 20%);
        border: 1px solid #383f61;
    }

    ::v-deep(.ant-select-arrow svg) {
        fill: rgb(165 169 184 / 100%);
    }

    ::v-deep(.ant-select .ant-select-selection-item) {
        display: flex;
        align-items: center;
        height: 40px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        color: #a5a9b8;
    }

    ::v-deep(.ant-select-item:hover) {
        background: #3f4a5e;
        border-radius: 4px;
        box-shadow: 0 9px 28px 8px rgb(0 0 0 / 5%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%);
    }

    ::v-deep(.ant-select .ant-select-selection-search) {
        display: flex;
        align-items: center;
        height: 40px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        color: #a5a9b8;
    }

    ::v-deep(.ant-select-item) {
        height: 40px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        color: #a5a9b8;
        background: #2f3746;
        border-radius: 4px;
        box-shadow: 0 9px 28px 8px rgb(0 0 0 / 5%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%);
    }

    ::v-deep(.ant-select-dropdown) {
        background: #2f3746;
    }

    ::v-deep(.ant-select-item-option-active) {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        color: rgb(255 255 255 / 90%);
        background: #0079ff;
    }

    ::v-deep(.ant-select-item-option-selected) {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        color: rgb(255 255 255 / 90%);
        background: #0079ff !important;
    }

    ::v-deep(.ant-picker) {
        height: 40px;
        background: rgb(96 96 96 / 20%);
        border: 1px solid #383f61;

        &:hover {
            background: rgb(96 96 96 / 20%);
            border: 1px solid #455ddc;
            border-radius: 4px;
        }
    }

    ::v-deep(.ant-picker .ant-picker-input input) {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        color: #a5a9b8;
    }

    ::v-deep(.ant-picker .ant-picker-input ::placeholder) {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        color: #a5a9b8;
    }

    ::v-deep(.ant-picker-suffix svg) {
        fill: rgb(165 169 184 / 100%);
    }

    ::v-deep(.ant-picker-dropdown .ant-picker-panel-container) {
        background-color: rgb(47 55 70 / 100%);
        border-radius: 4px;
        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);
    }

    ::v-deep(.ant-picker-dropdown .ant-picker-cell) {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        color: rgb(255 255 255 / 25%);

        &:hover {
            background-color: rgb(63 74 94 / 100%);
            border-radius: 2px;
        }
    }

    ::v-deep(.ant-picker-dropdown .ant-picker-cell-in-view) {
        color: rgb(255 255 255 / 85%);
    }

    ::v-deep(.ant-picker-dropdown .ant-picker-cell-disabled .ant-picker-cell-inner) {
        color: rgb(0 0 0 / 25%);
        background-color: rgb(63 74 94 / 100%);
    }

    ::v-deep(.ant-picker-dropdown .ant-picker-content th) {
        color: rgb(255 255 255 / 85%);
    }

    ::v-deep(.ant-picker-dropdown .ant-picker-header) {
        color: rgb(255 255 255 / 85%);
    }

    ::v-deep(.ant-picker-dropdown .ant-picker-header >button) {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        color: rgb(255 255 255 / 25%);

        &:hover {
            color: rgb(255 255 255 / 85%);
        }
    }

    ::v-deep(.ant-picker-dropdown .ant-picker-today-btn) {
        color: rgb(0 121 255 / 100%);
        text-decoration: none;
    }

    ::v-deep(.ant-picker-dropdown .ant-picker-today-btn:hover) {
        color: rgb(0 121 255 / 60%);
        text-decoration: none;
    }

    ::v-deep(.ant-picker-week-panel-row:hover) {
        background: #3f4a5e;
        border-radius: 2px;
    }

    ::v-deep(.ant-picker-week-panel-row .ant-picker-cell-disabled) {
        background: #3f4a5e;
    }
}
</style>
