<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-11 08:57:31
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-10-25 15:36:37
 * @FilePath: \tica-energy-plant\src\components\load-forecast\middle\InfoList.vue
 * @Description: 冷负荷预测-右侧信息面板
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="info-list-container">
        <!-- 当前负荷 -->
        <InfoItem :data="state.currentLoadData"></InfoItem>
        <!-- 预测负荷 -->
        <InfoItem :data="state.predictedLoadData"></InfoItem>
        <!-- 精度、评价等级 -->
        <div class="accuracy">
            <div class="acc-text1 text" :text="state.accuracyData.text1">{{ state.accuracyData.text1 }}</div>
            <div class="value-unit">
                <div class="acc-value green-com">{{ state.accuracyData.value1 }}</div>
                <div class="acc-unit green-com">{{ state.accuracyData.unit }}</div>
            </div>
            <div class="acc-text2 text" :text="state.accuracyData.text2">{{ state.accuracyData.text2 }}</div>
            <div class="acc-level green-com">{{ state.accuracyData.value2 }}</div>
        </div>
        <!-- 下小时预测 -->
        <InfoItem :data="state.nextHourForecastData"></InfoItem>
    </div>
</template>

<script setup>
import InfoItem from '../common/InfoItem.vue'

const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            currentLoad: 0,
            predictedLoad: 0,
            accuracy: 0,
            accuracyLevel: '',
            nextHourForecast: 0,
        }),
    },
})

const currentLoadC = computed(() => props.data.currentLoad)
const predictedLoadC = computed(() => props.data.predictedLoad)
const nextHourForecastC = computed(() => props.data.nextHourForecast)
const accuracyC = computed(() => props.data.accuracy)
const accuracyLevelC = computed(() => props.data.accuracyLevel)

const state = reactive({
    currentLoadData: {
        text: window.FORECAST.text.lengfuheyuce.infoText1,
        value: currentLoadC,
        unit: window.FORECAST.text.lengfuheyuce.infoUnit1,
    },
    predictedLoadData: {
        text: window.FORECAST.text.lengfuheyuce.infoText2,
        value: predictedLoadC,
        unit: window.FORECAST.text.lengfuheyuce.infoUnit2,
    },
    nextHourForecastData: {
        text: window.FORECAST.text.lengfuheyuce.infoText5,
        value: nextHourForecastC,
        unit: window.FORECAST.text.lengfuheyuce.infoUnit5,
    },
    accuracyData: {
        text1: window.FORECAST.text.lengfuheyuce.infoText3,
        value1: accuracyC,
        unit: window.FORECAST.text.lengfuheyuce.infoUnit3,
        text2: window.FORECAST.text.lengfuheyuce.infoText4,
        value2: accuracyLevelC,
    },
})
</script>

<style lang="scss" scoped>
.info-list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    // width: 454px;
    // height: 540px;
    width: 100%;
    height: 100%;

    .accuracy {
        position: relative;
        width: 365.5px;
        height: 110px;

        @include set-back("../../../assets/imgs/load-forecast/accuracy-bg.png");

        .acc-text1 {
            position: absolute;
            top: 45px;
            left: 36px;
        }

        .acc-text2 {
            position: absolute;
            top: 32px;
            right: 40px;
        }

        .text {
            font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .text::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: attr(text);
        }

        .green-com {
            font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            color: #00ff9f;
        }

        .value-unit {
            position: absolute;
            top: 42px;
            right: 185px;
            display: flex;

            .acc-value {
                width: fit-content;
                font-size: 28px;
                text-shadow: 0 0 2px rgb(0 255 159 / 80%);
            }

            .acc-unit {
                margin-top: 4px;
                margin-left: 2px;
                font-size: 14px;
            }
        }

        .acc-level {
            position: absolute;
            top: 56px;
            left: 252px;
            font-size: 20px;
            text-shadow: 0 0 2px rgb(0 255 159 / 80%);
        }
    }
}
</style>
