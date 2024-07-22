<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-01 08:58:46
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-14 10:46:31
 * @FilePath: \tica-energy-plant\src\views\alarm\RealtimeAlarm.vue
 * @Description: 实时报警组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="real-alarm-container">
        <div class="search-box">
            <a-range-picker
                v-model:value="state.rangePicker"
                style="width: 18.66%;height: 34px;"
                :locale="locale"
                :get-popup-container="(triggerNode) => getPopupContainer(triggerNode)"
                :disabled-date="disabledDate"
                @change="datePickerChange"
            ></a-range-picker>
            <a-tree-select 
                v-model:value="state.areaCode"
                style="width: 13.68%;height: 34px; margin-left: 2%;"
                placeholder="报警区域"
                allow-clear
                show-search
                :get-popup-container="(triggerNode) => getPopupContainer(triggerNode)"
                :tree-data="state.areaData"
                :load-data="onLoadData"
                @change="treeSelectChange"
            ></a-tree-select>
            <a-select 
                v-model:value="state.alarmClass"
                style="width: 8.71%;height: 34px; margin-left: 2%;"
                placeholder="报警类型"
                allow-clear
                :get-popup-container="(triggerNode) => getPopupContainer(triggerNode)"
                @change="alarmClassChange"
            >
                <a-select-option value="0">设备</a-select-option>
                <a-select-option value="1">事件</a-select-option>
            </a-select>
            <a-select
                v-model:value="state.alarmLevel"
                style="width: 8.71%;height: 34px; margin-left: 2%;"
                placeholder="报警等级"
                allow-clear 
                :get-popup-container="(triggerNode) => getPopupContainer(triggerNode)"
                option-label-prop="label"
                @change="alarmLevelChange"
            >
                <a-select-option value="4" label="致命">
                    <img src="../../assets/imgs/manage/select-option-zm.svg" />
                    &nbsp;&nbsp;致命
                </a-select-option>
                <a-select-option value="3" label="严重">
                    <img src="../../assets/imgs/manage/select-option-yz.svg" />
                    &nbsp;&nbsp;严重
                </a-select-option>
                <a-select-option value="2" label="一般">
                    <img src="../../assets/imgs/manage/select-option-yb.svg" />
                    &nbsp;&nbsp;一般
                </a-select-option>
                <a-select-option value="1" label="提示">
                    <img src="../../assets/imgs/manage/select-option-ts.svg" />
                    &nbsp;&nbsp;提示
                </a-select-option>
            </a-select>
            <a-input-search
                v-model:value="state.content" 
                enter-button
                allow-clear
                style="width: 20%; height: 34px; margin-left: 2%;"
                placeholder="报警对象/报警信息"
                @search="contentSearch"
            />
            <a-button
                type="primary" 
                style="width: 5.35%; min-width: 86px; height: 42.2%; min-height: 34px; margin-left: 2%;"
                @click="resetAllSearch"
            >
                <template #icon><RedoOutlined /></template>
                重置
            </a-button>
        </div>
        <div class="table-box">
            <a-table 
                :data-source="state.dataList"
                :pagination="pagination"
                :row-key="(record) => record.alarmInfoId"
                :columns="state.columns"
                @change="handleTableChange"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'alarmLevel'">
                        <span>
                            <a-tag
                                :color="getTagColor(record.alarmLevel.mes)"
                            >
                                {{ record.alarmLevel.mes }}
                            </a-tag>
                        </span>
                    </template>
                    <template v-if="column.key === 'operation'">
                        <span class="operation-span">
                            <context-holder />
                            <a-popconfirm
                                v-if="state.dataList.length"
                                title="确定处理该条报警信息吗？"
                                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                                @confirm="dealAlarm(record)"
                            >
                                <a-button type="primary">
                                    处理
                                </a-button>
                            </a-popconfirm>
                            <div
                                :class="['custom-a', 
                                         state.showDetail && state.currentAlarmId === record.alarmInfoId  
                                             ? 'custom-a-pressed' : '']" 
                                @click="showDetailModal(record)"
                            >详情</div>
                        </span>
                    </template>
                </template>
            </a-table>
        </div>
        <div v-if="state.tableLoad" class="loading-tier">
            <a-spin tip="加载中" />
        </div>
        <div v-if="state.dataList.length <= 0" class="empty-tier">
            <div class="icon"></div>
            <div class="text">暂无报警</div>
        </div>
        <DetailModal v-if="state.showDetail" :alarm-info-id="state.currentAlarmId" class="dam"></DetailModal>
    </div>
</template>
<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'
import bus from '@/utils/bus'
import { message } from 'ant-design-vue'
import DetailModal from '@/components/manage/common/DetailModal.vue'

const [messageApi, contextHolder] = message.useMessage()

const { looping } = useEchart()
dayjs.locale('zh-cn')
const state = reactive({
    rangePicker: [],
    columns: [
        { title: '报警时间',
            key: 'firstTime', 
            dataIndex: 'firstTime',
            align: 'center',
            width: '15%',
            ellipsis: true,
            scopedSlots: { customRender: 'tool' },
        },
        { 
            title: '报警等级', 
            key: 'alarmLevel',
            dataIndex: 'alarmLevel', 
            align: 'center', 
            width: '8%',
            ellipsis: true,
            scopedSlots: { customRender: 'tool' },
        },
        { title: '报警对象', 
            key: 'deviceName',
            dataIndex: 'deviceName',
            align: 'center',
            width: '10%',
            ellipsis: true,
            scopedSlots: { customRender: 'tool' },
        },
        { title: '报警区域', 
            key: 'areaName',
            dataIndex: 'areaName',
            align: 'center',
            width: '10%',
            ellipsis: true,
            scopedSlots: { customRender: 'tool' },
        },
        { title: '报警信息', 
            key: 'alarmContent',
            dataIndex: 'alarmContent',
            align: 'center',
            width: '30%',
            ellipsis: true,
            scopedSlots: { customRender: 'tool' },
        },
        { title: '处理建议', 
            key: 'dealAdvice',
            dataIndex: 'dealAdvice',
            align: 'center',
            ellipsis: true,
            scopedSlots: { customRender: 'tool' },
        },
        { title: '操作', 
            key: 'operation',
            dataIndex: 'operation',
            align: 'center',
        },
    ],
    dataList: [],
    tableLoad: true,
    total: 0,
    current: 1,
    pageSize: 10,
    formatStr: 'YYYY-MM-DD',
    areaData: [],
    areaCode: null,
    alarmClass: null,
    alarmLevel: null,
    content: null,
    currentAlarmId: 0,
    showDetail: false,
})

onMounted(() => {
    state.rangePicker = getCurrentTimeAndOneWeekAgo()
    getAreaList(0)
})

const getCurrentTimeAndOneWeekAgo = () => {
    const currentTime = dayjs()
    const oneWeekAgo = currentTime.subtract(1, 'week')
    return [dayjs(oneWeekAgo.format(state.formatStr), state.formatStr), 
        dayjs(currentTime.format(state.formatStr), state.formatStr)]
}

const disabledDate = (current) => {
    const today = dayjs().endOf('day')
    return current && current > today
} 

const getPopupContainer = (n) => n.parentNode.parentNode.parentNode

const getData = async () => {
    state.tableLoad = true
    const res = await axiosAPI.post(window.MANAGE.urls.shishigaojingliebiao, getParam())
    if (res.code === 200) {
        state.dataList = res.data.records
        state.total = res.data.total
        state.current = res.data.current
        state.pageSize = res.data.size
        state.tableLoad = false
    }
}

const getAreaList = async (parentId) => {
    const params = new FormData()
    params.append('parentId', parentId)
    const res = await axiosAPI.post(window.MANAGE.urls.chaxunquyu, params)
    if (res.code === 200 && res.data && res.data.length > 0) {
        state.areaData = res.data.map(item => ({
            title: item.areaInfoName,
            value: item.areaInfoCode,
            id: item.id,
            parentId: item.parentId,
            isLeaf: !item, // 设置为非叶子节点，以显示展开按钮
        }))
    } 
}

const onLoadData = async (treeNode) => {
    const params = new FormData()
    params.append('parentId', treeNode.id)
    return new Promise((resolve) => {
        setTimeout(() => {
            let isLeaf = false
            axiosAPI.post(window.MANAGE.urls.chaxunquyu, params).then((res) => {
                treeNode.dataRef.children = res.data.map((item) => ({
                    title: item.areaInfoName,
                    value: item.areaInfoCode,
                    id: item.id,
                    parentId: item.parentId,
                    isLeaf, // 设置为非叶子节点，以显示展开按钮
                }))
                state.areaData = [...state.areaData]
                resolve()
            }, 1000)
        })
    })
}

const getParam = () => {
    const param = {
    }
    if (state.alarmClass) {
        param.alarmClass = {
            code: 0,
            mes: '',
            value: state.alarmClass,
        }
    }
    if (state.alarmLevel) {
        param.alarmLevel = {
            code: 0,
            mes: '',
            value: state.alarmLevel,
        }
    }
    if (state.areaCode) param.areaCode = state.areaCode
    if (state.content) param.content = state.content
    if (state.rangePicker.length > 0) {
        param.startTime = dayjs(state.rangePicker[0]).format(state.formatStr)
        param.endTime = dayjs(state.rangePicker[1]).format(state.formatStr)
    }
    if (state.current) param.pageNum = state.current
    if (state.pageSize) param.pageSize = state.pageSize
    return param
}

const getTagColor = (mes) => {
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

const resetAllSearch = () => {
    state.rangePicker = []
    state.areaCode = null
    state.alarmClass = null
    state.alarmLevel = null
    state.content = null
    getData()
}

looping(getData, window.MANAGE.looping.shishigaojingliebiao)

const datePickerChange = (value) => {
    state.rangePicker = []
    if (value) state.rangePicker = [(dayjs(value[0], state.formatStr)), dayjs(value[1], state.formatStr)]
    getData()
}

const treeSelectChange = (value) => {
    state.areaCode = value
    getData()
}

const alarmClassChange = (value) => {
    state.alarmClass = value
    getData()
}

const alarmLevelChange = (value) => {
    state.alarmLevel = value
    getData()
}

const contentSearch = () => {
    getData()
}

const pagination = computed(() => ({
    total: state.total,
    current: state.current,
    pageSize: state.pageSize,
    showTotal: total => `总共 ${total} 项数据`,
    defaultPageSize: 10,
    showSizeChanger: false, // 是否显示pagesize选择
    showQuickJumper: true, // 是否显示跳转窗
}))
// 列表当前页更改
const handleTableChange = (pag) => {
    state.current = pag.current
    state.pageSize = pag.pageSize
    getData()
}

const dealAlarm = async (record) => {
    const params = new FormData()
    params.append('alarmInfoId', record.alarmInfoId)
    const res = await axiosAPI.post(window.MANAGE.urls.chuligaojing, params)
    if (res.code === 200) {
        messageApi.success('处理成功')
        getData()
    } else if (res.code === 1001) {
        messageApi.error(res.message)
        getData()
    } else {
        messageApi.error('处理失败，请联系管理员')
        getData()
    }
}

const showDetailModal = (record) => {
    state.currentAlarmId = record.alarmInfoId
    state.showDetail = true
}
bus.on('close-detail-modal', () => {
    state.showDetail = false
})
</script>

<style lang="scss" scoped>
.real-alarm-container {
    position: relative;

    .search-box {
        display: flex;
        align-items: center;
        height: 76px;
        padding: 18px 224px 18px 24px;
        background: rgb(19 24 35 / 60%);
        border-radius: 4px;
        backdrop-filter: blur(5px);
    }

    .table-box {
        min-height: 680px;
        padding: 24px 24px 0;
        margin-top: 16px;
        background: rgb(19 24 35 / 60%);
        border-radius: 4px;
        backdrop-filter: blur(5px);
    }

    .loading-tier {
        position: absolute;
        top: 0;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: calc(100% - 48px);
        height: calc(100% - 220px);
        margin: 161px 0 0 24px;
        background: rgb(56 63 97 / 26%);
        border-radius: 0 0 4px 4px;
        backdrop-filter: blur(100px);
    }

    .empty-tier {
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: calc(100% - 48px);
        height: calc(100% - 220px);
        margin: 161px 0 0 24px;
        background: rgb(56 63 97 / 26%);
        border-radius: 0 0 4px 4px;
        backdrop-filter: blur(100px);

        .icon {
            width: 160px;
            height: 160px;

            @include set-back("../../assets/imgs/manage/table-no-data.png");
        }

        .text {
            font-family: SourceHanSansCN-Regular, sans-serif;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            color: #a5a9b8;
            text-align: right;
        }
    }

    .dam {
        position: absolute;
        top: 0;
        left: 0;
    }
}

::v-deep(.ant-btn) {
    color: rgb(255 255 255 / 80%);
}

::v-deep(.ant-tag) {
    color: rgb(255 255 255 / 80%);
    border-radius: 2px;
}

// 表格样式重写
// #region
::v-deep(.ant-table) {
    font-family: SourceHanSansCN-Regular, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    color: rgb(255 255 255 / 80%);
    background: transparent;
}

::v-deep(.ant-table-thead tr th) {
    height: 44px !important;
    padding: 10px !important;
    font-family: HarmonyOS-Regular, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    color: rgb(255 255 255 / 80%);
    background: rgb(65 79 108 / 26%) !important;
    border-bottom: 0;

    &::before {
        display: none;
    }
}

::v-deep(.ant-table-wrapper) {
    .ant-table:not(.ant-table-bordered) {
        .ant-table-tbody tr td {
            border-top: 0;
            border-bottom: 1px solid rgb(255 255 255 / 10%);

            .operation-span {
                display: flex;
                align-items: center;
                justify-content: space-evenly;

                .custom-a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 32px;
                    padding: 4px 15px;
                    color: #0079ff;
                    cursor: pointer;
                    border-radius: 6px;

                    &:hover {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 32px;
                        padding: 4px 15px;
                        background: #232f44;
                        border-radius: 6px;
                    }
                }

                .custom-a-pressed {
                    background: #314465;
                    border-radius: 4px;
                }
            }
        }
    }

    .ant-table-cell {
        color: rgb(255 255 255 / 80%);
    }
}

::v-deep(.ant-table-cell) {
    padding: 13px !important;
    background: transparent !important;
}

// @media screen and (min-height: 769px) {
//     ::v-deep(.ant-table-cell) {
//         padding: 13px 13px 13px 24px !important;
//         background: transparent !important;
//     }
// }

// @media screen and (min-height: 1079px) {
//     ::v-deep(.ant-table-cell) {
//         padding: 18px 18px 18px 24px !important;
//         background: transparent !important;
//     }
// }

::v-deep(.ant-table-cell-row-hover) {
    background: transparent !important;
}

// #endregion

// 分页样式重写
// #region
::v-deep(.ant-pagination-total-text) {
    color: rgb(255 255 255 / 60%);
}

::v-deep(.ant-pagination-item) {
    border: 0;
}

::v-deep(.ant-pagination-item a) {
    font-family: SourceHanSansCN-Regular, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: rgb(255 255 255 / 85%);
    text-align: center;
    border: 1px solid #484e6e;

    &:hover {
        background: rgb(56 63 97 / 40%);
        border: 0;
    }
}

::v-deep(.ant-pagination-next svg) {
    fill: rgb(255 255 255 / 85%);
}

::v-deep(.ant-pagination-prev svg) {
    fill: rgb(255 255 255 / 85%);
}

::v-deep(.ant-pagination-options-quick-jumper) {
    color: rgb(255 255 255 / 85%);

    input {
        color: rgb(255 255 255 / 85%);
        background: transparent;
        border: 1px solid #484e6e;

        &:focus {
            border: 1px solid #455ddc;
            box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
        }

        &:hover {
            border: 1px solid #455ddc;
            box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
        }
    }
}

::v-deep(.ant-pagination-jump-prev-custom-icon) {
    .ant-pagination-item-container {
        .ant-pagination-item-ellipsis {
            color: rgb(255 255 255 / 26%);
        }
    }
}

::v-deep(.ant-pagination-jump-next-custom-icon) {
    .ant-pagination-item-container {
        .ant-pagination-item-ellipsis {
            color: rgb(255 255 255 / 26%);
        }
    }
}

::v-deep(.ant-pagination-item-active) {
    background: #266fe8;
    border: 0;

    a {
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        color: rgb(255 255 255 / 85%) !important;
        text-align: center;
        border: 0;

        &:hover {
            background: #266fe8;
            border: 0;
        }
    }
}

// #endregion

// 日期选择器重写
// #region
::v-deep(.ant-picker) {
    background: transparent;
    border: 1px solid #383f61;

    &:hover {
        border: 1px solid #455ddc;
    }
}

::v-deep(.ant-picker .ant-picker-input ::placeholder) {
    font-family: SourceHanSansCN-Regular, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    color: #565c79;
}

::v-deep(.ant-picker .ant-picker-input >input) {
    font-family: SourceHanSansCN-Regular, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    color: rgb(165 169 184 / 100%);
}

::v-deep(.ant-picker-range-separator svg) {
    fill: rgb(165 169 184 / 87%);
}

::v-deep(.ant-picker-suffix svg) {
    fill: rgb(165 169 184 / 87%);
}

::v-deep(.ant-picker-clear svg) {
    background: rgb(22 30 44);
    fill: rgb(165 169 184 / 100%);
}

::v-deep(.ant-picker-dropdown .ant-picker-range-arrow::before) {
    background: rgb(47 55 70 / 100%);
}

::v-deep(.ant-picker-dropdown .ant-picker-panel-container) {
    color: rgb(255 255 255 / 85%);
    background-color: rgb(47 55 70 / 100%);
    box-shadow:
        0 5px 5px -3px rgb(0 0 0 / 10%),
        0 8px 10px 1px rgb(0 0 0 / 6%),
        0 3px 14px 2px rgb(0 0 0 / 5%);
}

::v-deep(.ant-picker-dropdown .ant-picker-cell-disabled .ant-picker-cell-inner) {
    color: rgb(0 0 0 / 25%);
    background-color: rgb(63 74 94 / 100%);
}

::v-deep(.ant-picker-dropdown .ant-picker-header >button) {
    color: rgb(255 255 255 / 25%);

    &:hover {
        color: rgb(255 255 255 / 85%);
    }
}

::v-deep(.ant-picker-header-view) {
    color: rgb(255 255 255 / 85%);
}

::v-deep(.ant-picker-dropdown .ant-picker-content th) {
    color: rgb(255 255 255 / 85%);
}

::v-deep(.ant-picker-cell) {
    color: rgb(255 255 255 / 25%);
}

::v-deep(.ant-picker-cell-in-view) {
    color: rgb(255 255 255 / 85%);
}

::v-deep(.ant-picker-cell-in-view.ant-picker-cell-in-range::before) {
    background: rgb(17 29 44 / 60%);
}

::v-deep(.ant-picker-cell-in-view.ant-picker-cell-range-start:not(.ant-picker-cell-range-end-single)::before) {
    background: rgb(17 29 44 / 60%);
}

::v-deep(.ant-picker-cell-in-view.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single)::before) {
    background: rgb(17 29 44 / 60%);
}

::v-deep(.ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover::before) {
    background: rgb(17 29 44 / 100%);
}

// #endregion

// 树下拉框重写
// #region
::v-deep(.ant-tree-select :hover) {
    border-color: rgb(69 93 220 / 100%) !important;
}

::v-deep(.ant-tree-select) {
    .ant-select-selector {
        height: 34px;
        background-color: transparent;
        border: 1px solid  #383f61;
    }

    .ant-select-selection-placeholder {
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        color: #565c79;
    }

    .ant-select-selection-search-input {
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        color: #565c79;
    }

    .ant-select-selection-item {
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        color: #a5a9b8;
    }
}

::v-deep(.ant-select-arrow svg) {
    fill: rgb(165 169 184 / 100%);
}

::v-deep(.ant-select-clear svg) {
    background: rgb(22 30 44);
    fill: rgb(165 169 184 / 100%);
}

::v-deep(.ant-tree-select-dropdown) {
    background: #2f3746;
    box-shadow:
        0 5px 5px -3px rgb(0 0 0 / 10%),
        0 8px 10px 1px rgb(0 0 0 / 6%),
        0 3px 14px 2px rgb(0 0 0 / 5%);

    .ant-select-tree {
        background: transparent;

        .ant-select-tree-node-content-wrapper {
            &:hover {
                background: #3f4a5e;
            }
        }

        .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected {
            background: rgb(0 121 255 / 100%);
        }
    }

    .ant-empty-small {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .ant-empty-image {
            width: 64px;
            height: 41px;

            @include set-back("../../assets/imgs/manage/tree-select-empty.png");

            svg {
                display: none;
            }
        }

        p {
            color: rgb(165 169 184 / 100%);
        }
    }
}

::v-deep(.ant-select-tree-treenode svg) {
    fill: rgb(255 255 255 / 85%);
}

::v-deep(.ant-select-tree-treenode) {
    color: rgb(255 255 255 / 85%);
}

// #endregion

// 普通下拉框重写
// #region
::v-deep(.ant-select :hover) {
    border-color: rgb(69 93 220 / 100%) !important;
}

::v-deep(.ant-select) {
    .ant-select-selector {
        height: 34px;
        background: transparent;
        border: 1px solid #383f61;
    }

    .ant-select-selection-placeholder {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        color: #565c79;
    }

    .ant-select-selection-search-input {
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        color: #565c79 !important;
    }

    .ant-select-selection-item {
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        color: #a5a9b8;
    }
}

::v-deep(.ant-select-dropdown) {
    background: #2f3746;

    .ant-select-item {
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        color: rgb(255 255 255 / 85%);
        background: #2f3746;

        &:hover {
            background: #3f4a5e;
        }
    }

    .ant-select-item-option-selected {
        background: #0079ff;

        &:hover {
            background: #0079ff;
        }
    }
}

// #endregion

// 搜索框重写
// #region
::v-deep(.ant-input-group-wrapper) {
    .ant-input-group {
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        color: #a5a9b8;
        border: 1px solid #383f61;
        border-radius: 6px;

        &:hover {
            border: 1px solid rgb(69 93 220 / 100%);
            border-radius: 6px;
        }

        &:focus {
            border: 1px solid rgb(69 93 220 / 100%);
            border-radius: 6px;
        }

        .ant-input-affix-wrapper {
            padding: 0 11px;
            color: #a5a9b8;
            background: transparent;
            border: 0;

            &::placeholder {
                font-family: SourceHanSansCN-Regular, sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                color: #565c79;
            }

            .ant-input-clear-icon svg {
                background: rgb(22 30 44);
                fill: rgb(165 169 184 / 100%);
            }
        }

        .ant-input {
            height: 32px;
            color: #a5a9b8;
            background: transparent;
            border: 0;

            &::placeholder {
                font-family: SourceHanSansCN-Regular, sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                color: #565c79;
            }
        }

        .ant-input-group-addon {
            .ant-input-search-button {
                height: 34px;
            }
        }

        .ant-input-group-addon:last-child {
            inset-inline-start: 0;
        }
    }
}

// #endregion

// 处理弹窗重写
// #region
::v-deep(.ant-popover) {
    --antd-arrow-background-color: rgb(0 0 0 / 85%);

    .ant-popover-inner {
        background-color: rgb(0 0 0 / 85%);

        .ant-popconfirm-message {
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            color: rgb(255 255 255 / 85%);
        }

        .ant-btn-default {
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            color: rgb(255 255 255 / 85%);
            text-align: center;
            background: rgb(0 0 0 / 85%);
            border: 1px solid  #484e6e;
            box-shadow: 0 2px 0 0 rgb(0 0 0 / 2%);
        }

        .ant-btn-primary {
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            color: rgb(255 255 255 / 85%);
            text-align: center;
            background: #0079ff;
            border: 1px solid #0079ff;
            box-shadow: 0 2px 0 0 rgb(0 0 0 / 4%);
        }
    }
}

// 叉号重写
::v-deep(.ant-select .ant-select-clear) {
    background-color: rgb(25 35 51);
}

::v-deep(.ant-input-group-wrapper .ant-input-group .ant-input) {
    padding-bottom: 4px;
}
</style>
