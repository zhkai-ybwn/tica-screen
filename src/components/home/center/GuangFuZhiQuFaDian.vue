<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-20 10:21:04
 * @LastEditors: zhkai 2572429235@qq.com
 * @LastEditTime: 2023-10-19 09:40:22
 * @FilePath: \tica-energy-plant\src\components\home\center\GuangFuZhiQuFaDian.vue
 * @Description: 光伏直驱发电
-->
<template>
    <div class="gfzqfd-container">
        <ModuleTitle
            :config="{width: 796,
                      height: 40,
                      title: state.moduleTitle,
            }"
        ></ModuleTitle>
        <div class="upper-area">
            <!-- 电量 -->
            <div class="dl-area">
                <div class="dl-icon"></div>
                <DianLiangInfo :info="state.dlInfo1"></DianLiangInfo>
                <DianLiangInfo :info="state.dlInfo2"></DianLiangInfo>
                <DianLiangInfo :info="state.dlInfo3"></DianLiangInfo>
            </div>
            <!-- 碳排放 -->
            <div class="carbon-area">
                <div class="carbon-icon"></div>
                <DianLiangInfo :info="state.carbonInfo"></DianLiangInfo>
            </div>
        </div>
        <div class="lower-area">
            <div class="gf-icon"></div>
            <GuangFuGonglv class="gfgl" :info="state.gfInfo1"></GuangFuGonglv>
            <div class="gf-box">
                <GuangFuInfo :info="state.gfInfo2"></GuangFuInfo>
                <GuangFuInfo :info="state.gfInfo3"></GuangFuInfo>
                <GuangFuInfo :info="state.gfInfo4"></GuangFuInfo>
                <GuangFuInfo :info="state.gfInfo5"></GuangFuInfo>
            </div>
        </div>
    </div>
</template>
<script setup>
import ModuleTitle from '../common/ModuleTitle.vue'
import DianLiangInfo from '../common/DianLiangInfo.vue'
import GuangFuInfo from '../common/GuangFuInfo.vue'
import GuangFuGonglv from '../common/GuangFuGonglv.vue'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'

const { looping } = useEchart()
const state = reactive({
    moduleTitle: window.ENERGY.text.guangfuzhiqufadian.moduleTitle,
    dlInfo1: {
        text: window.ENERGY.text.guangfuzhiqufadian.dl.text1,
        value: 0,
        unit: window.ENERGY.text.guangfuzhiqufadian.dl.unit1,
        isDig: true,
    }, 
    dlInfo2: {
        text: window.ENERGY.text.guangfuzhiqufadian.dl.text2,
        value: 0,
        unit: window.ENERGY.text.guangfuzhiqufadian.dl.unit2,
        isDig: false,
    }, 
    dlInfo3: {
        text: window.ENERGY.text.guangfuzhiqufadian.dl.text3,
        value: 0,
        unit: window.ENERGY.text.guangfuzhiqufadian.dl.unit3,
        isDig: false,
    },
    carbonInfo: {
        text: window.ENERGY.text.guangfuzhiqufadian.carbon.text,
        value: 0,
        unit: window.ENERGY.text.guangfuzhiqufadian.carbon.unit,
    },
    gfInfo1: {
        text: window.ENERGY.text.guangfuzhiqufadian.gf.text1,
        value: 0,
        unit: window.ENERGY.text.guangfuzhiqufadian.gf.unit1,
    },
    gfInfo2: { 
        text: window.ENERGY.text.guangfuzhiqufadian.gf.text2,
        value: 0,
        unit: window.ENERGY.text.guangfuzhiqufadian.gf.unit2,
    },
    gfInfo3: { 
        text: window.ENERGY.text.guangfuzhiqufadian.gf.text3,
        value: 0,
        unit: window.ENERGY.text.guangfuzhiqufadian.gf.unit3, 
    },
    gfInfo4: { 
        text: window.ENERGY.text.guangfuzhiqufadian.gf.text4,
        value: 0,
        unit: window.ENERGY.text.guangfuzhiqufadian.gf.unit4,
    },
    gfInfo5: { 
        text: window.ENERGY.text.guangfuzhiqufadian.gf.text5,
        value: 0,
        unit: window.ENERGY.text.guangfuzhiqufadian.gf.unit5, 
    },
})

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGY.urls.guangfuzhiqufadian)
    if (res.code === 200) { 
        state.dlInfo1.value = res.data.todayElecGen
        state.dlInfo2.value = res.data.totalElecGen
        state.dlInfo3.value = res.data.mainEngineConsumption
        state.carbonInfo.value = res.data.totalCarbonEmissionReduction
        state.gfInfo1.value = Math.abs(res.data.currentP)
        state.gfInfo2.value = res.data.backplaneTemperature
        state.gfInfo3.value = res.data.envWindSpeed
        state.gfInfo4.value = res.data.envTemperature
        state.gfInfo5.value = res.data.envHumidity
    }
}

looping(getData, window.ENERGY.looping.guangfuzhiqufadian)
</script>

<style lang="scss" scoped>
.gfzqfd-container {
    position: relative;
    width: 796px;
    height: 290px;
    background: rgb(6 12 28 / 50%);
    backdrop-filter: blur(7.5px);

    .upper-area {
        position: absolute;
        top: 77px;
        left: 36px;
        display: flex;
        justify-content: space-between;
        width: 724px;
        height: 80px;

        .dl-area {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 471px;
            height: 80px;

            .dl-icon {
                width: 80px;
                height: 80px;

                @include set-back("../../../assets/imgs/home/dianliang-icon.png");
            }
        }

        .carbon-area {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 194px;
            height: 80px;

            .carbon-icon {
                width: 80px;
                height: 80px;

                @include set-back("../../../assets/imgs/home/carbon-icon.png");
            }
        }
    }

    .lower-area {
        position: absolute;
        top: 180px;
        left: 21px;
        display: flex;
        align-items: center;
        width: 760px;
        height: 80px;

        .gf-icon {
            width: 120px;
            height: 80px;

            @include set-back("../../../assets/imgs/home/guangfu-icon.png");
        }

        .gfgl {
            position: absolute;
            left: 134px;
        }

        .gf-box {
            position: absolute;
            left: 297px;
            display: flex;
            justify-content: space-around;
            width: 460px;
        }
    }
}
</style>
