<!-- 光伏发电系统能耗统计 -->
<template>
    <div class="consumption-statistics">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <div
                v-for="(item,index) in state.dataList"
                :key="index"
                :class="`pv${index+1}`"
            >
                <div class="image">
                    <div class="img"></div>
                    <div class="text">{{ state.title[index] }}</div>
                </div>
                <div class="day">
                    <div class="num">{{ item[0] || '-' }}</div>
                    <div class="text">{{ state.labelList[index][0] }}</div>
                </div>
                <div class="month">
                    <div class="num">{{ item[1] || '-' }}</div>
                    <div class="text">{{ state.labelList[index][1] }}</div>
                </div>
                <div class="year">
                    <div class="num">{{ item[2] || '-' }}</div>
                    <div class="text">{{ state.labelList[index][2] }}</div>
                </div>
            </div>
        </ModuleBox>
    </div>
</template>

<script setup>
import ModuleBox from '../common/ModuleBox.vue'
import useEchart from '@/hooks/useEchart'
import axiosAPI from '@/axios/index'

const { looping } = useEchart()

const state = reactive({
    titleConfig: {
        text: '光伏发电系统能耗统计',
        width: 460,
        height: 40,
    },
    boxConfig: {
        width: 460,
        height: 427,
    },
    title: ['主机耗电量', '并网发电量', '光伏发电量'],
    dataList: [],
    labelList: [
        ['当日耗电(kWh)', '当月耗电(kWh)', '全年耗电(kWh)'],
        ['当日发电(kWh)', '当月发电(kWh)', '全年发电(kWh)'],
        ['当日发电(kWh)', '当月发电(kWh)', '全年发电(kWh)'],
    ],
})

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGYMONITOR.urls.eCStatistics)
    if (res.code === 200) {
        state.dataList = []
        state.dataList.push([res.data.todayMainEngryEC, res.data.curMonMainEngryEC, res.data.curYearMainEngryEC])
        state.dataList.push([res.data.todayOnGridElecGen, res.data.curMonOnGridElecGen, res.data.curYearOnGridElecGen])
        state.dataList.push([res.data.todayPhotovoltaicGenEc,
            res.data.curMonPhotovoltaicGenEc,
            res.data.curYearPhotovoltaicGenEc])
    }
}

looping(getData, window.ENERGYMONITOR.looping.eCStatistics)
</script>

<style lang="scss" scoped>
.consumption-statistics {
    width: 460px;

    .pv1 {
        margin-top: 31px;

        .img {
            @include set-back("@/assets/imgs/energy-plant/pv1@2x.png");
        }
    }

    .pv2 {
        .img {
            @include set-back("@/assets/imgs/energy-plant/pv2@2x.png");
        }
    }

    .pv3 {
        .img {
            @include set-back("@/assets/imgs/energy-plant/pv3@2x.png");
        }
    }

    .text {
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        color: #fff;
    }

    .num {
        margin-bottom: 3px;
        font-family: Barlow, sans-serif;
        font-size: 24px;
        font-weight: normal;
        line-height: 28px;
        background: linear-gradient(180deg, #43b0ff 0%, #fff 85%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .pv1,
    .pv2,
    .pv3 {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 436px;
        height: 109px;
        margin-right: 14px;
        margin-bottom: 19px;
        margin-left: 10px;

        @include set-back("@/assets/imgs/energy-plant/pv-bg@2x.png");

        .image {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 74px;
            height: 109px;

            .img {
                width: 64px;
                height: 64px;
                margin: 5px 0;
            }

            .text {
                font-family: YouSheBiaoTiHei, sans-serif;
                font-size: 16px;
                font-weight: 400;
                line-height: 19px;
                color: #fff;
            }
        }
    }
}

</style>
