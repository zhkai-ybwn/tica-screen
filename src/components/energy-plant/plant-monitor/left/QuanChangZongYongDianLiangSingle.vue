<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-25 13:14:18
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-25 15:44:11
 * @FilePath: \tica-energy-plant\src\components\energy-plant\plant-monitor\left\QuanChangZongYongDianLiangSingle.vue
 * @Description: 全厂总用电量概况内部单个组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="power-overview-single">
        <div :class="['left-box', `left-icon${config.type}`]"></div>
        <div class="right-box">
            <div class="label">{{ config.label }}</div>
            <div class="value">
                {{ data.value.toLocaleString() || '-' }}
                <span class="space">&nbsp;</span>
                <span v-if="data.value.toLocaleString()">{{ config.unit }}</span>
            </div>
            <div class="comparison-section">
                <div v-if="data.showYoy" class="yoy">
                    <div class="yoy-text">同比</div>
                    <div class="yoy-value-unit">
                        <div
                            :class="[!Math.abs(data.yoy) ? 'value-null' 
                                : data.yoy > 0 ? 'yoy-value-in' : 'yoy-value-de']" 
                        >
                            {{ Math.abs(data.yoy) || '-' }}
                        </div>
                        <div v-if="Math.abs(data.yoy)" class="yoy-unit">%</div>
                    </div>
                    <img v-if="Math.abs(data.yoy)" class="yoy-arrow" :src="isIncreaseOrDecrease(data.yoy)" />
                </div>
                <div v-if="data.showMom" class="mom">
                    <div class="mom-text">环比</div>
                    <div class="mom-value-unit">
                        <div
                            :class="[!Math.abs(data.mom) ? 'value-null' 
                                : data.mom > 0 ? 'mom-value-in' : 'mom-value-de']"
                        >
                            {{ Math.abs(data.mom) || '-' }}
                        </div>
                        <div v-if="Math.abs(data.mom)" class="mom-unit">%</div>
                    </div>
                    <img v-if="Math.abs(data.mom)" class="mom-arrow" :src="isIncreaseOrDecrease(data.mom)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import increaseIcon from '@/assets/imgs/energy-plant/increase-icon.png'
import decreaseIcon from '@/assets/imgs/energy-plant/decrease-icon.png'

defineProps({
    data: {
        type: Object,
        default: () => ({
            value: 0,
            mom: 0,
            yoy: 0,
        }),
    },
    config: {
        type: Object,
        default: () => ({
            label: '',
            unit: '',
            type: 0,
            width: '',
        }),
    },
})

const isIncreaseOrDecrease = (percent) => {
    if (percent > 0) {
        return increaseIcon
    } 
    if (percent <= 0) {
        return decreaseIcon
    } 
    return null
}
</script>

<style lang="scss" scoped>
.power-overview-single {
    display: flex;
    width: v-bind("config.width");

    .left-box {
        width: 78px;
        height: 78px;
    }

    .left-icon0 {
        @include set-back("@/assets/imgs/energy-plant/power-overview-single-icon0.png");
    }

    .left-icon1 {
        @include set-back("@/assets/imgs/energy-plant/power-overview-single-icon1.png");
    }

    .left-icon2 {
        @include set-back("@/assets/imgs/energy-plant/power-overview-single-icon2.png");
    }

    .right-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        // width: 152px;

        .label {
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 350;
            line-height: normal;
            color: #fff;
        }

        .value {
            display: flex;
            align-items: center;
            width: fit-content;
            height: 33px;
            padding-left: 10px;

            @include set-back("@/assets/imgs/energy-plant/powerview-value-bg.png");

            font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
            font-size: 28px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: #fff;

            .space {
                font-size: 25px;
            }

            span {
                margin-top: 10px;
                font-family: SourceHanSansCN-Normal, sans-serif;
                font-size: 14px;
                font-weight: 350;
            }
        }

        .comparison-section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 152px;
            height: 21px;
            background: linear-gradient(90deg, rgb(53 100 191 / 35%) .01%, rgb(27 76 171 / 0%) 105.95%);

            .value-null {
                font-family: Barlow-SemiBold, sans-serif;
                font-size: 18px;
                font-weight: 600;
                background: linear-gradient(180deg, #fff 15.91%, #fff 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .yoy {
                display: flex;
                align-items: center;
                justify-content: space-evenly;

                .yoy-text {
                    font-family: SourceHanSansCN-Regular, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 21px;
                    color: rgb(255 255 255 / 85%);
                    text-align: center;
                }

                .yoy-value-unit {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-style: normal;
                    line-height: 21px;

                    .yoy-value-in {
                        font-family: Barlow-SemiBold, sans-serif;
                        font-size: 18px;
                        font-weight: 600;
                        background: linear-gradient(180deg, #fff 15.91%, #f90 100%);
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }

                    .yoy-value-de {
                        font-family: Barlow-SemiBold, sans-serif;
                        font-size: 18px;
                        font-weight: 600;
                        background: linear-gradient(180deg, #c6ffd6 0%, #08a534 100%);
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }

                    .yoy-unit {
                        margin-top: 4px;
                        font-family: SourceHanSansCN-Regular, sans-serif;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgb(255 255 255 / 85%);
                    }
                }

                .yoy-arrow {
                    width: 12px;
                    height: 12px;
                }
            }

            .mom {
                display: flex;
                align-items: center;
                justify-content: space-evenly;

                .mom-text {
                    font-family: SourceHanSansCN-Regular, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 21px;
                    color: rgb(255 255 255 / 85%);
                }

                .mom-value-unit {
                    display: flex;
                    align-items: center;
                    font-style: normal;
                    line-height: 21px;

                    .mom-value-in {
                        font-family: Barlow-SemiBold, sans-serif;
                        font-size: 18px;
                        font-weight: 600;
                        background: linear-gradient(180deg, #fff 15.91%, #f90 100%);
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }

                    .mom-value-de {
                        font-family: Barlow-SemiBold, sans-serif;
                        font-size: 18px;
                        font-weight: 600;
                        background: linear-gradient(180deg, #c6ffd6 0%, #08a534 100%);
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }

                    .mom-unit {
                        margin-top: 4px;
                        font-family: SourceHanSansCN-Regular, sans-serif;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgb(255 255 255 / 85%);
                    }
                }

                .mom-arrow {
                    width: 12px;
                    height: 12px;
                }
            }
        }
    }
}

</style>
