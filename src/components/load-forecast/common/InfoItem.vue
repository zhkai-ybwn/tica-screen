<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-11 09:34:11
 * @LastEditors: zhkai 2572429235@qq.com
 * @LastEditTime: 2023-10-16 15:42:43
 * @FilePath: \tica-energy-plant\src\components\load-forecast\common\InfoItem.vue
 * @Description: 冷负荷预测-单个信息列表
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="info-item">
        <div class="content">
            <div class="text com" :text="data.text">{{ data.text }}</div>
            <div class="value-unit">
                <div class="value com" :text="data.value">{{ data.value }}</div>
                <div class="unit com" :text="data.unit">{{ data.unit }}</div>
            </div>
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
            unit: '',
        }),
    },
})
</script>

<style lang="scss" scoped>
.info-item {
    position: relative;
    display: flex;
    align-items: center;
    width: 364px;
    height: 68px;

    @include set-back("../../../assets/imgs/load-forecast/current-load-bg.png");

    .content {
        position: absolute;
        left: 117px;
        display: flex;

        .com {
            font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .text {
            width: fit-content;
            font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
            font-size: 20px;
            text-align: left;
            letter-spacing: .8px;
        }

        .text::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: attr(text);
        }

        .value-unit {
            position: absolute;
            left: 120px;
            display: flex;

            .value {
                font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
                font-size: 24px;
            }

            .value::before {
                position: absolute;
                z-index: -1;
                text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
                content: attr(text);
            }

            .unit {
                margin-top: 3px;
                margin-left: 8px;
                font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
                font-size: 14px;
            }

            .unit::before {
                position: absolute;
                z-index: -1;
                text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
                content: attr(text);
            }
        }
    }
}
</style>
