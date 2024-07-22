<!-- 设备状态监控 -->
<template>
    <div class="equipment-status">
        <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
            <div class="container">
                <div class="total">
                    <div class="num">
                        <div class="number">{{ state.total || '-' }}</div>
                        <div v-if="state.total" class="text">台</div>
                    </div>
                    <div class="text">设备总数</div>
                </div>
                <div class="on">
                    <div class="num">
                        <div class="number">{{ state.run || '-' }}</div>
                        <div v-if="state.run" class="text">台</div>
                    </div>
                    <div class="status">
                        <div class="dot"></div>
                        <div class="text">运行中</div>
                    </div>
                </div>
                <div class="off">
                    <div class="num">
                        <div class="number">{{ state.close || '-' }}</div>
                        <div v-if="state.close" class="text">台</div>
                    </div>
                    <div class="status">
                        <div class="dot"></div>
                        <div class="text">关机</div>
                    </div>
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
        text: '设备状态监控',
        width: 460,
        height: 40,
    },
    boxConfig: {
        width: 460,
        height: 129,
    },
    total: 0,
    close: 0,
    run: 0,
})

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGYMONITOR.urls.equipmentStatus)
    if (res.code === 200) {
        state.total = res.data.equipmentTotalNum
        state.run = res.data.runningNum
        state.close = res.data.offNum
    }
}

looping(getData, window.ENERGYMONITOR.looping.equipmentStatus)
</script>

<style lang="scss" scoped>
.equipment-status {
    width: 460px;

    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 460px;
        height: 129px;
        padding-right: 56px;
        padding-left: 32px;

        .total {
            width: 125px;
            height: 72px;
            text-align: center;

            @include set-back("@/assets/imgs/energy-plant/conditioner-icon@2x.png");

            .num {
                display: flex;
                align-items: center;
                justify-content: center;

                .number {
                    margin: 2px;
                    font-family: Barlow, sans-serif;
                    font-size: 20px;
                    font-weight: normal;
                    line-height: 23px;
                    color: #fff;
                }
            }
        }

        .on {
            .num {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 90px;
                height: 39px;

                @include set-back("@/assets/imgs/energy-plant/on-icon@2x.png");

                .number {
                    margin: 2px;
                    font-family: Barlow, sans-serif;
                    font-size: 24px;
                    font-weight: normal;
                    line-height: 28px;
                    color: #00fff0;
                }
            }

            .dot {
                width: 8px;
                height: 8px;
                margin: 3px;

                @include set-back("@/assets/imgs/energy-plant/rectangle-on@2x.png");
            }
        }

        .off {
            .num {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 90px;
                height: 39px;

                @include set-back("@/assets/imgs/energy-plant/off-icon@2x.png");

                .number {
                    margin: 2px;
                    font-family: Barlow, sans-serif;
                    font-size: 24px;
                    font-weight: normal;
                    line-height: 28px;
                    color: #ffb800;
                }
            }

            .dot {
                width: 8px;
                height: 8px;
                margin: 3px;

                @include set-back("@/assets/imgs/energy-plant/rectangle-off@2x.png");
            }
        }

        .status {
            display: flex;
            align-items: first baseline;
            justify-content: center;
            height: 21px;
            margin-top: 5px;
        }

        .text {
            font-family: SourceHanSansCN-Regular, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
            color: #fff;
        }
    }
}

</style>
