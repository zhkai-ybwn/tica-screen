<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-25 09:16:03
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-25 15:45:09
 * @FilePath: \tica-energy-plant\src\components\energy-plant\plant-monitor\left\QuanChangZongYongDianLiang.vue
 * @Description: 全厂总用电量概况组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="power-overview-container">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <div class="content-box">
                <QuanChangZongYongDianLiangSingle
                    v-for="(item, index) in state.dataList" 
                    :key="index"
                    :data="item"
                    :config="state.config[index]"
                ></QuanChangZongYongDianLiangSingle>
            </div>
        </ModuleBox>
    </div>
</template>

<script setup>
import ModuleBox from '../../common/ModuleBox.vue'
import QuanChangZongYongDianLiangSingle from './QuanChangZongYongDianLiangSingle.vue'
import useEchart from '@/hooks/useEchart'
import axiosAPI from '@/axios/index'

const { looping } = useEchart()

const state = reactive({
    titleConfig: {
        text: window.ENERGYMONITOR.text.quanchangzongyongdianliang.title,
        width: 1388,
        height: 38,
    },
    boxConfig: {
        width: 1388,
        height: 131,
    },
    dataList: [],
    config: window.ENERGYMONITOR.text.quanchangzongyongdianliang.labelUnit,
})

const getData = async () => {
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.quanchangzongyongdianliang)
    if (res.code === 200) {
        const datas = res.data
        state.dataList = []
        state.dataList.push({ 
            value: datas.todayHoleFactEC,
            mom: datas.todayHoleFactECQOQ,
            showMom: true,
            showYoy: true,
            yoy: datas.todayHoleFactECYOY, 
        })
        state.dataList.push({ 
            value: datas.curMonHoleFactEC,
            mom: datas.curMonHoleFactECQOQ,
            showMom: true,
            showYoy: true,
            yoy: datas.curMonHoleFactECYOY, 
        })
        state.dataList.push({ 
            value: datas.curYearHoleFactEC,
            mom: datas.curYearHoleFactECYOY,
            showYoy: false,
            showMom: true,
        })
        state.dataList.push({ 
            value: datas.totalCarbonEmissionReduction,
            showMom: true,
            showYoy: false,
            mom: datas.photovoltaicPowerGenYOY, 
        })
        state.dataList.push({ 
            value: datas.costSavings,
            showMom: true,
            showYoy: false,
            mom: datas.photovoltaicPowerGenYOY, 
        })
    }
}

looping(getData, window.ENERGYMONITOR.looping.quanchangzongyongdianliang)

</script>

<style lang="scss" scoped>
.power-overview-container {
    width: 1500px;
    height: 169px;

    .content-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 1290px;
        height: 131px;
        margin-left: 20px;
    }
}

</style>
