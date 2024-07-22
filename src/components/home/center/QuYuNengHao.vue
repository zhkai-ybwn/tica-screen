<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-21 12:55:44
 * @LastEditors: zhkai 2572429235@qq.com
 * @LastEditTime: 2023-10-19 09:19:41
 * @FilePath: \tica-energy-plant\src\components\home\center\QuYuNengHao.vue
 * @Description: 区域能耗
-->
<template>
    <div class="qynh-container">
        <div class="btn-box posi">
            <div class="text-box">
                <div class="btn-text" :text="state.btnText">{{ state.btnText }}</div>
            </div>
            <div class="date-box">
                <div 
                    v-for="(item, index) in state.dateText"
                    :key="index"
                    :class="['date-item', state.currentDate=== item.key ? 'white' : 'gray']"
                    :text="item.text"
                    @click="getInfoByDate(item.key)"
                >
                    {{ item.text }}
                </div>
            </div>
        </div>
        <QuYuNengHaoSingle class="test posi " :info="state.testCenterEC"></QuYuNengHaoSingle>
        <QuYuNengHaoSingle class="manu posi " :info="state.manufacturePlantEC"></QuYuNengHaoSingle>
        <QuYuNengHaoSingle class="smt posi " :info="state.smtProductionEC"></QuYuNengHaoSingle>
        <QuYuNengHaoSingle class="comp posi " :info="state.compBuildingEC"></QuYuNengHaoSingle>
        <QuYuNengHaoSingle class="display-area posi " :info="state.displayAreaEC"></QuYuNengHaoSingle>
        <QuYuNengHaoSingle class="canteen posi " :info="state.canteenEC"></QuYuNengHaoSingle>
    </div>
</template>

<script setup>
import QuYuNengHaoSingle from '../common/QuYuNengHaoSingle.vue'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'
import { onBeforeUnmount } from 'vue'

const { looping } = useEchart()

const state = reactive({
    testCenterEC: {
        text: window.ENERGY.text.quyunenghao.text1,
        color: 'linear-gradient(180deg, #1890FF 0%, rgba(24, 144, 255, 0.20) 100%)',
        value: 0,
        unit: 'kWh',
    },
    smtProductionEC: {
        text: window.ENERGY.text.quyunenghao.text2,
        color: 'linear-gradient(180deg, #1890FF 0%, rgba(24, 144, 255, 0.20) 100%)',
        value: 0,
        unit: 'kWh',
    },
    manufacturePlantEC: {
        text: window.ENERGY.text.quyunenghao.text3,
        color: 'linear-gradient(180deg, #1890FF 0%, rgba(24, 144, 255, 0.20) 100%)',
        value: 0,
        unit: 'kWh',
    },
    compBuildingEC: {
        text: window.ENERGY.text.quyunenghao.text4,
        color: 'linear-gradient(180deg, #FF852E 0%, rgba(255, 133, 46, 0.20) 100%)',
        value: 0,
        unit: 'kWh',
    },
    displayAreaEC: {
        text: window.ENERGY.text.quyunenghao.text5,
        color: 'linear-gradient(180deg, #FF852E 0%, rgba(255, 133, 46, 0.20) 100%)',
        value: 0,
        unit: 'kWh',
    },
    canteenEC: {
        text: window.ENERGY.text.quyunenghao.text6,
        color: 'linear-gradient(180deg, #FF852E 0%, rgba(255, 133, 46, 0.20) 100%)',
        value: 0,
        unit: 'kWh',
    },
    btnText: window.ENERGY.text.quyunenghao.btnText,
    dateText: [{ key: 'day', text: '日' }, { key: 'month', text: '月' }, { key: 'year', text: '年' }],
    currentDate: 'day',
    dateButtonIntervalId: null,
})

const getInfoByDate = (key) => {
    state.currentDate = key
    getData()
}

const dateSwitch = () => {
    state.dateButtonIntervalId = setInterval(() => {
        if (state.currentDate === 'day') {
            getInfoByDate('month')
        } else if (state.currentDate === 'month') {
            getInfoByDate('year')
        } else {
            getInfoByDate('day')
        }
    }, window.ENERGY.looping.nianyueri)
}

onMounted(() => {
    // 在组件挂载后启动日期按钮自动轮询
    dateSwitch()
})

onBeforeUnmount(() => {
    clearInterval(state.dateButtonIntervalId)
})

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGY.urls.quyunenghao, { dimension: state.currentDate })
    if (res.code === 200) {
        const datas = res.data
        state.manufacturePlantEC.value = datas.manufacturePlantEC
        state.testCenterEC.value = datas.testCenterEC
        state.smtProductionEC.value = datas.smtProductionEC
        state.canteenEC.value = datas.canteenEC
        state.compBuildingEC.value = datas.compBuildingEC
        state.displayAreaEC.value = datas.displayAreaEC
    }
}

looping(getData, window.ENERGY.looping.quyunenghao)

</script>

<style lang="scss" scoped>
.qynh-container {
    position: relative;
    width: 796px;
    height: 600px;

    .btn-box {
        display: flex;
        justify-content: space-between;
        width: 280px;
        height: 37px;

        .text-box {
            @include set-back("../../../assets/imgs/home/quyunenghao-btn.png");

            display: flex;
            align-items: center;
            justify-content: center;
            width: 146px;
            height: 37px;

            .btn-text {
                font-family: YouSheBiaoTiHei, sans-serif;
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .btn-text::before {
                position: absolute;
                z-index: -1;
                text-shadow: 0 0 4px rgb(43 102 255 / 80%);
                content: attr(text);
            }
        }

        .date-box {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 104px;
            height: 37px;
            font-family: YouSheBiaoTiHei, sans-serif;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px; /* 137.5% */

            .date-item {
                cursor: pointer;
            }

            .date-item::before {
                position: absolute;
                z-index: -1;
                text-shadow: 0 0 4px rgb(43 102 255 / 80%);
                content: attr(text);
            }

            .white {
                background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .gray {
                background: linear-gradient(180deg, rgb(255 255 255 / 40%) 27.19%, rgb(176 208 255 / 40%) 75.44%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }

    .posi {
        position: absolute;
    }

    .test {
        top: 120px;
        left: 160px;
    }

    .manu {
        top: 140px;
        left: 520px;
    }

    .smt {
        top: 230px;
        left: 240px;
    }

    .comp {
        top: 325px;
        left: 60px;
    }

    .display-area {
        top: 380px;
        left: 280px;
    }

    .canteen {
        top: 380px;
        left: 410px;
    }
}
</style>
