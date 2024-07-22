<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-20 15:53:41
 * @LastEditors: zhangkai 2572429235@qq.com
 * @LastEditTime: 2023-09-22 15:09:35
 * @FilePath: \tica-energy-plant\src\components\home\right\GuanJianSheBeiKaiDongLv.vue
 * @Description: 关键设备开动率
-->
<template>
    <div class="gjsbkdl-container">
        <ModuleTitle
            :config="{width: 480,
                      height: 40,
                      title: state.moduleTitle,
                      subTitle: '今日内',
            }"
        ></ModuleTitle>
        <div class="kdl-box">
            <KaiDongLvSingle v-for="(item, index) in state.deviceList" :key="index" :info="item"></KaiDongLvSingle>
        </div>
    </div>
</template>

<script setup>
import ModuleTitle from '../common/ModuleTitle.vue'
import KaiDongLvSingle from '../common/KaiDongLvSingle.vue'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'

const { looping } = useEchart()

const state = reactive({
    moduleTitle: window.ENERGY.text.guanjianshebeikaidonglv.moduleTitle,
    deviceList: [],
})
const getData = async () => {
    const res = await axiosAPI.get(window.ENERGY.urls.guanjianshebeikaidonglv)
    if (res.code === 200) {
        const datas = res.data
        state.deviceList = datas.actuationDetailVoList
    }
}
looping(getData, window.ENERGY.looping.guanjianshebeikaidonglv)
</script>

<style lang="scss" scoped>
.gjsbkdl-container {
    position: relative;
    width: 480px;
    height: 578px;
    background: rgb(6 12 28 / 50%);
    backdrop-filter: blur(7.5px);

    .kdl-box {
        position: absolute;
        top: 71px;
        left: 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 400px;
        height: 474px;
    }
}
</style>
