<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-19 16:35:16
 * @LastEditors: zhangkai 2572429235@qq.com
 * @LastEditTime: 2023-09-22 14:55:29
 * @FilePath: \tica-energy-plant\src\components\home\common\ModuleTitle.vue
 * @Description: 模块标题
-->
<template>
    <div
        class="m-title-container"
        :style="{width: `${config.width}px`, 
                 height: `${config.height}px`,}"
    >
        <div class="left-icon"></div>
        <div class="title-text">{{ config.title }}</div>
        <div class="sub-title-text">{{ config.subTitle }}</div>
        <div class="right-icon"></div>
        <div class="bottom-line" :style="{width: `${config.width}px`}"></div>
    </div>
</template>

<script setup>
defineProps({
    config: {
        type: Object,
        default: () => ({
            width: 480,
            height: 40,
            title: '全厂能耗监控',
            subTitle: '今日内',
        }),
    },
})
</script>

<style lang="scss" scoped>
.m-title-container {
    position: relative;
    background: linear-gradient(270deg, rgb(19 54 105 / 60%) .06%, rgb(83 119 245 / 50%) 99.96%);

    .left-icon {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 24px;
        height: 24px;

        @include set-back("../../../assets/imgs/home/title-left-icon.png");
    }

    .title-text {
        position: absolute;
        top: 8px;
        left: 44px;
        font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
        letter-spacing: .4px;
        background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .sub-title-text {
        position: absolute;
        top: 8px;
        right: 22px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        color: #97a3b7;
    }

    .right-icon {
        position: absolute;
        top: 30px;
        right: 0;
        width: 21px;
        height: 12px;

        @include set-back("../../../assets/imgs/home/title-right-icon.png");
    }

    .bottom-line {
        position: absolute;
        top: 39px;
        height: 1px;
        background: linear-gradient(90deg, rgb(71 145 255 / 0%) 0%, #65a3ff 47.4%, rgb(78 149 255 / 0%) 100%);
        filter: blur(1px);
    }
}
</style>
