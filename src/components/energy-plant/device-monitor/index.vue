<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-04 10:32:05
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-27 13:47:57
 * @FilePath: \tica-energy-plant\src\components\energy-plant\device-monitor\index.vue
 * @Description: 设备态势监控入口组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="device-monitor-container">
        <SwitchButton :class="[deviceType === 0 ? 'swb0' : 'swb1']"></SwitchButton>
        <div v-if="deviceType === 0">
            <DongXiLianDong class="switch"></DongXiLianDong>
            <KongTiaoSheBeiXinXi class="ktsbxx"></KongTiaoSheBeiXinXi>
            <ZongHeLouKongTiaoYongDianLiang class="zhlkt"></ZongHeLouKongTiaoYongDianLiang>
            <AirEquStatus class="aes"></AirEquStatus>
            <YongDianLiangQuShi class="ydlqs"></YongDianLiangQuShi>
            <KongTiaoKaiQiLv class="ktkql"></KongTiaoKaiQiLv>
            <ConditionerEast v-if="region===0" class="east"></ConditionerEast>
            <ConditionerWest v-if="region === 1" class="west"></ConditionerWest>
        </div>
        <div v-if="deviceType === 1">
            <DeviceStateInfo class="dsi"></DeviceStateInfo>
            <KeyStatusMonitor class="ksm"></KeyStatusMonitor>
            <IndoorEnvironment :data="state.modalObj" class="ie"></IndoorEnvironment>
            <KeyEquModel class="kem"></KeyEquModel>
            <KeyEquModal v-if="state.isHover" :data="state.modalObj" :class="`kem-modal${state.idx}`"></KeyEquModal>
            <BottomBox class="bottom"></BottomBox>
        </div>
    </div>
</template>

<script setup>
import SwitchButton from './SwitchButton.vue'
import DeviceStateInfo from './DeviceStateInfo.vue'
import KeyStatusMonitor from './KeyStatusMonitor.vue'
import IndoorEnvironment from './IndoorEnvironment.vue'
import KeyEquModel from './KeyEquModel.vue'
import KeyEquModal from './KeyEquModal.vue'
import BottomBox from './key-device-bottom/BottomBox.vue'
import DongXiLianDong from './conditioner-device/DongXiLianDong.vue'
import KongTiaoSheBeiXinXi from './conditioner-device/KongTiaoSheBeiXinXi.vue'
import ZongHeLouKongTiaoYongDianLiang from './conditioner-device/ZongHeLouKongTiaoYongDianLiang.vue'
import AirEquStatus from './AirEquStatus.vue'
import YongDianLiangQuShi from './YongDianLiangQuShi.vue'
import KongTiaoKaiQiLv from './KongTiaoKaiQiLv.vue'
import ConditionerEast from './ConditionerEast.vue'
import ConditionerWest from './ConditionerWest.vue'
import { useStore } from '@/store/index'
import bus from '@/utils/bus'

const state = reactive({
    isHover: false,
    idx: '',
    modalObj: {},
})

const deviceType = computed(() => useStore().deviceType)
const region = computed(() => useStore().region)

bus.on('modal', (x) => {
    state.isHover = true
    state.modalObj = x.item
    state.idx = x.index
})
bus.on('closeModal', () => {
    state.isHover = false
})

</script>

<style lang="scss" scoped>
.device-monitor-container {
    position: relative;
    width: 1920px;
    height: 1000px;

    .swb0 {
        position: absolute;
        top: 37px;
        z-index: 2;
    }

    .swb1 {
        position: absolute;
        top: 62px;
        z-index: 2;
    }

    .dsi {
        position: absolute;
        top: 53px;
        left: 320px;
    }

    .ksm {
        position: absolute;
        top: 16px;
        right: 24px;
    }

    .ie {
        position: absolute;
        top: 314px;
        left: 24px;
        z-index: 2;
    }

    .kem {
        position: absolute;
        top: 118px;
        left: 0;
        z-index: 1;
    }

    .kem-modal0 {
        position: absolute;
        top: 158px;
        left: 400px;
        z-index: 2;
    }

    .kem-modal1 {
        position: absolute;
        top: 209px;
        left: 583px;
        z-index: 2;
    }

    .kem-modal2 {
        position: absolute;
        top: 344px;
        left: 542px;
        z-index: 2;
    }

    .kem-modal3 {
        position: absolute;
        top: 291px;
        left: 542px;
        z-index: 2;
    }

    .kem-modal4 {
        position: absolute;
        top: 349px;
        left: 668px;
        z-index: 2;
    }

    .kem-modal5 {
        position: absolute;
        top: 348px;
        left: 732px;
        z-index: 2;
    }

    .kem-modal6 {
        position: absolute;
        top: 330px;
        left: 817px;
        z-index: 2;
    }

    .kem-modal7 {
        position: absolute;
        top: 312px;
        left: 1010px;
        z-index: 2;
    }

    .kem-modal8 {
        position: absolute;
        top: 312px;
        left: 200px;
        z-index: 2;
    }

    .kem-modal9 {
        position: absolute;
        top: 312px;
        left: 277px;
        z-index: 2;
    }

    .bottom {
        position: absolute;
        bottom: 0;
    }

    .switch {
        position: absolute;
        top: 265px;
        left: 20px;
        z-index: 2;
    }

    .ktsbxx {
        position: absolute;
        top: 54px;
        left: 320px;
    }

    .zhlkt {
        position: absolute;
        right: 23px;
        bottom: 23px;
    }

    .aes {
        position: absolute;
        top: 16px;
        right: 23px;
    }

    .ydlqs {
        position: absolute;
        bottom: 23px;
        left: 23px;
    }

    .ktkql {
        position: absolute;
        bottom: 23px;
        left: 831px;
    }

    .east {
        position: absolute;
        top: 132px;
        left: 24px;
    }

    .west {
        position: absolute;
        top: 132px;
        left: 24px;
    }
}
</style>
