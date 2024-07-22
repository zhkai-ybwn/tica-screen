<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-05 10:01:37
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-26 08:34:59
 * @FilePath: \tica-energy-plant\src\components\energy-plant\device-monitor\DeviceStateItem.vue
 * @Description: 设备状态Item
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="device-state-item">
        <div :class="['icon', config.type === 0 ? 'icon0' : 'icon1']"></div>
        <div class="info">
            <div class="title">{{ config.title }}</div>
            <div
                v-if="!Array.isArray(config.unit)"
                class="total-info"
            >
                {{ data[0].toLocaleString() || '-' }}<span v-if="data[0]">{{ config.unit }}</span>
            </div>
            <div v-else class="total-info">
                {{ data[0][0].toLocaleString() || '-' }}<span v-if="data[0][0]">{{ config.unit[0] }}</span>
                <span>/</span>
                {{ data[0][1].toLocaleString() || '-' }}<span v-if="data[0][1]">{{ config.unit[1] }}</span>
            </div>
            <div class="detail-info">
                <div class="detail-label">{{ config.label1 }}</div>
                <div
                    v-if="config.label1" 
                    :class="[config.class1 ? config.class1 : 
                        data[1] ? data[1] > 0 ? 'per-up' : 'per-down' : 'per-null']"
                >
                    {{ data[1] || '-' }}
                </div>
                <div v-if="data[1]" class="per-unit">{{ config.unit1 }}</div>
                <img v-if="config.isPer[0] && data[1]" class="arrow" :src="isIncreaseOrDecrease(data[1])" />
                <div class="detail-label" style="margin-left: 10px;">{{ config.label2 }}</div>
                <div
                    v-if="config.label2" 
                    :class="[config.class2 ? config.class2 : data[2] ? data[2] > 0 ? 
                        'per-up' : 'per-down' : 'per-null']"
                >
                    {{ data[2] || '-' }}
                </div>
                <div v-if="data[2]" class="per-unit">{{ config.unit2 }}</div>
                <img v-if="config.isPer[1] && data[2]" class="arrow" :src="isIncreaseOrDecrease(data[2])" />
            </div>
        </div>
    </div>
</template>

<script setup>
import increaseIcon from '@/assets/imgs/energy-plant/increase-icon.png'
import decreaseIcon from '@/assets/imgs/energy-plant/decrease-icon.png'

defineProps({
    config: {
        type: Object,
        default: () => ({}),
    },
    data: {
        type: Array,
        default: () => ([]),
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
.device-state-item {
    display: flex;

    .icon {
        width: 78px;
        height: 78px;
    }

    .icon0 {
        @include set-back("@/assets/imgs/energy-plant/device_state_type0.png");
    }

    .icon1 {
        @include set-back("@/assets/imgs/energy-plant/device_state_type1.png");
    }

    .info {
        display: flex;
        flex-direction: column;

        .title {
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: #fff;
        }

        .total-info {
            width: 152px;
            height: 33px;
            padding-left: 10px;
            font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
            font-size: 28px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: #fff;

            @include set-back("../../../assets/imgs/energy-plant/device_total_bg.png");

            :nth-child(1) {
                font-family: SourceHanSansCN-Normal, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                color: #fff;
            }

            :nth-child(2) {
                margin-left: 5px;
                font-family: SourceHanSansCN-Normal, sans-serif;
                font-size: 24px;
                font-weight: 400;
                line-height: 16px;
                color: rgb(255 255 255 / 60%);
            }

            :nth-child(3) {
                font-family: SourceHanSansCN-Normal, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                color: #fff;
            }
        }

        .detail-info {
            display: flex;
            align-items: center;

            .detail-label {
                font-family: SourceHanSansCN-Normal, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                color: rgb(255 255 255 / 85%);
            }

            .data-value1 {
                font-family: Barlow-SemiBold, sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                color: #00fff0;

                span {
                    font-family: SourceHanSansCN-Normal, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    color: rgb(255 255 255 / 85%);
                }
            }

            .data-value2 {
                font-family: Barlow-SemiBold, sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                color: #ffce21;

                span {
                    font-family: SourceHanSansCN-Normal, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    color: rgb(255 255 255 / 85%);
                }
            }

            .per-up {
                font-family: Barlow-SemiBold, sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                background: linear-gradient(180deg, #fff 15.91%, #f90 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .per-null {
                font-family: Barlow-SemiBold, sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                background: linear-gradient(180deg, #fff 0%, #fff 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .per-down {
                font-family: Barlow-SemiBold, sans-serif;
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                background: linear-gradient(180deg, #c6ffd6 0%, #08a534 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .per-unit {
                margin-top: 5px;
                font-family: SourceHanSansCN-Normal, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                color: #fff;
            }

            .arrow {
                width: 12px;
                height: 12px;
            }
        }
    }
}
</style>
