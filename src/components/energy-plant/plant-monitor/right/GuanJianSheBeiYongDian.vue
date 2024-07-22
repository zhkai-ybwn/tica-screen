<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-31 10:33:44
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-24 14:31:52
 * @FilePath: \tica-energy-plant\src\components\energy-plant\plant-monitor\right\GuanJianSheBeiYongDian.vue
 * @Description: 关键设备用电量排名统计组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="factory-ac-power">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <div class="card-info">
                <div class="today">
                    <div class="label">今日总耗电量</div>
                    <div class="value">
                        {{ state.todayTotalEC.toLocaleString() || '-' }}
                        <span v-if="state.todayTotalEC.toLocaleString()">kWh</span>
                    </div>
                </div>
                <div class="yestoday">
                    <div class="label">昨日总耗电量</div>
                    <div class="value">
                        {{ state.yesterdayTotalEC.toLocaleString() || '-' }}
                        <span v-if="state.yesterdayTotalEC.toLocaleString()">kWh</span>
                    </div>
                </div>
            </div>
            <div class="progress-list">
                <div v-for="(item,index) in state.dataList" :key="index" class="progress-item">
                    <div class="info">
                        <div :class="['pro-index', `pro-index${index}`]">{{ index + 1 }}</div>
                        <div class="pro-name">{{ item.alias }}</div>
                        <div class="pro-value">{{ item.v || '-' }}<span v-if="item.v"> kWh</span></div>
                    </div>
                    <ProgressCom 
                        :percent="(item.v/state.todayTotalEC)*100"
                        :colors="index > 2 ? state.colorsNormal : state.colorsTop"
                    ></ProgressCom>
                </div>
            </div>
        </ModuleBox>
    </div>
</template>

<script setup>
import ModuleBox from '../../common/ModuleBox.vue'
import ProgressCom from '../../common/Progress.vue'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'

const { looping } = useEchart()

const state = reactive({
    titleConfig: {
        text: window.ENERGYMONITOR.text.guanjianshebeiyongdian.title,
        width: 460,
        height: 40,
    },
    boxConfig: {
        width: 460,
        height: 587,
    },
    dataList: [],
    todayTotalEC: 0,
    yesterdayTotalEC: 0,
    colorsTop: ['rgba(143, 235, 255, 1)', 'rgba(44, 119, 233, 1)'],
    colorsNormal: ['rgba(75, 89, 124, 1)', 'rgba(161, 182, 208, 1)'],
})

const getData = async () => {
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.guanjianshebeitongji)
    if (res.code === 200) {
        state.dataList = res.data.ecranking
        state.todayTotalEC = res.data.todayTotalEC
        state.yesterdayTotalEC = res.data.yesterdayTotalEC
    }
}

looping(getData, window.ENERGYMONITOR.looping.guanjianshebeitongji)
</script>

<style lang="scss" scoped>
.factory-ac-power {
    position: relative;

    .card-info {
        position: absolute;

        .today {
            position: absolute;
            top: 32px;
            left: 24px;
            width: 198px;
            height: 88px;

            @include set-back("@/assets/imgs/energy-plant/guanjianshebei-bg.png");
        }

        .yestoday {
            position: absolute;
            top: 32px;
            left: 238px;
            width: 198px;
            height: 88px;

            @include set-back("@/assets/imgs/energy-plant/guanjianshebei-bg.png");
        }

        .label {
            position: absolute;
            top: 17px;
            left: 39px;
            font-family: SourceHanSansCN-Regular, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: #fff;
        }

        .value {
            position: absolute;
            top: 38px;
            left: 38px;
            font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
            font-size: 32px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: #fff;

            span {
                font-family: Inter-Regular, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                color: rgb(255 255 255 / 65%);
            }
        }
    }

    .progress-list {
        position: absolute;
        top: 144px;
        left: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 412px;
        height: 418px;

        .progress-item {
            .info {
                display: flex;
                align-items: center;
                margin-bottom: 5px;

                .pro-index {
                    font-family: Barlow-Italic, sans-serif;
                    font-size: 16px;
                    font-style: italic;
                    font-weight: 700;
                    line-height: normal;
                    color: #fff;
                    text-align: center;
                    letter-spacing: .8px;
                }

                .pro-index0 {
                    width: 16px;
                    height: 16px;

                    @include set-back("@/assets/imgs/energy-plant/pm1-bg.png");
                }

                .pro-index1 {
                    width: 16px;
                    height: 16px;

                    @include set-back("@/assets/imgs/energy-plant/pm2-bg.png");
                }

                .pro-index2 {
                    width: 16px;
                    height: 16px;

                    @include set-back("@/assets/imgs/energy-plant/pm3-bg.png");
                }

                .pro-name {
                    width: 300px;
                    margin-left: 8px;
                    font-family: HarmonyOS-Regular, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    color: #fff;
                }

                .pro-value {
                    width: 100px;
                    margin-left: 120px;
                    font-family: Barlow-Italic, sans-serif;
                    font-size: 20px;
                    font-style: italic;
                    font-weight: 500;
                    line-height: normal;
                    color: #fff;

                    span {
                        font-family: HarmonyOS-Regular, sans-serif;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 350;
                        line-height: normal;
                        color: rgb(255 255 255 / 65%);
                    }
                }
            }
        }
    }
}
</style>
