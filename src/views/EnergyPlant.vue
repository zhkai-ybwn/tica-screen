<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-23 09:34:52
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-11 15:32:59
 * @FilePath: \tica-energy-plant\src\views\EnergyPlant.vue
 * @Description: 全厂能源监控
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <ScaleBox
        :width="1920"
        :height="1080"
        bgc="transparent"
        :delay="100"
        :is-flat="true"
    >
        <div
            :class="[moduleNavIndex === 0 ? 
                'plant-bg' : 'device-pv-bg', 'energy-plant-container']"
        >
            <!-- 标题栏 -->
            <Header></Header>
            <div v-if="moduleNavIndex === 0">
                <LeftBox></LeftBox>
                <RightBox class="rb"></RightBox>
            </div>
            <div v-if="moduleNavIndex === 1">
                <div class="key-device">
                    <!-- <BottomBox></BottomBox> -->
                    <!-- <DongXiLianDong></DongXiLianDong> -->
                    <!-- <KongTiaoSheBeiXinXi></KongTiaoSheBeiXinXi> -->
                    <!-- <ZongHeLouKongTiaoYongDianLiang></ZongHeLouKongTiaoYongDianLiang> -->
                </div>
                <DeviceMonitor></DeviceMonitor>
            </div>
            <div v-if="moduleNavIndex === 2">
                <PvPower></PvPower>
            </div>
        </div>
    </ScaleBox>
</template>

<script setup>
import ScaleBox from 'vue3-scale-box'
import Header from '@/components/energy-plant/header/Header.vue'
import LeftBox from '@/components/energy-plant/plant-monitor/left/LeftBox.vue'
import RightBox from '@/components/energy-plant/plant-monitor/right/RightBox.vue'
import DeviceMonitor from '@/components/energy-plant/device-monitor/index.vue'
import PvPower from '@/components/energy-plant/pv-power/index.vue'
import { useStore } from '@/store/index'

const moduleNavIndex = computed(() => useStore().moduleNav)
</script>

<style lang="scss" scoped>
.energy-plant-container {
    position: relative;
    width: 1920px;
    height: 1080px;

    .rb {
        position: absolute;
        top: 104px;
        right: 24px;
    }
}

.plant-bg {
    @include set-back("../assets/imgs/energy-plant/energy-monitor-bg.png");
}

.device-pv-bg {
    @include set-back("../assets/imgs/energy-plant/pv-device-bg.png");
}

</style>
