<template>
    <div class="single">
        <div :class="props.index != 4 ?'left-box':'left-co2'"></div>
        <div class="right-box">
            <div class="label">{{ data.title }}</div>
            <div :class="[data.num.toLocaleString() ? 'value' : 'num-null']">
                {{ data.num.toLocaleString() || '-' }}
                <span class="space">&nbsp;</span>
                <span v-if="data.num.toLocaleString()">{{ props.index != 4 ? 'kWh' : '吨标煤' }}</span>
            </div>
            <div class="section">
                <div v-if="props.index<3" class="yoy">
                    <div class="yoy-text">昨日</div>
                    <div class="yoy-value">
                        {{ data.ynum }}
                    </div>
                    <div class="yoy-text">kWh</div>
                </div>
                <div>&nbsp;&nbsp;&nbsp;</div>
                <div class="mom">
                    <div class="mom-text">{{ data.rateT }}</div>
                    <div
                        :class="[data.rate ? data.rate > 0 ? 'mom-value':'mom-value-down' : 'num-null']"
                    >
                        {{ data.rate || '-' }}
                    </div>
                    <div v-if="data.rate" class="mom-text">%</div>
                    <img v-if="data.rate" class="mom-arrow" :src="isIncreaseOrDecrease(data.rate)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import increaseIcon from '@/assets/imgs/energy-plant/increase-icon.png'
import decreaseIcon from '@/assets/imgs/energy-plant/decrease-icon.png'

const props = defineProps({
    index: {
        type: Number,
        default: 2,
    },
    data: {
        type: Object,
        default: () => ({
            title: '',
            num: 0,
            ynum: 0,
            rate: 0,
        }),
    },
})

const isIncreaseOrDecrease = (percent) => {
    if (percent > 0) {
        return increaseIcon
    } 
    if (percent < 0) {
        return decreaseIcon
    } 
    return null
}

</script>

<style lang="scss" scoped>
.single {
    display: flex;
    justify-content: space-between;
    width: fit-content;

    .left-box {
        width: 78px;
        height: 78px;

        @include set-back("@/assets/imgs/energy-plant/power-overview-single-icon0.png");
    }

    .left-co2 {
        width: 78px;
        height: 78px;

        @include set-back("@/assets/imgs/energy-plant/co2.png");
    }

    .right-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .label {
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 350;
            line-height: normal;
            color: #fff;
        }

        .num-null {
            font-family: Barlow-SemiBold, sans-serif;
            font-size: 18px;
            font-weight: 600;
            background: linear-gradient(180deg, #fff 15.91%, #fff 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
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

        .section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: fit-content;
            height: 21px;
            background: linear-gradient(90deg, rgb(53 100 191 / 35%) .01%, rgb(27 76 171 / 0%) 105.95%);

            .yoy {
                display: flex;
                align-items: baseline;
                justify-content: space-evenly;

                .yoy-text {
                    width: fit-content;
                    font-family: SourceHanSansCN-Regular, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 21px;
                    color: rgb(255 255 255 / 85%);
                    text-align: center;
                }

                .yoy-value {
                    font-size: 18px;
                    line-height: 22px;
                    color: #00fff0;
                }
            }

            .mom {
                display: flex;
                align-items: baseline;
                justify-content: space-evenly;

                .mom-text {
                    font-family: SourceHanSansCN-Regular, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 21px;
                    color: rgb(255 255 255 / 85%);
                }

                .mom-value {
                    font-family: Barlow-SemiBold, sans-serif;
                    font-size: 18px;
                    font-weight: 600;
                    background: linear-gradient(180deg, #fff 15.91%, #f90 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .mom-value-down {
                    font-family: Barlow-SemiBold, sans-serif;
                    font-size: 18px;
                    font-weight: 600;
                    background: linear-gradient(180deg, #c6ffd6 0%, #08a534 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
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
