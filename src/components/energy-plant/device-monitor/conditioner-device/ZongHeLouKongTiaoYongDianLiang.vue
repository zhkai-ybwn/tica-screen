<template>
    <div class="power">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <div class="top-box">
                <div class="total-value-unit">
                    {{ state.totalPower || '-' }}
                    <span v-if="state.totalPower">kWh</span>
                </div>
                <div class="total-label">综合楼总用电量</div>
            </div>
            <div class="bottom-box ">
                <div class="icon"></div>
                <div class="chart-section">
                    <div v-for="(item, index) in state.chartList" :key="index" class="chart-item">
                        <div class="chart-bg">
                            <RingPercentage 
                                class="ring-chart"
                                :config="state.chartConfig" 
                                :data="item.pro"
                                :color="state.colors[index]"
                            >
                            </RingPercentage>
                        </div>
                        <div class="value-unit">
                            {{ item.value || '-' }}
                            <span v-if="item.value">kWh</span>
                        </div>
                        <div class="sign-label">
                            <div class="sign" :style="{ background: `${state.backColors[index]}` }"></div>
                            <div class="label">{{ state.labels[index] }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </ModuleBox>
        <div class="time">今日内</div>
    </div>
</template>

<script setup>
import ModuleBox from '../../common/ModuleBox.vue'
import RingPercentage from '../../common/RingPercentage.vue'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'

const state = reactive({
    titleConfig: {
        text: '综合楼空调用电量统计',
        width: 460,
        height: 40,
    },
    boxConfig: {
        width: 460,
        height: 367,
    },
    chartConfig: {
        width: 117,
        height: 117,
        barWidth: 17,
        fontSize: '22px',
    },
    totalPower: 0,
    chartList: [],
    colors: [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#35FFCF', // 0% 处的颜色
        }, {
            offset: 1, color: '#308772', // 100% 处的颜色
        }],
        global: false, // 缺省为 false
    }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#328FFF', // 0% 处的颜色
        }, {
            offset: 1, color: '#4A90E4', // 100% 处的颜色
        }],
        global: false, // 缺省为 false
    }],
    backColors: [
        'linear-gradient(220deg, #35FFCF 9.98%, #308772 89.11%)',
        'linear-gradient(134deg, #328FFF 2.32%, #4A90E4 92.82%)',
    ],
    labels: ['综合楼东区', '综合楼西区'],
})

const { looping } = useEchart()

const getData = async () => {
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.compBuildingECStatistics)
    if (res.code === 200) {
        state.chartList = []
        state.totalPower = res.data.totalEC
        state.chartList.push({ value: res.data.eastEC, pro: res.data.eastECProp })
        state.chartList.push({ value: res.data.westEC, pro: res.data.westECProp })
    }
}
looping(getData, window.ENERGYMONITOR.looping.compBuildingECStatistics)
</script>
<style lang="scss" scoped>
.power {
    position: relative;

    .top-box {
        width: 460px;
        height: 115px;
        padding-top: 32px;
        padding-left: 198px;
        margin-top: 9px;

        @include set-back("@/assets/imgs/energy-plant/power_bg.png");

        .total-value-unit {
            margin-bottom: 3px;
            font-family: Barlow-Italic, sans-serif;
            font-size: 32px;
            font-style: italic;
            font-weight: 700;
            color: #fff;

            span {
                font-size: 18px;
                color: rgb(255 255 255 / 64%);
            }
        }

        .total-label {
            font-family: Inter-Regular, sans-serif;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: rgb(255 255 255 / 85%);
        }
    }

    .bottom-box {
        position: relative;

        .icon {
            position: absolute;
            top: 191px;
            left: 39px;
            width: 386px;
            height: 21px;

            @include set-back("@/assets/imgs/energy-plant/pv-icon-right.png");
        }

        .chart-section {
            display: flex;
            justify-content: scenter;
            padding-top: 28px;
            margin-left: 76px;

            .chart-item {
                margin-right: 64px;

                .chart-bg {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 117px;
                    height: 117px;

                    @include set-back("@/assets/imgs/energy-plant/ring-chart-bg.png");
                }

                .value-unit {
                    padding-top: 9px;
                    font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 400;
                    color: #fff;
                    text-align: center;

                    span {
                        font-family: Inter-Regular, sans-serif;
                        font-size: 14px;
                        color: rgb(255 255 255 / 65%);
                    }
                }

                .sign-label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 4px;

                    .sign {
                        width: 6px;
                        height: 6px;
                        border: 1px solid rgb(255 255 255 / 20%);
                    }

                    .label {
                        margin-left: 6px;
                        font-family: SourceHanSansCN-Regular, sans-serif;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 350;
                        color: #fff;
                    }
                }
            }
        }
    }

    .time {
        position: absolute;
        top: 10px;
        left: 399px;
        width: 42px;
        height: 22px;
        font-family: "HarmonyOS Sans SC", sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: #97a3b7;
    }
}
</style>
