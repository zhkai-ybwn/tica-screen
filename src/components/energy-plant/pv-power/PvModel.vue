<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-13 15:36:45
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-27 15:07:39
 * @FilePath: \tica-energy-plant\src\components\energy-plant\pv-power\PvModel.vue
 * @Description: 光伏直驱发电组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="pv-model-container">
        <PvStatusModal
            class="pos-abu"
            :status-info="{status: state.modularMachine1Status, label:'模块机', type: 1}" 
            :style="{top: `${state.positions[0][0]}px`,left: `${state.positions[0][1]}px`}"
        ></PvStatusModal>
        <PvStatusModal
            class="pos-abu"
            :status-info="{status: state.modularMachine2Status, label:'模块机', type: 1}"  
            :style="{top: `${state.positions[1][0]}px`,left: `${state.positions[1][1]}px`}"
        ></PvStatusModal>
        <PvStatusModal
            class="pos-abu"
            :status-info="{status: state.modularMachine3Status, label:'模块机', type: 1}"  
            :style="{top: `${state.positions[2][0]}px`,left: `${state.positions[2][1]}px`}"
        ></PvStatusModal>
        <PvStatusModal
            class="pos-abu"
            :status-info="{status: state.modularMachine4Status, label:'模块机', type: 1}"  
            :style="{top: `${state.positions[3][0]}px`,left: `${state.positions[3][1]}px`}"
        ></PvStatusModal>
        <PvStatusModal
            class="pos-abu"
            :status-info="{status: state.chilledWaterPump1Status, label:'冷水泵', type: 3}" 
            :style="{top: `${state.positions[4][0]}px`,left: `${state.positions[4][1]}px`}"
        ></PvStatusModal>
        <PvStatusModal
            class="pos-abu" 
            :status-info="{status: state.chilledWaterPump2Status, label:'冷水泵', type: 3}"
            :style="{top: `${state.positions[5][0]}px`,left: `${state.positions[5][1]}px`}"
        ></PvStatusModal>
        <PvStatusModal
            class="pos-abu" 
            :status-info="{status: state.mainEngineStatus, label:'磁悬浮主机', type: 2}"
            :style="{top: `${state.positions[6][0]}px`,left: `${state.positions[6][1]}px`}"
        ></PvStatusModal>
        <PvStatusModal
            class="pos-abu" 
            :status-info="{status: state.coolingWaterPump1Status, label:'冷却水泵', type: 3}"
            :style="{top: `${state.positions[7][0]}px`,left: `${state.positions[7][1]}px`}"
        ></PvStatusModal>
        <PvStatusModal
            class="pos-abu" 
            :status-info="{status: state.coolingWaterPump2Status, label:'冷却水泵', type: 3}"
            :style="{top: `${state.positions[8][0]}px`,left: `${state.positions[8][1]}px`}"
        ></PvStatusModal>
        <PvStatusModal
            class="pos-abu" 
            :status-info="{status: state.coolingTowerStatus, label:'冷却塔', type: 3}"
            :style="{top: `${state.positions[9][0]}px`,left: `${state.positions[9][1]}px`}"
        ></PvStatusModal>
        <div class="text">
            <div class="on">运行中<span>{{ state.runningNum }}</span>台</div>
            <div class="off">关机<span>{{ state.offNum }}</span>台</div>
        </div>
    </div>
</template>

<script setup>
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'
import PvStatusModal from './PvStatusModal.vue'

const { looping } = useEchart()

const state = reactive({
    positions: [
        [76, 609],
        [76, 701],
        [76, 792], 
        [76, 883],
        [179, 769],
        [179, 883],
        [259, 460],
        [362, 619],
        [362, 738],
        [370, 925]],
    chilledWaterPump1Status: '',
    chilledWaterPump2Status: '',
    coolingTowerStatus: '',
    coolingWaterPump1Status: '',
    coolingWaterPump2Status: '',
    equipmentTotalNum: '',
    mainEngineStatus: '',
    modularMachine1Status: '',
    modularMachine2Status: '',
    modularMachine3Status: '',
    modularMachine4Status: '',
    offNum: '',
    runningNum: '',
})

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGYMONITOR.urls.equipmentStatus)
    if (res.code === 200) {
        state.chilledWaterPump1Status = res.data.chilledWaterPump1Status
        state.chilledWaterPump2Status = res.data.chilledWaterPump2Status
        state.coolingTowerStatus = res.data.coolingTowerStatus
        state.coolingWaterPump1Status = res.data.coolingWaterPump1Status
        state.coolingWaterPump2Status = res.data.coolingWaterPump2Status
        state.equipmentTotalNum = res.data.equipmentTotalNum
        state.mainEngineStatus = res.data.mainEngineStatus
        state.modularMachine1Status = res.data.modularMachine1Status
        state.modularMachine2Status = res.data.modularMachine2Status
        state.modularMachine3Status = res.data.modularMachine3Status
        state.modularMachine4Status = res.data.modularMachine4Status
        state.offNum = res.data.offNum
        state.runningNum = res.data.runningNum
    }
}

looping(getData, window.ENERGYMONITOR.looping.equipmentStatus)
</script>

<style lang="scss" scoped>
.pv-model-container {
    position: relative;
    width: 1388px;
    height: 516px;

    @include set-back("@/assets/imgs/energy-plant/pv_model_bg.png");

    .pos-abu {
        position: absolute;
    }

    .text {
        position: absolute;
        bottom: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 14px;
        font-weight: 400;
        color: #fff;

        .on {
            margin-right: 50px;

            span {
                margin-left: 8px;
                font-family: Barlow-Italic, sans-serif;
                font-size: 20px;
                font-weight: normal;
                color: #00fff0;
                vertical-align: bottom;
            }

            &::before {
                position: absolute;
                top: 8px;
                left: 582px;
                width: 10px;
                height: 10px;
                content: "";
                background-color: #00fff0;
            }
        }

        .off {
            span {
                margin-left: 8px;
                font-family: Barlow-Italic, sans-serif;
                font-size: 20px;
                font-weight: normal;
                color: #ffb800;
                vertical-align: bottom;
            }

            &::before {
                position: absolute;
                top: 8px;
                left: 709px;
                width: 10px;
                height: 10px;
                content: "";
                background-color: #ffb800;
            }
        }
    }
}
</style>
