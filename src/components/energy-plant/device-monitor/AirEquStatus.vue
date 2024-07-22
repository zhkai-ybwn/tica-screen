<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-08 08:36:40
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-15 12:58:00
 * @FilePath: \tica-energy-plant\src\components\energy-plant\device-monitor\AirEquStatus.vue
 * @Description: 空调设备状态统计
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="air-equ-status-container">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <div class="status-box">
                <div v-for="(item,index) in state.data" :key="index" class="status-item">
                    <div class="title">{{ getTitle(index) }}</div>
                    <div class="kql">
                        <div class="kql-value">{{ item.openRate }}<span>%</span></div>
                        <div class="kql-label">开启率</div>
                    </div>
                    <div class="run-info">
                        <div class="run-value">{{ item.runningNum }}</div>
                        <div class="run-label">运行中</div>
                    </div>
                    <div class="close-info">
                        <div class="close-value">{{ item.offNum }}</div>
                        <div class="close-label">关机</div>
                    </div>
                </div>
            </div>
        </ModuleBox>
    </div>
</template>

<script setup>
import { useStore } from '@/store/index' 
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'
import ModuleBox from '../common/ModuleBox.vue'

const region = computed(() => useStore().region)
const floor = computed(() => useStore().floor)

const { looping } = useEchart()

const state = reactive({
    regionInfo: ['综合楼东区', '综合楼西区'],
    westParams: ['west_f1', 'west_f2', 'west_f3'],
    eastParams: ['east_f1', 'east_f2', 'east_f3'],
    data: [],
    titleConfig: {
        text: '空调设备状态监控',
        width: 460,
        height: 40,
    },
    boxConfig: {
        width: 460,
        height: 482,
    },
})

const getData = async () => {
    const formData = new FormData()
    formData.append('location', getParam())
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.statusStatistics, formData)
    if (res.code === 200) {
        state.data = []
        state.data.push(res.data.currentLayer)
        state.data.push(res.data.curBuilding)
        state.data.push(res.data.comBuildTotal)
    }
}

const formatRegionFloor = (s) => {
    const regionFloorMap = {
        west_f1: '天加能源基地-综合楼-综合楼西区-一楼',
        west_f2: '天加能源基地-综合楼-综合楼西区-二楼',
        west_f3: '天加能源基地-综合楼-综合楼西区-三楼',
        east_f1: '天加能源基地-综合楼-综合楼东区-一楼',
        east_f2: '天加能源基地-综合楼-综合楼东区-二楼',
        east_f3: '天加能源基地-综合楼-综合楼东区-三楼',
    }
    return regionFloorMap[s] || ''
}

const getParam = () => {
    const regionStr = region.value === 0 ? 'east' : 'west'
    return formatRegionFloor(`${regionStr}_f${floor.value}`)
}

watch([region, floor], ([newValue1, newValue2], [oldValue1, oldValue2]) => {
    if (newValue1 !== oldValue1) getData()
    if (newValue2 !== oldValue2) getData()
})

const getTitle = (index) => {
    if (index === 0) {
        return `${state.regionInfo[region.value]}-${floor.value}楼`
    } if (index === 1) {
        return state.regionInfo[region.value]
    } 
    return '综合楼'
}

looping(getData, window.ENERGYMONITOR.looping.statusStatistics)

</script>

<style lang="scss" scoped>
.air-equ-status-container {
    .status-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 484px;
        padding: 18px 21px 24px 22px;

        .status-item {
            position: relative;
            width: 416px;
            height: 132px;

            @include set-back("@/assets/imgs/energy-plant/air-equ-status-item-bg.png");

            .title {
                position: absolute;
                top: 7px;
                left: 16px;
                font-family: SourceHanSansCN-Normal, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                color: #fff;
            }

            .kql {
                position: absolute;
                top: 50px;
                left: 52px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100px;
                height: 50px;

                .kql-value {
                    font-family: Barlow-Italic, sans-serif;
                    font-size: 20px;
                    font-style: italic;
                    font-weight: 600;
                    line-height: normal;
                    color: #fff;

                    span {
                        font-family: SourceHanSansCN-Normal, sans-serif;
                        font-size: 12px;
                        font-style: normal;
                        font-weight: 350;
                        line-height: normal;
                        color: #fff;
                    }
                }

                .kql-label {
                    font-family: SourceHanSansCN-Normal, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 350;
                    line-height: normal;
                    color: rgb(255 255 255 / 85%);
                    text-align: center;
                }
            }

            .run-info {
                position: absolute;
                top: 39px;
                left: 208px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 84px;
                height: 80px;

                .run-value {
                    font-family: Barlow-Italic, sans-serif;
                    font-size: 20px;
                    font-style: italic;
                    font-weight: 600;
                    line-height: normal;
                    color: #00fff0;
                }

                .run-label {
                    font-family: SourceHanSansCN-Normal, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 350;
                    line-height: normal;
                    color: #fff;
                }
            }

            .close-info {
                position: absolute;
                top: 39px;
                right: 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 84px;
                height: 80px;

                .close-value {
                    font-family: Barlow-Italic, sans-serif;
                    font-size: 20px;
                    font-style: italic;
                    font-weight: 600;
                    line-height: normal;
                    color: #ffb321;
                }

                .close-label {
                    font-family: SourceHanSansCN-Normal, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 350;
                    line-height: normal;
                    color: #fff;
                }
            }
        }
    }
}
</style>
