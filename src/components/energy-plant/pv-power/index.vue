<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-07 15:02:05
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-13 15:40:21
 * @FilePath: \tica-energy-plant\src\components\energy-plant\pv-power\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="pv-power-container">
        <PvInformation></PvInformation>
        <SheBeiZhuangTai class="equipment-status"></SheBeiZhuangTai>
        <NengHaoTongJi class="consumption-statistics"></NengHaoTongJi>
        <SheBeiYongDianTongJi class="sbydltj"></SheBeiYongDianTongJi>
        <GuangFuFaDianNengHaoFenXi class="gffdnhfx"></GuangFuFaDianNengHaoFenXi>
        <ShiWaiHuanJingCanShu class="swhjcs"></ShiWaiHuanJingCanShu>
        <PvModel class="pvm"></PvModel>
    </div>
</template>

<script setup>
import PvInformation from './PvInformation.vue'
import SheBeiZhuangTai from './SheBeiZhuangTai.vue'
import NengHaoTongJi from './NengHaoTongJi.vue'
import SheBeiYongDianTongJi from './SheBeiYongDianTongJi.vue'
import GuangFuFaDianNengHaoFenXi from './GuangFuFaDianNengHaoFenXi.vue'
import ShiWaiHuanJingCanShu from './ShiWaiHuanJingCanShu.vue'
import PvModel from './PvModel.vue'

</script>

<style lang="scss" scoped>
.pv-power-container {
    position: relative;
    width: 1920px;
    height: 1000px;

    .equipment-status {
        position: absolute;
        top: 16px;
        right: 24px;
    }

    .consumption-statistics {
        position: absolute;
        top: 209px;
        right: 24px;
    }

    .sbydltj {
        position: absolute;
        bottom: 24px;
        left: 24px;
    }

    .gffdnhfx {
        position: absolute;
        bottom: 24px;
        left: 590px;
    }

    .swhjcs {
        position: absolute;
        right: 24px;
        bottom: 24px;
    }

    .pvm {
        position: absolute;
        top: 160px;
        left: 24px;
    }
}
</style>
