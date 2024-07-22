<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-19 16:31:09
 * @LastEditors: zhkai 2572429235@qq.com
 * @LastEditTime: 2023-10-17 14:14:45
 * @FilePath: \tica-energy-plant\src\components\home\left\QuanChangNengHaoJianKong.vue
 * @Description: 全厂能耗监控
-->
<template>
    <div class="qcnhjk-container">
        <ModuleTitle
            :config="{width: 480,
                      height: 40,
                      title: state.moduleTitle,
                      subTitle: '今日内',
            }"
        ></ModuleTitle>
        <!-- 全场能耗趋势 -->
        <div class="qcnhqs-box">
            <div class="title-legend">
                <div class="line-title">{{ state.lineChartTitle }}</div>
                <div class="line-legend">
                    <div class="sign sign1"></div>
                    <div class="label">{{ state.lineLegend1 }}</div>
                    <div class="sign sign2"></div>
                    <div class="label"> {{ state.lineLegend2 }}</div>
                </div>
            </div>
            <TwoLineChart
                class="line-chart"
                :data="state.linesData" 
            ></TwoLineChart>
        </div>
        <!-- 分区域能耗 -->
        <div class="fqynh-box">
            <div class="title-legend">
                <div class="bar-title">{{ state.barChartTitle }}</div>
                <div class="bar-legend">
                    <div class="sign sign3"></div>
                    <div class="label">{{ state.barLegend1 }}</div>
                    <div class="sign sign4"></div>
                    <div class="label"> {{ state.barLegend2 }}</div>
                    <div class="sign sign5"></div>
                    <div class="label"> {{ state.barLegend3 }}</div>
                </div>
            </div>
            <DBarChart class="bar-chart" :data="state.barData"></DBarChart>
            <div class="cir-chart-box">
                <CircularChart
                    v-for="(item, index) in state.cirDataList"
                    :key="index" 
                    :data="item"
                    :config="state.configList[index]"
                ></CircularChart>
            </div>
        </div>
    </div>
</template>

<script setup>
import ModuleTitle from '../common/ModuleTitle.vue'
import TwoLineChart from '../common/TwoLineChart.vue'
import DBarChart from '../common/3dBarChart.vue'
import CircularChart from '../common/CircularChart.vue'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'

const { looping } = useEchart()
const state = reactive({
    linesData: {
        todayECInfo: [],
        yesterdayECInfo: [],
    },
    moduleTitle: window.ENERGY.text.quanchangnenghaoqushi.moduleTitle,
    lineChartTitle: window.ENERGY.text.quanchangnenghaoqushi.lineChartTitle,
    lineLegend1: window.ENERGY.text.quanchangnenghaoqushi.legend1,
    lineLegend2: window.ENERGY.text.quanchangnenghaoqushi.legend2,
    barData: {
        xData: [],
        yData: [],
    },
    barChartTitle: window.ENERGY.text.quanchangnenghaoqushi.barChartTitle,
    barLegend1: window.ENERGY.text.quanchangnenghaoqushi.legend3,
    barLegend2: window.ENERGY.text.quanchangnenghaoqushi.legend4, 
    barLegend3: window.ENERGY.text.quanchangnenghaoqushi.legend5,
    cirDataList: [],
    configList: [
        {
            width: 108,
            height: 108,
            color: ['rgba(24, 144, 255, 1)', 'rgba(24, 144, 255, 1)'],
        },
        {
            width: 108,
            height: 108,
            color: ['rgba(255, 133, 46, 1)', 'rgba(255, 133, 46, 1)'],
        },
        {
            width: 108,
            height: 108,
            color: ['rgba(24, 144, 255, 1)', 'rgba(24, 144, 255, 1)'],
        },
    ],
})

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGY.urls.quanchangnenghaojiankong)
    if (res.code === 200) {
        const datas = res.data
        state.cirDataList = []
        state.linesData = { todayECInfo: datas.todayECInfo, yesterdayECInfo: datas.yesterdayECInfo }
        const yData = [
            datas.manufacturePlantEC, 
            datas.testCenterEC,
            datas.smtProductionEC,
            datas.comprehensiveBuildEC,
            datas.productTransportationEC,
        ]
        state.barData = getBarData(yData)
        state.cirDataList.push({ 
            value: Math.abs(datas.manufacturePlantECQOQ), 
            increaseOrDecrease: datas.manufacturePlantECQOQ > 0, 
            text: window.ENERGY.text.quanchangnenghaoqushi.cirText1,
        })
        state.cirDataList.push({ 
            value: Math.abs(datas.comprehensiveBuildECQOQ), 
            increaseOrDecrease: datas.comprehensiveBuildECQOQ > 0, 
            text: window.ENERGY.text.quanchangnenghaoqushi.cirText2,
        })
        state.cirDataList.push({ 
            value: Math.abs(datas.testCenterECQOQ), 
            increaseOrDecrease: datas.testCenterECQOQ > 0,
            text: window.ENERGY.text.quanchangnenghaoqushi.cirText3,
        })
    }
}

const getBarData = (yData) => {
    const xData = ['制造厂区', '测试中心', '思茂特生产', '综合楼', '成品储运部']
    // 创建一个索引数组并根据yData的值进行排序
    const sortedIndex = yData.map((value, index) => index).sort((a, b) => yData[b] - yData[a])
    // 使用排序后的索引重新排列xData和yData
    const sortedXData = sortedIndex.map(index => xData[index])
    const sortedYData = sortedIndex.map(index => yData[index])
    return {
        xData: sortedXData,
        yData: sortedYData,
    }
}
looping(getData, window.ENERGY.looping.quanchangnenghaojiankong)
</script>

<style lang="scss" scoped>
.qcnhjk-container {
    position: relative;
    width: 480px;
    height: 770px;
    background: rgb(6 12 28 / 50%);
    backdrop-filter: blur(7.5px);

    .qcnhqs-box {
        position: absolute;
        top: 73px;
        left: 26px;

        .title-legend {
            position: absolute;
            left: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 413px;
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
                width: 168px;

                .sign {
                    width: 10px;
                    height: 10px;
                }

                .sign1 {
                    background: linear-gradient(180deg, #1890ff 0%, rgb(24 144 255 / 20%) 100%);
                }

                .sign2 {
                    background: rgb(255 255 255 / 80%);
                }

                .label {
                    font-family: HarmonyOS-Regular, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    color: rgb(255 255 255 / 80%);
                }
            }
        }

        .line-chart {
            position: absolute;
            top: 35px;
            left: -26px;
        }
    }

    .fqynh-box {
        position: absolute;
        top: 356px;
        left: 26px;

        .title-legend {
            position: absolute;
            left: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 413px;
            height: 24px;

            .bar-title {
                width: 235px;
                font-family: HarmonyOS-Regular, sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                color: rgb(255 255 255 / 90%);
                text-align: left;
            }

            .bar-legend {
                display: flex;
                align-items: center;
                justify-content: space-around;
                width: 300px;

                .sign {
                    width: 10px;
                    height: 10px;
                }

                .sign3 {
                    background: linear-gradient(180deg, #ff852e 0%, rgb(255 133 46 / 20%) 100%);
                }

                .sign4 {
                    background: linear-gradient(180deg, #01ffc2 0%, rgb(1 255 194 / 20%) 100%);
                }

                .sign5 {
                    background: var(--dark-linear-1, linear-gradient(180deg, #1890ff 0%, rgb(24 144 255 / 20%) 100%));
                }

                .label {
                    font-family: HarmonyOS-Regular, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    color: rgb(255 255 255 / 80%);
                }
            }
        }

        .bar-chart {
            position: absolute;
            top: 51px;
            left: -26px;
        }

        .cir-chart-box {
            position: absolute;
            top: 271px;
            left: 22px;
            display: flex;
            justify-content: space-between;
            width: 364px;
        }
    }
}

</style>
