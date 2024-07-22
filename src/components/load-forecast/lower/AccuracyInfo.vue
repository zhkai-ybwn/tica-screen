<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-16 09:40:21
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-10-25 15:51:36
 * @FilePath: \tica-energy-plant\src\components\load-forecast\lower\AccuracyInfo.vue
 * @Description: 精度信息
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="accuracy-info">
        <div class="text" :text="data.text">{{ data.text }}</div>
        <div class="value">
            {{ data.value }}<span>%</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    data: {
        type: Object,
        default: () => ({
            text: '',
            value: 0,
        }),
    },
})
</script>

<style lang="scss" scoped>
.accuracy-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 72px;
    padding: 7px 0 0 35px;

    @include set-back("../../../assets/imgs/load-forecast/average-info-bg.png");

    .text {
        min-width: 113px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: .4px;
        background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .text::before {
        position: absolute;
        z-index: -1;
        text-shadow: 0 0 4px rgb(43 102 255 / 80%);
        content: attr(text);
    }

    .value {
        margin-top: 10px;
        font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        color: #00ff9f;

        span {
            font-size: 10px;
        }
    }
}
</style>
