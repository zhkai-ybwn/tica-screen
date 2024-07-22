<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-31 10:33:29
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-13 11:14:47
 * @FilePath: \tica-energy-plant\src\components\energy-plant\plant-monitor\right\XingZhengZuZhiYongDian.vue
 * @Description: 行政组织用电量当月排名top5组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="factory-ac-power">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <div class="bar-box">
                <BarChart :data="state.dataList.slice(0, 5)"></BarChart>
            </div>
        </ModuleBox>
        <div class="all-btn" @click="getAll">查看全部</div>
        <XingZhengPaiMingModal 
            v-bind="$attrs" 
            :data="state.dataList"
            class="pm-modal"
            :style="pmStyle"
        >
        </XingZhengPaiMingModal>
    </div>
    <div v-if="state.showModal" class="modal"></div>
</template>

<script setup>
import ModuleBox from '../../common/ModuleBox.vue'
import BarChart from '../../common/BarChart.vue'
import XingZhengPaiMingModal from './XingZhengPaiMingModal.vue'
import useEchart from '@/hooks/useEchart'
import axiosAPI from '@/axios/index'
import bus from '@/utils/bus'
import { ref } from 'vue'

const { looping } = useEchart()

const right = ref(-450)

const state = reactive({
    titleConfig: {
        text: window.ENERGYMONITOR.text.guangfuyongdian.title,
        width: 460,
        height: 40,
    },
    boxConfig: {
        width: 460,
        height: 261,
    },
    dataList: [],
    showModal: false,
})

const pmStyle = computed(() => ({
    right: right.value + 'px',
}))

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGYMONITOR.urls.xingzhengzuzhiyongdian)
    if (res.code === 200) {
        state.dataList = res.data
    }
}

const getAll = () => {
    state.showModal = true
    right.value = 0
}

bus.on('close-pm-modal', () => {
    right.value = -450
    state.showModal = false
})

looping(getData, window.ENERGYMONITOR.looping.xingzhengzuzhiyongdian)
</script>

<style lang="scss" scoped>
.factory-ac-power {
    position: relative;

    .bar-box {
        padding: 20px 24px 18px 28px;
    }

    .all-btn {
        position: absolute;
        top: 0;
        right: 16px;
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 40px;
        color: rgb(255 255 255 / 65%);
        text-align: center;
        cursor: pointer;
    }

    .pm-modal {
        position: absolute;
        top: 0;
        z-index: 3;
        transition: .5s;
    }
}

.modal {
    position: relative;
    top: -325px;
    left: -1436px;
    z-index: 2;
    width: 1920px;
    height: 1000px;
    background: rgb(20 36 74 / 37%);
}
</style>
