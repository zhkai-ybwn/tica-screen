import QuanChangNengHao from '@/components/home/left/QuanChangNengHao.vue';
<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-18 17:00:24
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-10 09:09:24
 * @FilePath: \tica-energy-plant\src\components\home\left\QuanChangNengHao.vue
 * @Description: 全厂能耗
-->
<template>
    <div class="enery-container">
        <QuanChangNengHaoSingle
            v-for="(item, index) in state.dataList"
            :key="index"
            :data="item"
        ></QuanChangNengHaoSingle>
    </div>
</template>

<script setup>
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'
import QuanChangNengHaoSingle from './QuanChangNengHaoSingle.vue'

const { looping } = useEchart()

const state = reactive({
    dataList: [
    ],
})

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGY.urls.quanchangnenghao)
    if (res.code === 200) { 
        state.dataList = []
        state.dataList.push({ 
            // 文本
            text: window.ENERGY.text.quanchangnenghao.day.text,
            // 增减百分比
            percent: res.data.todayHoleFactECDOD,
            // 能耗
            value: res.data.todayHoleFactEC,
            // 能耗单位
            unit: window.ENERGY.text.quanchangnenghao.day.unit })
        state.dataList.push({
            // 文本
            text: window.ENERGY.text.quanchangnenghao.month.text,
            // 增减百分比
            percent: res.data.curMonHoleFactECDOD,
            // 能耗
            value: res.data.curMonHoleFactEC,
            // 能耗单位
            unit: window.ENERGY.text.quanchangnenghao.month.unit,
        })
        state.dataList.push({
            // 文本
            text: window.ENERGY.text.quanchangnenghao.year.text,
            // 增减百分比
            percent: res.data.yearHoleFactECDOD,
            // 能耗
            value: res.data.yearHoleFactEC,
            // 能耗单位
            unit: window.ENERGY.text.quanchangnenghao.year.unit,
        })
    }
}

looping(getData, window.ENERGY.looping.quanchangnenghao)

</script>

<style lang="scss" scoped>
.enery-container {
    display: flex;
    justify-content: space-between;
    width: 480px;
    height: 120px;
    padding: 17px 26px;
    background: linear-gradient(270deg, rgb(19 54 105 / 60%) .06%, rgb(83 119 245 / 50%) 99.96%);
    border-radius: 2px;
    backdrop-filter: blur(5px);
}
</style>
