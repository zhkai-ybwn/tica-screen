<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-09 09:31:42
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-23 10:06:05
 * @FilePath: \tica-energy-plant\src\components\manage\common\DetailModal.vue
 * @Description: 报警详情 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="blur-box">
        <div class="alarm-detail-modal">
            <div class="tool-box">
                <!-- 标题、关闭按钮 -->
                <div class="title-close">
                    <div class="title">报警详情</div>
                    <div class="close" @click="closeDetailModal"></div>
                </div>
            </div>
            <div class="info-box">
                <!-- 报警等级、状态、次数 -->
                <div class="level-status-count">
                    <div
                        class="level"
                        :style="{
                            background: getLevelColor(state.alarmLevel.mes),
                            borderColor: getLevelColor(state.alarmLevel.mes)
                        }"
                    >
                        {{ state.alarmLevel.mes }}
                    </div>
                    <div class="status">报警中</div>
                    <div class="status">{{ `${state.alarmCount}次` }}</div>
                </div>
                <!-- 报警信息、处理建议 -->
                <div class="info-advice">
                    {{ formatInfo(state.alarmTxt).split(',').join('，').replace('\n', '') }} 
                </div>
                <div class="position-section common-label-text">
                    <!-- 报警区域 -->
                    <div class="alarm-area">
                        <span class="label">报警区域：</span>
                        <span class="text">{{ formatInfo(state.areaName) }}</span>
                    </div>
                    <!-- 设备名称 -->
                    <div class="device-name">
                        <span class="label">设备名称：</span>
                        <span class="text">{{ formatInfo(state.deviceName) }}</span>
                    </div>
                    <!-- 报警指标 -->
                    <div class="alarm-index">
                        <span class="label">报警指标：</span>
                        <span class="text">{{ formatInfo(state.indicatorName) }}</span>
                    </div>
                </div>
                <div class="time-section common-label-text">
                    <!-- 首次报警时间、恢复时间 -->
                    <div class="first-restore-time">
                        <div class="first">
                            <span class="label">首次报警时间：</span>
                            <span class="text">{{ formatInfo(state.firstTime) }}</span>
                        </div>
                        <div class="restore">
                            <span class="label">恢复时间：</span>
                            <span class="text">{{ formatInfo(state.recoverTime) }}</span>
                        </div>
                    </div>
                    <!-- 最近报警时间、处理时间 -->
                    <div class="recently-deal-time">
                        <div class="recently">
                            <span class="label">最近报警时间：</span>
                            <span class="text">{{ formatInfo(state.lastTime) }}</span>
                        </div>
                        <div class="deal">
                            <span class="label">处理时间：</span>
                            <span class="text">{{ formatInfo(state.dealTime) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 报警历史履历 -->
            <div class="table-box">
                <a-table
                    :data-source="state.historyList"
                    :pagination="pagination"
                    :row-key="(record) => record.alarmInfoId"
                    :columns="state.columns"
                    :ellipsis="true"
                    @change="handleTableChange"
                >
                </a-table>
                <div v-if="state.tableLoad" class="loading-tier">
                    <a-spin tip="加载中" />
                </div>
                <div v-if="state.historyList.length <= 0" class="empty-tier">
                    <div class="icon"></div>
                    <div class="null-text">数据走失了~</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import bus from '@/utils/bus'
import axiosAPI from '@/axios/index'

const props = defineProps({
    alarmInfoId: {
        type: Number,
        default: 1,
    },
})

const state = reactive({
    current: 1,
    pageSize: 5,
    alarmCount: 0,
    alarmLevel: {},
    alarmTxt: '',
    areaName: '',
    deviceName: '',
    indicatorName: '',
    firstTime: '',
    recoverTime: '',
    lastTime: '',
    dealTime: '',
    historyList: [],
    columns: [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            ellipsis: true,
            width: 100,
            customRender: (text) => `${text.index + 1}`,
        },
        {
            title: '时间',
            key: 'alarmTime',
            dataIndex: 'alarmTime',
            align: 'center',
            ellipsis: true,
            width: 200,
        },
        {
            title: '报警信息',
            key: 'alarmContent',
            dataIndex: 'alarmContent',
            ellipsis: true,
            align: 'center',
            width: 300,
        },
        {
            title: '报警值',
            key: 'indicatorValue',
            dataIndex: 'indicatorValue',
            ellipsis: true,
            align: 'center',
            width: 100,
        },
    ],
    tableLoad: false,
})

onMounted(() => {
    getData()
})

const pagination = computed(() => ({
    total: state.total,
    current: state.current,
    pageSize: state.pageSize,
    showTotal: total => `总共 ${total} 项数据`,
    defaultPageSize: 10,
    showSizeChanger: false, // 是否显示pagesize选择
    showQuickJumper: true, // 是否显示跳转窗
}))

const getParam = () => {
    const param = {
    }
    if (props.alarmInfoId) {
        param.alarmInfoId = props.alarmInfoId
    }
    if (state.current) param.pageNum = state.current
    if (state.pageSize) param.pageSize = state.pageSize
    return param
}

const getData = async () => {
    state.tableLoad = true
    const res = await axiosAPI.post(window.MANAGE.urls.getRealAlarmDetail, getParam())
    if (res.code === 200) {
        state.total = res.data.pageResult.total
        const detail = res.data.alarmDetailSimpleVO
        state.alarmCount = detail.alarmCount
        state.alarmLevel = detail.alarmLevel
        state.alarmTxt = detail.alarmTxt
        state.areaName = detail.areaName
        state.deviceName = detail.deviceName
        state.indicatorName = detail.indicatorName
        state.firstTime = detail.firstTime
        state.recoverTime = detail.recoverTime
        state.lastTime = detail.lastTime
        state.dealTime = detail.dealTime
        state.historyList = res.data.pageResult.records
        state.tableLoad = false
    }
}

// 列表当前页更改
const handleTableChange = (pag) => {
    state.current = pag.current
    state.pageSize = pag.pageSize
    getData()
}

const closeDetailModal = () => {
    bus.emit('close-detail-modal')
}

const getLevelColor = (mes) => {
    switch (mes) {
        case '严重':
            return '#FA8214'
        case '致命':
            return '#FF4D4F'
        case '一般':
            return '#1890FF'
        case '提示':
            return '#18A02E'
    }
}

const formatInfo = (text) => (text || '-')

</script>

<style lang="scss" scoped>
.blur-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 26%);

    .alarm-detail-modal {
        display: flex;
        flex-direction: column;
        width: 43.75%;
        min-width: 776px;
        height: fit-content;
        padding: 32px;
        background: #2f3746;
        border-radius: 8px;
        box-shadow: 0 8px 10px -5px rgb(0 0 0 / 8%), 0 16px 24px 2px rgb(0 0 0 / 4%), 0 6px 30px 5px rgb(0 0 0 / 5%);

        .tool-box {
            height: 3.5%;

            .title-close {
                display: flex;
                justify-content: space-between;

                .title {
                    overflow: hidden;
                    font-family: HarmonyOS-Regular, sans-serif;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 500;
                    color: rgb(255 255 255 / 90%);
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .close {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;

                    @include set-back("../../../assets/imgs/manage/detail-close-icon.svg");
                }
            }
        }

        .info-box {
            display: flex;
            flex-direction: column;
            height: fit-content;
            margin-top: 24px;

            .level-status-count {
                display: flex;
                justify-content: flex-start;
                font-family: HarmonyOS-Regular, sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px;
                color: #f7f7f9;
                text-align: center;

                .level {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: fit-content;
                    height: fit-content;
                    padding: 2px 6px;
                    border: 1px solid;
                    border-radius: 2px;
                }

                .status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: fit-content;
                    height: fit-content;
                    padding: 2px 6px;
                    margin-left: 16px;
                    background: rgb(255 77 79 / 26%);
                    border: 1px solid #ff4d4f;
                    border-radius: 2px;
                }
            }

            .info-advice {
                margin-top: 16px;
                font-family: HarmonyOS-Regular, sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px;
                color: rgb(255 255 255 / 80%);
            }

            .common-label-text {
                font-family: HarmonyOS-Regular, sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px;

                .label {
                    color: rgb(255 255 255 / 40%);
                }

                .text {
                    color: rgb(255 255 255 / 80%);
                }
            }

            .position-section {
                margin-top: 16px;
            }

            .time-section {
                margin-top: 16px;

                .first-restore-time {
                    display: flex;

                    .restore {
                        margin-left: 38px;
                    }
                }

                .recently-deal-time {
                    display: flex;

                    .deal {
                        margin-left: 38px;
                    }
                }
            }
        }

        .table-box {
            position: relative;
            height: 48.33%;
            margin-top: 24px;

            ::v-deep(.ant-table-thead tr th) {
                height: 36px !important;
                padding: 6px !important;
                color: rgb(255 255 255 / 80%);
                background: rgb(17 29 44 / 60%) !important;
                border-bottom: 0;

                &:first-child {
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }

                &:last-child {
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                }

                &::before {
                    display: none;
                }
            }

            .loading-tier {
                position: absolute;
                top: 36px;
                display: flex;
                flex-shrink: 0;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 88%;
                background: rgb(20 27 41 / 26%);
                border-radius: 0 0 4px 4px;
                backdrop-filter: blur(100px);
            }

            .empty-tier {
                position: absolute;
                top: 36px;
                display: flex;
                flex-direction: column;
                flex-shrink: 0;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 88%;
                background: rgb(20 27 41 / 26%);
                border-radius: 0 0 4px 4px;
                backdrop-filter: blur(100px);

                .icon {
                    width: 54px;
                    height: 36px;

                    @include set-back("../../../assets/imgs/manage/modal-no-data.png");
                }

                .null-text {
                    width: 78px;
                    height: 24px;
                    font-family: SourceHanSansCN-Regular, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px;
                    color: #a5a9b8;
                    text-align: center;
                }
            }
        }
    }
}

.ee {
    color: blue !important;
}
</style>
