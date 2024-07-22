<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-25 11:20:06
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-28 13:32:19
 * @FilePath: \tica-energy-plant\src\components\energy-plant\plant-monitor\left\LeftBox.vue
 * @Description: 全厂能源监控左边box组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="left-box-container">
        <!-- 全厂总用电量概况 -->
        <QuanChangZongYongDianLiang></QuanChangZongYongDianLiang>
        <!-- 用电量趋势分析 -->
        <YongDianLiangQuShi class="ydlqs"></YongDianLiangQuShi>
        <!-- 区域用电占比统计 -->
        <QuYuYongDianZhanBi class="qyydzb"></QuYuYongDianZhanBi>
        <!-- 全厂空调用电量统计 -->
        <GuangFuYongDianTongJi class="qcktydtj"></GuangFuYongDianTongJi>
        <!-- 全厂空调用电量趋势分析 -->
        <QuanChangKongTiaoYongDianQuShi class="qcktydqs">
        </QuanChangKongTiaoYongDianQuShi>
    </div>
</template>

<script setup>
import QuanChangZongYongDianLiang from './QuanChangZongYongDianLiang.vue'
import YongDianLiangQuShi from './YongDianLiangQuShi.vue'
import QuYuYongDianZhanBi from './QuYuYongDianZhanBi.vue'
import GuangFuYongDianTongJi from '@/components/energy-plant/plant-monitor/left/GuangFuYongDianTongJi.vue'
import QuanChangKongTiaoYongDianQuShi from 
    '@/components/energy-plant/plant-monitor/left/QuanChangKongTiaoYongDianQuShi.vue'
</script>

<style lang="scss" scoped>
.left-box-container {
    position: relative;
    width: 1388px;
    height: 950px;
    margin: 16px 0 24px 24px;

    .ydlqs {
        position: absolute;
        top: 195px;
        left: 0;
    }

    .qyydzb {
        position: absolute;
        top: 195px;
        right: 0;
    }

    .qcktydtj {
        position: absolute;
        top: 693px;
        left: 0;
    }

    .qcktydqs {
        position: absolute;
        top: 693px;
        right: 0;
    }
}
</style>
