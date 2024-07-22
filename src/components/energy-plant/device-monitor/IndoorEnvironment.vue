<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-07 09:10:11
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-24 14:24:40
 * @FilePath: \tica-energy-plant\src\components\energy-plant\device-monitor\IndoorEnvironment.vue
 * @Description: 室内环境参数
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="indoor-environment-container">
        <div class="title">室内环境参数</div>
        <div class="co-box">
            <div class="co-icon"></div>
            <div class="co-label">CO浓度：</div>
            <div class="co-value">
                {{ state.coDepth || '-' }}
                <span v-if="state.coDepth">ppm</span>
            </div>
        </div>
        <div class="so2-box">
            <div class="so2-icon"></div>
            <div class="so2-label">SO₂浓度：</div>
            <div class="so2-value">
                {{ state.so2Depth || '-' }}
                <span v-if="state.so2Depth">ppm</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'

const { looping } = useEchart()

const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            title: '立式加工中心850',
            nodeId: 0,
        }),
    },
})

const state = reactive({
    coDepth: 0,
    so2Depth: 0,
})

const getData = async () => {
    const formData = new FormData()
    formData.append('nodeId', props.data.nodeId ? props.data.nodeId : 1708)
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.lkeyEquInfo, formData)
    if (res.code === 200) {
        state.coDepth = res.data.coDepth
        state.so2Depth = res.data.so2Depth
    }
}

looping(getData, window.ENERGYMONITOR.looping.lkeyEquInfo)

</script>

<style lang="scss" scoped>
.indoor-environment-container {
    position: relative;
    width: 212px;
    height: 174px;

    @include set-back("@/assets/imgs/energy-plant/indoor_envir_bg.png");

    .title {
        position: absolute;
        top: 27px;
        left: 21px;
        width: 170px;
        height: 21px;
        padding-left: 31px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        color: #fff;

        @include set-back("@/assets/imgs/energy-plant/indoor_envir_title_bg.png");
    }

    .co-box {
        position: absolute;
        top: 64px;
        left: 22px;
        display: flex;
        align-items: center;

        .co-icon {
            width: 24px;
            height: 24px;

            @include set-back("@/assets/imgs/energy-plant/co_icon.png");
        }

        .co-label {
            margin-left: 8px;
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 350;
            line-height: normal;
            color: rgb(255 255 255 / 65%);
            text-align: right;
        }

        .co-value {
            font-family: Barlow-Italic, sans-serif;
            font-size: 20px;
            font-style: italic;
            font-weight: 600;
            line-height: normal;
            color: #fff;

            span {
                font-family: SourceHanSansCN-Normal, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 350;
                line-height: normal;
                color: rgb(255 255 255 / 65%);
                text-align: right;
            }
        }
    }

    .so2-box {
        position: absolute;
        top: 108px;
        left: 22px;
        display: flex;
        align-items: center;

        .so2-icon {
            width: 24px;
            height: 24px;

            @include set-back("@/assets/imgs/energy-plant/so2_icon.png");
        }

        .so2-label {
            margin-left: 8px;
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 350;
            line-height: normal;
            color: rgb(255 255 255 / 65%);
            text-align: right;
        }

        .so2-value {
            font-family: Barlow-Italic, sans-serif;
            font-size: 20px;
            font-style: italic;
            font-weight: 600;
            line-height: normal;
            color: #fff;

            span {
                font-family: SourceHanSansCN-Normal, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 350;
                line-height: normal;
                color: rgb(255 255 255 / 65%);
                text-align: right;
            }
        }
    }
}
</style>
