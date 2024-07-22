<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-31 10:32:14
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-28 13:31:21
 * @FilePath: \tica-energy-plant\src\components\energy-plant\plant-monitor\right\RightBox.vue
 * @Description: 全厂能源监控右边box组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="right-box-container">
        <XingZhengZuZhiYongDian class="xzzz"></XingZhengZuZhiYongDian>
        <GuanJianSheBeiYongDian class="gjsbyd"></GuanJianSheBeiYongDian>
    </div>
</template>

<script setup>
import XingZhengZuZhiYongDian from './XingZhengZuZhiYongDian.vue'
import GuanJianSheBeiYongDian from './GuanJianSheBeiYongDian.vue'
</script>

<style lang="scss" scoped>
.right-box-container {
    position: relative;
    width: 460px;
    height: 950px;
    margin: 0 0 24px 24px;

    .xzzz {
        position: absolute;
        top: 0;
        left: 0;
    }

    .gjsbyd {
        position: absolute;
        top: 333px;
        left: 0;
    }
}

</style>
