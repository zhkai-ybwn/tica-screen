<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-20 10:39:49
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-25 11:27:43
 * @FilePath: \tica-energy-plant\src\components\energy-plant\plant-monitor\right\XingZhengPaiMingModal.vue
 * @Description: 行政组织用电量排名统计
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="pm-modal-container">
        <div class="modal-bg">
            <div class="modal-content">
                <div class="modal-title">
                    <div class="sign"></div>
                    <div class="title">行政组织用电量占比统计</div>
                    <div class="close-icon" @click="closeModal"></div>
                </div>
                <div class="driver"></div>
                <div class="modal-list">
                    <div v-for="(item,index) in data" :key="index" class="item-cls">
                        <div class="info">
                            <div class="index-cls">{{ index + 1 }}</div>
                            <div class="name">{{ item.orgName }}</div>
                            <div class="value">{{ item.ec }}</div>
                            <div v-if="item.ec" class="unit">%</div>
                        </div>
                        <div class="item-driver"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import bus from '@/utils/bus'

defineProps({
    data: {
        type: Array,
        default: () => ([]),
    },
})

const closeModal = () => {
    bus.emit('close-pm-modal')
}
</script>

<style lang="scss" scoped>
.pm-modal-container {
    position: relative;

    // width: 1920px;
    // height: 1000px;
    // background: rgb(20 36 74 / 37%);

    .modal-bg {
        position: absolute;
        right: 0;
        width: 448px;
        height: 1000px;
        background: linear-gradient(255deg, rgb(0 28 62 / 80%) 73.11%, rgb(21 77 160 / 51%) 92.89%);

        .modal-content {
            position: absolute;
            right: 0;
            width: 418px;
            height: 1000px;
            background: linear-gradient(197deg, #001c3e -.56%, rgb(21 77 160 / 85%) 69.73%);

            .modal-title {
                display: flex;
                align-items: center;
                width: 418px;
                height: 60px;

                .sign {
                    width: 20.66px;
                    height: 22.59px;

                    @include set-back("@/assets/imgs/energy-plant/xingzheng-modal-sign.png");
                }

                .title {
                    margin-left: 8px;
                    font-family: YouSheBiaoTiHei, sans-serif;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    color: #fff;
                    letter-spacing: 1px;
                }

                .close-icon {
                    width: 11.31px;
                    height: 11.64px;
                    margin-left: 130px;
                    cursor: pointer;

                    @include set-back("@/assets/imgs/energy-plant/xingzheng-modal-close.png");
                }
            }

            .driver {
                width: 406px;
                height: 2px;
                background: rgb(255 255 255 / 20%);
                stroke-width: 1px;
            }

            .modal-list {
                display: flex;
                flex-direction: column;
                width: 373px;
                height: 916px;
                margin: 26px 0 0 36px;
                overflow-y: scroll;

                .item-cls {
                    height: 34px;
                    margin-top: 29px;

                    .info {
                        display: flex;
                        align-items: center;

                        .index-cls {
                            font-family: Barlow-Italic, sans-serif;
                            font-size: 16px;
                            font-style: italic;
                            font-weight: 700;
                            color: #fff;
                            text-align: center;
                            text-shadow: 0 0 4px rgb(255 184 0 / 30%);
                            letter-spacing: .8px;
                        }

                        .name {
                            width: 200px;
                            margin-left: 24px;
                            font-family: SourceHanSansCN-Regular, sans-serif;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 400;
                            color: #fff;
                            text-align: left;
                        }

                        .value {
                            width: 100px;
                            margin-left: 50px;
                            font-family: Barlow-Italic, sans-serif;
                            font-size: 20px;
                            font-style: italic;
                            font-weight: 500;
                            color: #fff;
                            text-align: right;
                        }

                        .unit {
                            margin: 4px 40px 0 3px;
                            font-family: SourceHanSansCN-Regular, sans-serif;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 350;
                            color: rgb(255 255 255 / 65%);
                        }
                    }

                    .item-driver {
                        width: 327px;
                        height: 1px;
                        margin-top: 10px;
                        margin-left: 3px;
                        background: rgb(255 255 255 / 10%);
                    }
                }
            }
        }
    }
}

.modal-list::-webkit-scrollbar {
    width: 6px;
    height: 300px;
}

.modal-list::-webkit-scrollbar-track {
    display: none;
}

.modal-list::-webkit-scrollbar-thumb {
    background: rgb(245 245 245 / 19%);
    border-radius: 3px;
}

.modal-list::-webkit-scrollbar-thumb:hover {
    background: rgb(245 245 245 / 19%);
    border-radius: 3px;
}

</style>
