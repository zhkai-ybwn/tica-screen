<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-01 15:17:28
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-27 13:13:38
 * @FilePath: \tica-energy-plant\src\components\manage\header\Header.vue
 * @Description: 报警管理导航头组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="header-container">
        <div class="left-box">
            <div class="title">智能运维</div>
        </div>
        <div class="right-box">
            <div class="info">
                <div class="text">安全运行天数</div>
                <div class="day">13天</div>
            </div>
            <div class="divider" style="margin-left: 24px;"></div>
            <DateTime style="margin-left: 24px;"></DateTime>
            <div class="divider" style="margin-left: 24px;"></div>
            <WeatherInfo style="margin-left: 24px;"></WeatherInfo>
        </div>
    </div>
</template>

<script setup>
import WeatherInfo from '../common/WeatherInfo.vue'
import DateTime from '../common/DateTime.vue'
</script>

<style lang="scss" scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding-right: 30px;

    @include set-back("../../../assets/imgs/manage/header-bg.png");

    .left-box {
        margin: 0 0 0 10%;

        .title {
            font-family: YouSheBiaoTiHei, sans-serif;
            font-size: 40px;
            font-style: normal;
            font-weight: 400;
            letter-spacing: 2.4px;
            background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    .right-box {
        display: flex;
        align-items: center;

        .divider {
            width: 0;
            height: 12px;
            border: 1px solid rgb(255 255 255 / 60%);
            border-radius: 0;
        }

        .info {
            display: flex;

            .text {
                font-family: SourceHanSansCN-Regular, sans-serif;
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                color: rgb(255 255 255 / 60%);
            }

            .day {
                margin-left: 16px;
                font-family: SourceHanSansCN-Regular, sans-serif;
                font-size: 20px;
                font-style: normal;
                font-weight: 500;
                color: rgb(255 255 255 / 90%);
                text-align: right;
            }
        }
    }
}

</style>
