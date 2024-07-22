<template>
    <div class="guanjian">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <div class="progress-list">
                <div v-for="(item,index) in state.dataList" :key="index" class="progress-item">
                    <div class="info">
                        <div :class="['pro-index', `pro-index${index}`]">{{ index + 1 }}</div>
                        <div class="pro-name">{{ item[0] }}</div>
                        <div class="pro-value">{{ item [1] || '-' }}<span v-if="item[1]"> kWh</span></div>
                    </div>
                    <ProgressCom 
                        :percent="(item[1] / state.maxValue) * 100"
                        :colors="index > 2 ? state.colorsNormal : state.colorsTop"
                        :config="{width:512, height:3}"
                    ></ProgressCom>
                </div>
            </div>
        </ModuleBox>
        <ButtonGroup :label-data="state.btnList" :btn-module-key="state.btnModuleKey" class="btn-group"></ButtonGroup>
    </div>
</template>

<script setup>
import ModuleBox from '../../common/ModuleBox.vue'
import ButtonGroup from '../../common/ButtonGroup.vue'
import ProgressCom from '../../common/Progress.vue'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'
import { useStore } from '@/store/index'

const state = reactive({
    titleConfig: {
        text: '关键设备用电量排名Top5',
        width: 576,
        height: 40,
    },
    boxConfig: {
        width: 576,
        height: 228,
    },
    btnList: [{
        key: 'day', label: '今日',
    },
    {
        key: 'month', label: '本月',
    },
    {
        key: 'year', label: '全年',
    }],
    btnModuleKey: 3,
    dataList: [],
    colorsTop: ['rgba(143, 235, 255, 1)', 'rgba(44, 119, 233, 1)'],
    colorsNormal: ['rgba(75, 89, 124, 1)', 'rgba(161, 182, 208, 1)'],
    maxValue: 0,
})

const { looping } = useEchart()
const keyDevice = computed(() => useStore().keyDevice)

watch(keyDevice, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        getData() 
    }
})

const getData = async () => {
    state.dataList = []
    const formData = new FormData()
    formData.append('dimension', keyDevice.value)
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.keyEquECTop5, formData)
    if (res.code === 200) {
        state.dataList = Object.entries(res.data)
        state.dataList.sort((a, b) => b[1] - a[1])
        // 找到最大值
        state.maxValue = state.dataList.length > 0 ? state.dataList[0][1] : 1
    }
}
looping(getData, window.ENERGYMONITOR.looping.keyEquECTop5)
</script>
<style lang="scss" scoped>
.guanjian {
    position: relative;
    width: 576px;
    margin-right: 24px;

    .progress-list {
        position: absolute;
        left: 32px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 512px;
        height: 215px;

        .progress-item {
            .info {
                display: flex;
                align-items: center;
                margin-bottom: 5px;

                .pro-index {
                    width: 16px;
                    font-family: Barlow-Italic, sans-serif;
                    font-size: 16px;
                    font-style: italic;
                    font-weight: 700;
                    line-height: normal;
                    color: #fff;
                    text-align: center;
                    letter-spacing: .8px;
                }

                .pro-index0 {
                    width: 16px;
                    height: 16px;

                    @include set-back("@/assets/imgs/energy-plant/pm1-bg.png");
                }

                .pro-index1 {
                    width: 16px;
                    height: 16px;

                    @include set-back("@/assets/imgs/energy-plant/pm2-bg.png");
                }

                .pro-index2 {
                    width: 16px;
                    height: 16px;

                    @include set-back("@/assets/imgs/energy-plant/pm3-bg.png");
                }

                .pro-name {
                    width: 300px;
                    margin-left: 8px;
                    font-family: HarmonyOS-Regular, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    color: #fff;
                }

                .pro-value {
                    width: 212px;
                    font-family: Barlow-Italic, sans-serif;
                    font-size: 20px;
                    font-style: italic;
                    font-weight: 500;
                    line-height: normal;
                    color: #fff;
                    text-align: right;

                    span {
                        font-family: HarmonyOS-Regular, sans-serif;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 350;
                        line-height: normal;
                        color: rgb(255 255 255 / 65%);
                    }
                }
            }
        }
    }

    .btn-group {
        position: absolute;
        top: 6px;
        right: 16px;
    }
}
</style>
