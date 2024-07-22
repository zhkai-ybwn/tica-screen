<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-07 09:54:04
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-01 10:13:02
 * @FilePath: \tica-energy-plant\src\views\LoadForecast.vue
 * @Description: 智慧-负荷预测
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="load-forecast-bg">
        <Upper></Upper>
        <div class="content-box">
            <LengFuHeYuCe class="lfhyc"></LengFuHeYuCe>
            <LiShiYuCe class="lsyc"></LiShiYuCe>
        </div>
    </div>
</template>
<script setup>
import Upper from '@/components/load-forecast/upper/Upper.vue'
import LengFuHeYuCe from '@/components/load-forecast/middle/LengFuHeYuCe.vue'
import LiShiYuCe from '@/components/load-forecast/lower/LiShiYuCe.vue'
// import ScaleBox from 'vue3-scale-box'
</script>

<style lang="scss" scoped>
.load-forecast-bg {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;

    // min-height: 1080px;

    @include set-back("../assets/imgs/load-forecast/home-bg.png");

    .content-box {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 100%;
        height: 100%;
        padding: 0 1%;

        .lfhyc {
            height: 58%;
        }

        .lsyc {
            height: 35%;
        }
    }
}
</style>
