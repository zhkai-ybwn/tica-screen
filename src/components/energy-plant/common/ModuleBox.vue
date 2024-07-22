<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-25 10:27:37
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-10-30 09:48:37
 * @FilePath: \tica-energy-plant\src\components\energy-plant\common\ModuleBox.vue
 * @Description: 公共标题组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="module-box">
        <div
            class="module-title" 
            :style="{width: `${titleConfig.width}px`, height: `${titleConfig.height}px`}"
        >
            <div class="bg">
                <div class="text">{{ titleConfig.text }}</div>
            </div>
        </div>
        <div class="content-box" :style="{width: `${boxConfig.width}px`, height: `${boxConfig.height}px`}">
            <slot></slot>
            <div class="left-sign"></div>
            <div class="right-sign"></div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    titleConfig: {
        type: Object, 
        default: () => ({
            text: '',
            width: 0,
            height: 0,
        }),
    },
    boxConfig: {
        type: Object, 
        default: () => ({
            width: 0,
            height: 0,
        }),
    },
})
</script>

<style lang="scss" scoped>
.module-box {
    .module-title {
        background: linear-gradient(90deg, rgb(53 100 191 / 35%) .01%, rgb(27 76 171 / 20%) 105.95%);
        border: 1px solid rgb(63 163 255 / 0%);
        box-shadow: 0 0 25px 0 rgb(1 91 174 / 10%) inset;

        .bg {
            display: flex;
            align-items: center;
            width: fit-content;
            height: 38px;

            @include set-back("@/assets/imgs/energy-plant/module-title-bg.png");

            .text {
                margin-left: 24px;
                font-family: YouSheBiaoTiHei, sans-serif;
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                color: #fff;
            }
        }
    }

    .content-box {
        position: relative;
        background: rgb(255 255 255 / 4%);
        border: 1px solid rgb(255 255 255 / 8%);

        .left-sign {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 10px;
            height: 10px;

            @include set-back("@/assets/imgs/energy-plant/module-left-sign.png");
        }

        .right-sign {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 10px;
            height: 10px;

            @include set-back("@/assets/imgs/energy-plant/module-right-sign.png");
        }
    }
}

</style>
