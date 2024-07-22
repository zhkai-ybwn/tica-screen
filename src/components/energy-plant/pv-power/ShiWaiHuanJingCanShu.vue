<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-11 13:53:47
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-24 14:35:00
 * @FilePath: \tica-energy-plant\src\components\energy-plant\pv-power\ShiWaiHuanJingCanShu.vue
 * @Description: 室外环境参数
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="swhjcs-container">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <div class="info-list">
                <div v-for="(item,index) in state.dataList" :key="index" class="info-item">
                    <img class="icon" :src="state.icons[index]">
                    <div class="value-name">
                        <div class="value">{{ item.value || '-' }}<span v-if="item.value">{{ item.unit }}</span></div>
                        <div class="name">{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </ModuleBox>
    </div>
</template>

<script setup>
import ModuleBox from '../common/ModuleBox.vue'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'
import tIcon from '@/assets/imgs/energy-plant/temperature_icon.png'
import hIcon from '@/assets/imgs/energy-plant/humidity_icon.png'
import sIcon from '@/assets/imgs/energy-plant/wind_speed_icon.png'

const { looping } = useEchart()

const state = reactive({
    titleConfig: {
        text: '室外环境参数',
        width: 460,
        height: 40,
    },
    boxConfig: {
        width: 460,
        height: 228,
    },
    icons: [tIcon, hIcon, tIcon, sIcon, tIcon, sIcon],
    dataList: [],
})

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGYMONITOR.urls.enviConditions)
    if (res.code === 200) {
        state.dataList = []
        state.dataList.push({
            name: '背板温度',
            value: res.data.backplaneTemperature,
            unit: '℃',
        })
        state.dataList.push({
            name: '环境湿度',
            value: res.data.envHumidity,
            unit: '%',
        })
        state.dataList.push({
            name: '露点温度',
            value: res.data.dew_pTemperature,
            unit: '℃',
        })
        state.dataList.push({
            name: '风速/2分钟',
            value: res.data.envWindSpeed2M,
            unit: 'm/s',
        })
        state.dataList.push({
            name: '环境温度',
            value: res.data.envTemperature,
            unit: '℃',
        })
        state.dataList.push({
            name: '风速/10分钟',
            value: res.data.envWindSpeed10M,
            unit: 'm/s',
        })
    }
}

looping(getData, window.ENERGYMONITOR.looping.enviConditions)
</script>

<style lang="scss" scoped>
.swhjcs-container {
    .info-list {
        display: flex;
        flex-wrap: wrap;
        width: 460px;
        height: 228px;
        padding: 18px 63px 12px 62px;

        .info-item {
            display: flex;
            width: 167.5px;

            .icon {
                width: 48px;
                height: 48px;
            }

            .value-name {
                margin-left: 12px;

                .value {
                    font-family: Barlow-Italic, sans-serif;
                    font-size: 24px;
                    font-style: italic;
                    font-weight: 600;
                    line-height: normal;
                    background: linear-gradient(180deg, #43b0ff 0%, #fff 65.43%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;

                    span {
                        font-family: HarmonyOS-Regular, sans-serif;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                        color: rgb(255 255 255 / 85%);
                    }
                }

                .name {
                    font-family: HarmonyOS-Regular, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    color: #fff;
                }
            }
        }
    }
}
</style>
